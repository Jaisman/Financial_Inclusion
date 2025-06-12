from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import joblib
import shap
import numpy as np
import os
import google.generativeai as genai
from gtts import gTTS
import io
import tempfile

app = Flask(__name__)
CORS(app)

# Load model and encoder
model = joblib.load('credit_score_gb_model.pkl')
encoder = joblib.load('feature_encoder.pkl')

# Configure Gemini
if not os.getenv("GOOGLE_API_KEY"):
    raise ValueError("Missing GOOGLE_API_KEY in environment variables.")
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model_gemini = genai.GenerativeModel("gemini-1.5-flash")

FEATURE_DESCRIPTIONS = {
    "age": "Your current age",
    "employment_status": "Your current employment type (unemployed, self-employed, or salaried)",
    "monthly_income": "Your monthly income amount INR",
    "utility_bill_payment_history": "Your history of paying utility bills on time % (0-100 scale) of last 12 months",
    "rental_payment_history": "Your history of paying rent on time % (0-100 scale) of last 12 months",
    "mobile_recharge_frequency": "How often you recharge your mobile phone (1-6 scale)",
    "mobile_data_usage": "Your monthly mobile data usage in GB",
    "education_level": "Your highest education level completed",
    "financial_literacy_score": "Your financial knowledge score (0-10 scale) from quizzes/modules on education portal",
    "loan_repayment_history": "Your history of repaying past informal loans; on-time % (0-100 scale)",
    "region": "Your residential area type (urban, semi-urban, rural)"
}

def preprocess_input(user_data):
    input_df = pd.DataFrame([user_data])
    cat_cols = ["employment_status", "education_level", "region"]
    input_df[cat_cols] = encoder.transform(input_df[cat_cols])
    return input_df

def compute_shap_values(user_data):
    input_df = preprocess_input(user_data)
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(input_df)

    feature_names = input_df.columns.tolist()
    shap_dict = {
        feature: {
            "value": float(input_df[feature].values[0]),
            "shap": float(shap_values[0][i])
        }
        for i, feature in enumerate(feature_names)
    }
    return shap_dict

def generate_gemini_prompt(user_data, shap_values, score):
    top_factors = sorted(shap_values.items(), key=lambda x: abs(x[1]['shap']), reverse=True)[:3]

    feature_summary = ""
    for feature, data in top_factors:
        val = data['value']
        if feature in ["employment_status", "education_level", "region"]:
            reverse_map = {
                "employment_status": {0: "unemployed", 1: "self-employed", 2: "salaried"},
                "education_level": {0: "High School", 1: "Diploma", 2: "Graduate", 3: "Postgraduate"},
                "region": {0: "rural", 1: "semi-urban", 2: "urban"}
            }
            val = reverse_map[feature].get(int(val), "unknown")
        feature_summary += f"{FEATURE_DESCRIPTIONS.get(feature)} is {val} and it has a {'positive' if data['shap'] > 0 else 'negative'} impact on the score.\n"

    prompt = f"""
    A user has a predicted credit score of {score:.2f} out of 10. The following features most impacted this score:
    {feature_summary}

    Based on the above, generate a simple and empathetic explanation for the user, including what they did well, what they can improve, and why their score is what it is. Use friendly language and a motivational tone.
    """
    return prompt

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "status": "success",
        "message": "Financial Inclusion API is running",
        "endpoints": {
            "predict": "/predict (POST)",
            "explain": "/explain (POST)",
            "interpret": "/interpret (POST)",
            "test": "/test (GET)",
            "text-to-speech": "/text-to-speech (POST)"
        }
    })

@app.route('/predict', methods=['POST'])
def predict():
    user_data = request.json
    input_df = preprocess_input(user_data)
    score = model.predict(input_df)[0]
    return jsonify({"credit_score": round(float(score), 2), "status": "success"})

@app.route('/explain', methods=['POST'])
def explain():
    user_data = request.json
    shap_dict = compute_shap_values(user_data)
    sorted_features = sorted(shap_dict.items(), key=lambda x: abs(x[1]['shap']), reverse=True)
    return jsonify({"shap_values": {k: v for k, v in sorted_features}, "status": "success"})

@app.route('/interpret', methods=['POST'])
def interpret():
    try:
        user_data = request.json
        input_df = preprocess_input(user_data)
        score = float(model.predict(input_df)[0])  # Convert numpy float to Python float
        shap_values = compute_shap_values(user_data)

        prompt = generate_gemini_prompt(user_data, shap_values, score)
        response = model_gemini.generate_content(prompt)
        explanation_text = response.text.strip()

        return jsonify({
            "credit_score": round(score, 2),
            "explanation": explanation_text,
            "status": "success"
        })

    except Exception as e:
        print("Error in /interpret:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"status": "success", "message": "Server is running!"})

@app.route('/text-to-speech', methods=['POST'])
def text_to_speech():
    try:
        text = request.json.get('text')
        if not text:
            return jsonify({"status": "error", "message": "No text provided"}), 400

        # Create a temporary file to store the audio
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as temp_file:
            # Generate speech
            tts = gTTS(text=text, lang='en', slow=False)
            tts.save(temp_file.name)
            
            # Read the file and send it
            with open(temp_file.name, 'rb') as audio_file:
                audio_data = audio_file.read()
            
            # Clean up the temporary file
            os.unlink(temp_file.name)
            
            return send_file(
                io.BytesIO(audio_data),
                mimetype='audio/mpeg',
                as_attachment=True,
                download_name='explanation.mp3'
            )

    except Exception as e:
        print("Error in text-to-speech:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
