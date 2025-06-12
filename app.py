import numpy as np
import shap
from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

app = Flask(__name__)

# Load the model (make sure this path is correct)
model = joblib.load('credit_score_model.pkl')

def preprocess_input(data):
    # Convert input data to DataFrame
    df = pd.DataFrame([data])
    
    # Convert categorical variables
    df['employment_status'] = df['employment_status'].map({
        'employed': 0,
        'self-employed': 1,
        'unemployed': 2
    })
    
    df['education_level'] = df['education_level'].map({
        'High School': 0,
        'Graduate': 1,
        'Post Graduate': 2
    })
    
    df['region'] = df['region'].map({
        'urban': 0,
        'semi-urban': 1,
        'rural': 2
    })
    
    # Select features in the correct order
    features = [
        'age',
        'employment_status',
        'monthly_income',
        'utility_bill_payment_history',
        'rental_payment_history',
        'mobile_recharge_frequency',
        'mobile_data_usage',
        'education_level',
        'financial_literacy_score',
        'loan_repayment_history',
        'region'
    ]
    
    return df[features]

@app.route('/shap_values', methods=['POST'])
def get_shap_values():
    try:
        data = request.get_json()
        print("Received data:", data)  # Debug print
        
        # Convert input data to the format expected by the model
        input_data = preprocess_input(data)
        print("Preprocessed data:", input_data)  # Debug print
        
        # Get SHAP values
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(input_data)
        print("SHAP values shape:", np.shape(shap_values))  # Debug print
        
        # Get feature names
        feature_names = [
            'Age',
            'Employment Status',
            'Monthly Income',
            'Utility Bill Payment History',
            'Rental Payment History',
            'Mobile Recharge Frequency',
            'Mobile Data Usage',
            'Education Level',
            'Financial Literacy Score',
            'Loan Repayment History',
            'Region'
        ]
        
        # Create a list of feature importance
        feature_importance = []
        for i, feature in enumerate(feature_names):
            value = float(shap_values[0][i])  # Convert numpy float to Python float
            feature_importance.append({
                'feature': feature,
                'value': value
            })
            print(f"Feature: {feature}, Value: {value}")  # Debug print
        
        # Sort by absolute value of SHAP values
        feature_importance.sort(key=lambda x: abs(x['value']), reverse=True)
        
        response_data = {
            'status': 'success',
            'shap_values': feature_importance
        }
        print("Sending response:", response_data)  # Debug print
        
        return jsonify(response_data)
        
    except Exception as e:
        print("Error in get_shap_values:", str(e))  # Debug print
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True) 