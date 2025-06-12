from collections import deque
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

# Chat history storage (in-memory, for production use a proper database)
user_chat_histories = {}

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

# # Hardcoded user info (as per your request)
# USER_INFO = {
#     "name": "Rahul Sharma",
#     "location": "Mumbai",
#     "financial_goals": "Save for a house down payment and improve credit score",
#     "financial_challenges": "Irregular income and sometimes late bill payments"
# }

USER_INFO = {
    "name": "Sushma Devi",
    "age": 35,
    "location": "Punjab, India",
    "family_status": "Widow with two children",
    "occupation": "Tailor",
    "financial_goals": "Start a tailoring business and support children's education",
    "financial_challenges": "Irregular income, no formal credit history, high-interest loans from moneylenders"
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

def initialize_chat_history(user_id, user_data, shap_values, score):
    # Format the user's data for the chatbot context
    user_data_str = "\n".join([f"{FEATURE_DESCRIPTIONS.get(k, k)}: {v}" for k, v in user_data.items()])
    
    # Format top factors influencing the score
    top_factors = sorted(shap_values.items(), key=lambda x: abs(x[1]['shap']), reverse=True)[:3]
    factors_str = "\n".join([
        f"{FEATURE_DESCRIPTIONS.get(feat, feat)}: {'Helped' if data['shap'] > 0 else 'Hurt'} your score"
        for feat, data in top_factors
    ])
    
    # Initial system message with all context
    initial_context = f"""**Personalized Financial Education Chatbot**
    
User Profile:
- Name: {USER_INFO['name']}
- Location: {USER_INFO['location']}
- Financial Goals: {USER_INFO['financial_goals']}
- Challenges: {USER_INFO['financial_challenges']}

User's Financial Details:
{user_data_str}

Credit Score: {score:.2f}/10

Key Factors Affecting Score:
{factors_str}

You are a friendly, patient financial educator. Your role is to:
1. Explain financial concepts simply
2. Provide personalized advice based on the user's data
3. Suggest practical steps to improve their financial health
4. Answer questions about credit scores and financial management

Start by welcoming the user and offering help with understanding their credit score or other financial topics.
"""
    
    # Initialize chat history with the system message
    user_chat_histories[user_id] = {
        'history': deque(maxlen=10),  # Stores 5 exchanges (user + assistant)
        'context': initial_context
    }
    
    # Generate initial greeting
    response = model_gemini.generate_content(initial_context + "\n\nGreet the user and offer your help.")
    greeting = response.text.strip()
    
    # Add assistant's first message to history
    user_chat_histories[user_id]['history'].append({
        'role': 'assistant',
        'content': greeting
    })
    
    return greeting

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
            "text-to-speech": "/text-to-speech (POST)",
            "educhat-start": "/educhat/start (POST)",
            "educhat": "/educhat (POST)"
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

@app.route('/educhat/start', methods=['POST'])
def start_educhat():
    try:
        user_data = request.json
        user_id = user_data.pop('user_id', 'default_user')  # Remove user_id from data
        
        # Calculate score and SHAP values for context
        input_df = preprocess_input(user_data)
        score = float(model.predict(input_df)[0])
        shap_values = compute_shap_values(user_data)
        
        # Initialize chat history
        greeting = initialize_chat_history(user_id, user_data, shap_values, score)
        
        return jsonify({
            "status": "success",
            "message": greeting,
            "user_id": user_id
        })
        
    except Exception as e:
        print("Error starting EduChat:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/educhat', methods=['POST'])
def educhat():
    try:
        data = request.json
        user_id = data.get('user_id', 'default_user')
        user_message = data.get('message', '')
        
        if user_id not in user_chat_histories:
            return jsonify({
                "status": "error",
                "message": "Chat session not initialized. Please call /educhat/start first."
            }), 400
        
        # Add user message to history
        user_chat_histories[user_id]['history'].append({
            'role': 'user',
            'content': user_message
        })
        
        # Build conversation history for context
        conversation = [user_chat_histories[user_id]['context']]
        for msg in user_chat_histories[user_id]['history']:
            conversation.append(f"{msg['role']}: {msg['content']}")
        
        # Add instruction for the AI
        conversation.append("assistant: ")
        full_prompt = "\n\n".join(conversation)
        
        # Get response from Gemini
        response = model_gemini.generate_content(full_prompt)
        assistant_message = response.text.strip()
        
        # Add assistant response to history
        user_chat_histories[user_id]['history'].append({
            'role': 'assistant',
            'content': assistant_message
        })
        
        return jsonify({
            "status": "success",
            "message": assistant_message
        })
        
    except Exception as e:
        print("Error in EduChat:", str(e))
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