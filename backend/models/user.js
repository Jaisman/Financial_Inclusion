// models/UserFeature.js
import mongoose from 'mongoose';

const UserFeatureSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true, 
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  employment_status: {
    type: String,
    enum: ['salaried', 'self-employed', 'unemployed'],
    required: true,
  },
  monthly_income: {
    type: Number,
    required: true,
    min: 0,
  },
  utility_bill_payment_history: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  rental_payment_history: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  mobile_recharge_frequency: {
    type: Number,
    required: true,
    min: 0,
  },
  mobile_data_usage: {
    type: Number,
    required: true,
    min: 0,
  },
  education_level: {
    type: String,
    enum: ['High School', 'Diploma', 'Graduate', 'Postgraduate'],
    required: true,
  },
  financial_literacy_score: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  loan_repayment_history: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  region: {
    type: String,
    enum: ['urban', 'semi-urban', 'rural'],
    required: true,
  },
  credit_score_generated: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true, // correct place for options
});


// Optional: indexes
UserFeatureSchema.index({ user_id: 1 }, { unique: true });
UserFeatureSchema.index({ region: 1 });

export default mongoose.model('UserFeature', UserFeatureSchema);
