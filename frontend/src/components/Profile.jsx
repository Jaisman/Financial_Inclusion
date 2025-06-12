import React, { useState, useEffect } from 'react';
import {
  User,
  Calendar,
  Briefcase,
  CreditCard,
  Home,
  Smartphone,
  MapPin,
  CheckCircle,
  XCircle
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const authToken = localStorage.getItem('authToken');

  // Axios instance with auth header
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use(config => {
    if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // formData matches schema fields
  const [formData, setFormData] = useState({
    user_id: '',
    age: '',
    employment_status: '',
    monthly_income: '',
    utility_bill_payment_history: '',
    rental_payment_history: '',
    mobile_recharge_frequency: '',
    mobile_data_usage: '',
    education_level: '',
    financial_literacy_score: '',
    loan_repayment_history: '',
    region: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch existing data
  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const resp = await axiosInstance.get(`http://localhost:8000/user/getData/${userId}`);
        const data = resp.data;
        setFormData({
          user_id: data.user_id || userId,
          age: data.age?.toString() || '',
          employment_status: data.employment_status || '',
          monthly_income: data.monthly_income?.toString() || '',
          utility_bill_payment_history: data.utility_bill_payment_history?.toString() || '',
          rental_payment_history: data.rental_payment_history?.toString() || '',
          mobile_recharge_frequency: data.mobile_recharge_frequency?.toString() || '',
          mobile_data_usage: data.mobile_data_usage?.toString() || '',
          education_level: data.education_level || '',
          financial_literacy_score: data.financial_literacy_score?.toString() || '',
          loan_repayment_history: data.loan_repayment_history?.toString() || '',
          region: data.region || ''
        });
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  // Validation according to schema constraints
  const validateForm = () => {
    const errs = {};
    // age: required, number 18-100
    if (!formData.age.trim()) errs.age = 'Required';
    else {
      const n = Number(formData.age);
      if (isNaN(n) || n < 18 || n > 100) errs.age = '18–100';
    }
    // employment_status
    if (!formData.employment_status) errs.employment_status = 'Required';
    else if (!['salaried','self-employed','unemployed'].includes(formData.employment_status))
      errs.employment_status = 'Invalid';
    // monthly_income
    if (!formData.monthly_income.trim()) errs.monthly_income = 'Required';
    else {
      const n = Number(formData.monthly_income);
      if (isNaN(n) || n < 0) errs.monthly_income = 'Invalid';
    }
    // utility_bill_payment_history: 0-100
    if (!formData.utility_bill_payment_history.trim()) errs.utility_bill_payment_history = 'Required';
    else {
      const n = Number(formData.utility_bill_payment_history);
      if (isNaN(n) || n < 0 || n > 100) errs.utility_bill_payment_history = '0–100';
    }
    // rental_payment_history: 0-100
    if (!formData.rental_payment_history.trim()) errs.rental_payment_history = 'Required';
    else {
      const n = Number(formData.rental_payment_history);
      if (isNaN(n) || n < 0 || n > 100) errs.rental_payment_history = '0–100';
    }
    // mobile_recharge_frequency: >=0
    if (!formData.mobile_recharge_frequency.trim()) errs.mobile_recharge_frequency = 'Required';
    else {
      const n = Number(formData.mobile_recharge_frequency);
      if (isNaN(n) || n < 0) errs.mobile_recharge_frequency = 'Invalid';
    }
    // mobile_data_usage
    if (!formData.mobile_data_usage.trim()) errs.mobile_data_usage = 'Required';
    else {
      const n = Number(formData.mobile_data_usage);
      if (isNaN(n) || n < 0) errs.mobile_data_usage = 'Invalid';
    }
    // education_level
    if (!formData.education_level) errs.education_level = 'Required';
    else if (!['High School','Diploma','Graduate','Postgraduate'].includes(formData.education_level))
      errs.education_level = 'Invalid';
    // financial_literacy_score: 0–10
    if (!formData.financial_literacy_score.trim()) errs.financial_literacy_score = 'Required';
    else {
      const n = Number(formData.financial_literacy_score);
      if (isNaN(n) || n < 0 || n > 10) errs.financial_literacy_score = '0–10';
    }
    // loan_repayment_history: 0–100
    if (!formData.loan_repayment_history.trim()) errs.loan_repayment_history = 'Required';
    else {
      const n = Number(formData.loan_repayment_history);
      if (isNaN(n) || n < 0 || n > 100) errs.loan_repayment_history = '0–100';
    }
    // region
    if (!formData.region) errs.region = 'Required';
    else if (!['urban','semi-urban','rural'].includes(formData.region))
      errs.region = 'Invalid';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Compute completion %: count filled fields (excluding user_id)
  const computeCompletion = () => {
    const keys = [
      'age','employment_status','monthly_income',
      'utility_bill_payment_history','rental_payment_history',
      'mobile_recharge_frequency','mobile_data_usage',
      'education_level','financial_literacy_score',
      'loan_repayment_history','region'
    ];
    let filled = 0;
    keys.forEach(k => {
      if (formData[k] !== '' && formData[k] !== null) filled++;
    });
    return Math.round((filled / keys.length) * 100);
  };
  const completion = computeCompletion();

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    setSaving(true);
    try {
      const payload = {
        age: Number(formData.age),
        employment_status: formData.employment_status,
        monthly_income: Number(formData.monthly_income),
        utility_bill_payment_history: Number(formData.utility_bill_payment_history),
        rental_payment_history: Number(formData.rental_payment_history),
        mobile_recharge_frequency: Number(formData.mobile_recharge_frequency),
        mobile_data_usage: Number(formData.mobile_data_usage),
        education_level: formData.education_level,
        financial_literacy_score: Number(formData.financial_literacy_score),
        loan_repayment_history: Number(formData.loan_repayment_history),
        region: formData.region
      };
      await axiosInstance.put(`http://localhost:8000/user/update/${userId}`, payload);
      alert('Profile saved');
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            <p className="text-gray-600">Complete your profile for financial inclusion</p>
          </div>
          {/* Completion Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="bg-green-500 h-3 rounded-full transition-width duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
          {error && <p className="text-red-600 mb-4">{error}</p>}

          {/* Two-column cards */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Card: Basic & Income */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
              {/* user_id (readonly) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">User ID</label>
                <input
                  type="text"
                  value={formData.user_id}
                  readOnly
                  className="mt-1 w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-xl"
                />
              </div>
              {/* Age */}
              <div className="mb-4">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Calendar size={16} /><span>Age</span>
                </label>
                <input
                  type="number"
                  min="18"
                  max="100"
                  value={formData.age}
                  
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                    formErrors.age ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {formErrors.age && (
                  <p className="text-red-600 text-sm flex items-center mt-1">
                    <XCircle size={14} className="mr-1" />{formErrors.age}
                  </p>
                )}
              </div>
              {/* Employment Status */}
              <div className="mb-4">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Briefcase size={16} /><span>Employment Status</span>
                </label>
                 <input
                  type="text"
                  
                  value={formData.employment_status}
                  disabled
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                    formErrors.age ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                
                {formErrors.employment_status && (
                  <p className="text-red-600 text-sm flex items-center mt-1">
                    <XCircle size={14} className="mr-1" />{formErrors.employment_status}
                  </p>
                )}
              </div>
              {/* Monthly Income */}
              <div className="mb-4">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <CreditCard size={16} /><span>Monthly Income (INR)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.monthly_income}
                  disabled
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                    formErrors.monthly_income ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {formErrors.monthly_income && (
                  <p className="text-red-600 text-sm flex items-center mt-1">
                    <XCircle size={14} className="mr-1" />{formErrors.monthly_income}
                  </p>
                )}
              </div>
              {/* Region */}
              <div className="mb-4">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <MapPin size={16} /><span>Region</span>
                </label>
                
                <select
                  value={formData.region}
                 disabled
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                    formErrors.region ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select</option>
                  <option value="urban">Urban</option>
                  <option value="semi-urban">Semi-urban</option>
                  <option value="rural">Rural</option>
                </select>
                {formErrors.region && (
                  <p className="text-red-600 text-sm flex items-center mt-1">
                    <XCircle size={14} className="mr-1" />{formErrors.region}
                  </p>
                )}
              </div>
            </div>

            {/* Right Card: Alternative Data */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
              {/* Utility Bill History slider */}
              <div className="mb-6">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Home size={16} /><span>Utility Bill History (%)</span>
                </label>
                <div className="flex items-center space-x-3 mt-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.utility_bill_payment_history}
                   disabled
                    className="flex-1"
                  />
                  <span className="w-12 text-right">{formData.utility_bill_payment_history || 0}%</span>
                </div>
                {formErrors.utility_bill_payment_history && (
                  <p className="text-red-600 text-sm flex items-center mt-1">
                    <XCircle size={14} className="mr-1" />{formErrors.utility_bill_payment_history}
                  </p>
                )}
              </div>
              {/* Rental Payment History slider */}
              <div className="mb-6">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Home size={16} /><span>Rent Payment History (%)</span>
                </label>
                <div className="flex items-center space-x-3 mt-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.rental_payment_history}
                    disabled
                    className="flex-1"
                  />
                  <span className="w-12 text-right">{formData.rental_payment_history || 0}%</span>
                </div>
                {formErrors.rental_payment_history && (
                  <p className="text-red-600 text-sm flex items-center mt-1">
                    <XCircle size={14} className="mr-1" />{formErrors.rental_payment_history}
                  </p>
                )}
              </div>
              {/* Mobile Recharge Frequency */}
              <div className="mb-4">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Smartphone size={16} /><span>Mobile Recharge Frequency (/month)</span>
                </label>
                <input
                  type="number"
                  disabled
                  min="0"
                  value={formData.mobile_recharge_frequency}
                  
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                    formErrors.mobile_recharge_frequency ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {formErrors.mobile_recharge_frequency && (
                  <p className="text-red-600 text-sm flex items-center mt-1">
                    <XCircle size={14} className="mr-1" />{formErrors.mobile_recharge_frequency}
                  </p>
                )}
              </div>
              {/* Mobile Data Usage */}
              <div className="mb-4">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Smartphone size={16} /><span>Mobile Data Usage (GB/month)</span>
                </label>
                <input
                disabled
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.mobile_data_usage}
                  
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                    formErrors.mobile_data_usage ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {formErrors.mobile_data_usage && (
                  <p className="text-red-600 text-sm flex items-center mt-1">
                    <XCircle size={14} className="mr-1" />{formErrors.mobile_data_usage}
                  </p>
                )}
              </div>
              {/* Education Level */}
              <div className="mb-4">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Briefcase size={16} /><span>Education Level</span>
                </label>
                <select
                  value={formData.education_level}
                 disabled
                  className={`mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                    formErrors.education_level ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select</option>
                  <option value="High School">High School</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
                {formErrors.education_level && (
                  <p className="text-red-600 text-sm flex items-center mt-1">
                    <XCircle size={14} className="mr-1" />{formErrors.education_level}
                  </p>
                )}
              </div>
              {/* Financial Literacy Score slider */}
              <div className="mb-6">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <CreditCard size={16} /><span>Financial Literacy Score (0–10)</span>
                </label>
                <div className="flex items-center space-x-3 mt-1">
                  <input
                    type="range"
                    disabled
                    min="0"
                    max="10"
                    value={formData.financial_literacy_score}
                    
                    className="flex-1"
                  />
                  <span className="w-8 text-right">{formData.financial_literacy_score || 0}</span>
                </div>
                {formErrors.financial_literacy_score && (
                  <p className="text-red-600 text-sm flex items-center mt-1">
                    <XCircle size={14} className="mr-1" />{formErrors.financial_literacy_score}
                  </p>
                )}
              </div>
              {/* Loan Repayment History slider */}
              <div className="mb-6">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Home size={16} /><span>Loan Repayment History (%)</span>
                </label>
                <div className="flex items-center space-x-3 mt-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    disabled
                    value={formData.loan_repayment_history}
                    
                    className="flex-1"
                  />
                  <span className="w-12 text-right">{formData.loan_repayment_history || 0}%</span>
                </div>
                {formErrors.loan_repayment_history && (
                  <p className="text-red-600 text-sm flex items-center mt-1">
                    <XCircle size={14} className="mr-1" />{formErrors.loan_repayment_history}
                  </p>
                )}
              </div>
            </div>
          </div>

    
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
