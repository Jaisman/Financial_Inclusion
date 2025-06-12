import mongoose from 'mongoose';
import UserFeature from './models/user.js';

const sample = [
  {
    "user_id": "523256850043",
    "age": 28,
    "employment_status": "self-employed",
    "monthly_income": 18000,
    "utility_bill_payment_history": 95,
    "rental_payment_history": 100,
    "mobile_recharge_frequency": 4,
    "mobile_data_usage": 8.5,
    "education_level": "High School",
    "financial_literacy_score": 7,
    "loan_repayment_history": 100,
    "region": "semi-urban",
    "credit_score_generated": 8.2,
    "password":"user1"
  },
  {
    "user_id": "695471662945",
    "age": 35,
    "employment_status": "salaried",
    "monthly_income": 35000,
    "utility_bill_payment_history": 90,
    "rental_payment_history": 80,
    "mobile_recharge_frequency": 3,
    "mobile_data_usage": 5.2,
    "education_level": "Graduate",
    "financial_literacy_score": 8,
    "loan_repayment_history": 90,
    "region": "urban",
    "credit_score_generated": 9.1,
    "password":"user2"
  },
  {
    "user_id": "235013696492",
    "age": 22,
    "employment_status": "unemployed",
    "monthly_income": 0,
    "utility_bill_payment_history": 100,
    "rental_payment_history": 75,
    "mobile_recharge_frequency": 6,
    "mobile_data_usage": 3.8,
    "education_level": "Diploma",
    "financial_literacy_score": 5,
    "loan_repayment_history": 50,
    "region": "rural",
    "credit_score_generated": 4.3,
    "password":"user3"
  },
  {
    "user_id": "869247977392",
    "age": 42,
    "employment_status": "self-employed",
    "monthly_income": 25000,
    "utility_bill_payment_history": 85,
    "rental_payment_history": 95,
    "mobile_recharge_frequency": 2,
    "mobile_data_usage": 4.5,
    "education_level": "Graduate",
    "financial_literacy_score": 6,
    "loan_repayment_history": 100,
    "region": "semi-urban",
    "credit_score_generated": 7.4,
    "password":"user4"
  },
  {
    "user_id": "832284566074",
    "age": 30,
    "employment_status": "salaried",
    "monthly_income": 22000,
    "utility_bill_payment_history": 98,
    "rental_payment_history": 100,
    "mobile_recharge_frequency": 3,
    "mobile_data_usage": 7.1,
    "education_level": "Postgraduate",
    "financial_literacy_score": 9,
    "loan_repayment_history": 100,
    "region": "urban",
    "credit_score_generated": 9.4,
    "password":"user5"
  }
]
async function insertSample() {
  try {
    await mongoose.connect('mongodb+srv://jaismanjhinger:financial_inclusion@cluster0.icaoavz.mongodb.net/users', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const ids = sample.map(doc => doc.user_id);
    await UserFeature.deleteMany({ user_id: { $in: ids } });
    const res = await UserFeature.insertMany(sample);
    console.log('Inserted:', res);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

insertSample();
