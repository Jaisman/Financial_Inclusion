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
  XCircle,
  Brain,
  Save
} from 'lucide-react';

const ProfilePage = () => {
  // Mock data - in real app, this would come from props or API
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // formData matches schema fields
  const [formData, setFormData] = useState({
    user_id: userId,
    age: '',
    employment_status: '',
    monthly_income: '',
    utility_bill_payment_history: '0',
    rental_payment_history: '0',
    mobile_recharge_frequency: '',
    mobile_data_usage: '',
    education_level: '',
    financial_literacy_score: '0',
    loan_repayment_history: '0',
    region: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch(`http://localhost:8000/user/getData/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Update form data with fetched data, ensuring all fields have values
        setFormData(prevData => ({
          user_id: data.user_id || userId,
          age: data.age?.toString() || '',
          employment_status: data.employment_status || '',
          monthly_income: data.monthly_income?.toString() || '',
          utility_bill_payment_history: data.utility_bill_payment_history?.toString() || '0',
          rental_payment_history: data.rental_payment_history?.toString() || '0',
          mobile_recharge_frequency: data.mobile_recharge_frequency?.toString() || '',
          mobile_data_usage: data.mobile_data_usage?.toString() || '',
          education_level: data.education_level || '',
          financial_literacy_score: data.financial_literacy_score?.toString() || '0',
          loan_repayment_history: data.loan_repayment_history?.toString() || '0',
          region: data.region || ''
        }));

      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(`Failed to load profile data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, authToken]);

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
    setError('');
    
    try {
      // Prepare data for API - convert string values to appropriate types
      const apiData = {
        user_id: formData.user_id,
        age: parseInt(formData.age),
        employment_status: formData.employment_status,
        monthly_income: parseFloat(formData.monthly_income),
        utility_bill_payment_history: parseFloat(formData.utility_bill_payment_history),
        rental_payment_history: parseFloat(formData.rental_payment_history),
        mobile_recharge_frequency: parseInt(formData.mobile_recharge_frequency),
        mobile_data_usage: parseFloat(formData.mobile_data_usage),
        education_level: formData.education_level,
        financial_literacy_score: parseInt(formData.financial_literacy_score),
        loan_repayment_history: parseFloat(formData.loan_repayment_history),
        region: formData.region
      };

      const response = await fetch(`http://localhost:8000/user/updateData/${userId}`, {
        method: 'PUT', // or POST depending on your backend API
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(apiData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert('Profile saved successfully!');
      
    } catch (err) {
      console.error('Error saving profile:', err);
      setError(`Failed to save profile: ${err.message}`);
      alert('Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <User className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sushmita Devi 👤
            </h1>
          </div>
          <p className="text-gray-400">Complete your profile for better financial inclusion</p>
        </div>

        {/* Completion Progress */}
        <div className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-sm border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              
            </div>
            
          </div>
          <div className="bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Two-column cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card: Basic & Income */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-sm border border-slate-700 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Briefcase className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-200">Basic Information</h3>
            </div>

            {/* user_id (readonly) */}
            <div className="mb-6">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <User size={16} className="text-gray-400" />
                <span>User ID</span>
              </label>
              <input
                type="text"
                value={formData.user_id}
                readOnly
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-gray-400"
              />
            </div>

            {/* Age */}
            <div className="mb-6">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <Calendar size={16} className="text-gray-400" />
                <span>Age</span>
              </label>
              <input
                type="number"
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                readOnly
                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400 ${
                  formErrors.age ? 'border-red-500 bg-red-500/10' : 'border-slate-600'
                }`}
              />
              {formErrors.age && (
                <p className="text-red-400 text-sm flex items-center mt-2">
                  <XCircle size={14} className="mr-1" />{formErrors.age}
                </p>
              )}
            </div>

            {/* Employment Status */}
            <div className="mb-6">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <Briefcase size={16} className="text-gray-400" />
                <span>Employment Status</span>
              </label>
              <select
                value={formData.employment_status}
                disabled={true}
                onChange={(e) => handleInputChange('employment_status', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 ${
                  formErrors.employment_status ? 'border-red-500 bg-red-500/10' : 'border-slate-600'
                }`}
              >
                <option value="">Select Employment Status</option>
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self-employed</option>
                <option value="unemployed">Unemployed</option>
              </select>
              {formErrors.employment_status && (
                <p className="text-red-400 text-sm flex items-center mt-2">
                  <XCircle size={14} className="mr-1" />{formErrors.employment_status}
                </p>
              )}
            </div>

            {/* Monthly Income */}
            <div className="mb-6">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <CreditCard size={16} className="text-gray-400" />
                <span>Monthly Income (INR)</span>
              </label>
              <input
                type="number"
                min="0"
                readOnly
                value={formData.monthly_income}
                onChange={(e) => handleInputChange('monthly_income', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400 ${
                  formErrors.monthly_income ? 'border-red-500 bg-red-500/10' : 'border-slate-600'
                }`}
              />
              {formErrors.monthly_income && (
                <p className="text-red-400 text-sm flex items-center mt-2">
                  <XCircle size={14} className="mr-1" />{formErrors.monthly_income}
                </p>
              )}
            </div>

            {/* Region */}
            <div className="mb-6">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <MapPin size={16} className="text-gray-400" />
                <span>Region</span>
              </label>
              <select
                disabled={true}
                value={formData.region}
                onChange={(e) => handleInputChange('region', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 ${
                  formErrors.region ? 'border-red-500 bg-red-500/10' : 'border-slate-600'
                }`}
              >
                <option value="">Select Region</option>
                <option value="urban">Urban</option>
                <option value="semi-urban">Semi-urban</option>
                <option value="rural">Rural</option>
              </select>
              {formErrors.region && (
                <p className="text-red-400 text-sm flex items-center mt-2">
                  <XCircle size={14} className="mr-1" />{formErrors.region}
                </p>
              )}
            </div>

            {/* Education Level */}
            <div className="mb-6">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <Brain size={16} className="text-gray-400" />
                <span>Education Level</span>
              </label>
              <select
                disabled={true}
                value={formData.education_level}
                onChange={(e) => handleInputChange('education_level', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 ${
                  formErrors.education_level ? 'border-red-500 bg-red-500/10' : 'border-slate-600'
                }`}
              >
                <option value="">Select Education Level</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Graduate">Graduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
              {formErrors.education_level && (
                <p className="text-red-400 text-sm flex items-center mt-2">
                  <XCircle size={14} className="mr-1" />{formErrors.education_level}
                </p>
              )}
            </div>
          </div>

          {/* Right Card: Alternative Data */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-sm border border-slate-700 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Smartphone className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-200">Financial Behavior</h3>
            </div>

            {/* Utility Bill History slider */}
            <div className="mb-8">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                <Home size={16} className="text-gray-400" />
                <span>Utility Bill Payment History (%)</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  readOnly
                  disabled={true}
                  value={formData.utility_bill_payment_history}
                  onChange={(e) => handleInputChange('utility_bill_payment_history', e.target.value)}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="w-16 text-right text-lg font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {formData.utility_bill_payment_history || 0}%
                </span>
              </div>
              {formErrors.utility_bill_payment_history && (
                <p className="text-red-400 text-sm flex items-center mt-2">
                  <XCircle size={14} className="mr-1" />{formErrors.utility_bill_payment_history}
                </p>
              )}
            </div>

            {/* Rental Payment History slider */}
            <div className="mb-8">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                <Home size={16} className="text-gray-400" />
                <span>Rent Payment History (%)</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  disabled={true}
                  value={formData.rental_payment_history}
                  onChange={(e) => handleInputChange('rental_payment_history', e.target.value)}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="w-16 text-right text-lg font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {formData.rental_payment_history || 0}%
                </span>
              </div>
              {formErrors.rental_payment_history && (
                <p className="text-red-400 text-sm flex items-center mt-2">
                  <XCircle size={14} className="mr-1" />{formErrors.rental_payment_history}
                </p>
              )}
            </div>

            {/* Mobile Recharge Frequency */}
            <div className="mb-6">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <Smartphone size={16} className="text-gray-400" />
                <span>Mobile Recharge Frequency (/month)</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.mobile_recharge_frequency}
                disabled={true}
                onChange={(e) => handleInputChange('mobile_recharge_frequency', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400 ${
                  formErrors.mobile_recharge_frequency ? 'border-red-500 bg-red-500/10' : 'border-slate-600'
                }`}
              />
              {formErrors.mobile_recharge_frequency && (
                <p className="text-red-400 text-sm flex items-center mt-2">
                  <XCircle size={14} className="mr-1" />{formErrors.mobile_recharge_frequency}
                </p>
              )}
            </div>

            {/* Mobile Data Usage */}
            <div className="mb-6">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <Smartphone size={16} className="text-gray-400" />
                <span>Mobile Data Usage (GB/month)</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={formData.mobile_data_usage}
                disabled={true}
                onChange={(e) => handleInputChange('mobile_data_usage', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400 ${
                  formErrors.mobile_data_usage ? 'border-red-500 bg-red-500/10' : 'border-slate-600'
                }`}
              />
              {formErrors.mobile_data_usage && (
                <p className="text-red-400 text-sm flex items-center mt-2">
                  <XCircle size={14} className="mr-1" />{formErrors.mobile_data_usage}
                </p>
              )}
            </div>

            {/* Financial Literacy Score slider */}
            <div className="mb-8">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                <Brain size={16} className="text-gray-400" />
                <span>Financial Literacy Score (0–10)</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.financial_literacy_score}
                  disabled={true}
                  onChange={(e) => handleInputChange('financial_literacy_score', e.target.value)}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="w-8 text-right text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {formData.financial_literacy_score || 0}
                </span>
              </div>
              {formErrors.financial_literacy_score && (
                <p className="text-red-400 text-sm flex items-center mt-2">
                  <XCircle size={14} className="mr-1" />{formErrors.financial_literacy_score}
                </p>
              )}
            </div>

            {/* Loan Repayment History slider */}
            <div className="mb-8">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                <CreditCard size={16} className="text-gray-400" />
                <span>Loan Repayment History (%)</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.loan_repayment_history}
                  disabled={true}
                  onChange={(e) => handleInputChange('loan_repayment_history', e.target.value)}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="w-16 text-right text-lg font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {formData.loan_repayment_history || 0}%
                </span>
              </div>
              {formErrors.loan_repayment_history && (
                <p className="text-red-400 text-sm flex items-center mt-2">
                  <XCircle size={14} className="mr-1" />{formErrors.loan_repayment_history}
                </p>
              )}
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;