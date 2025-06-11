import React, { useState } from 'react';
import { Upload, User, FileText, Phone, MapPin, Briefcase, Calendar, CreditCard, Home, Smartphone, CheckCircle } from 'lucide-react';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('basic');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    occupation: '',
    utilityBills: '',
    rentPayments: '',
    mobileUsage: '',
    employmentVerification: ''
  });
  const [uploadedDocs, setUploadedDocs] = useState({
    aadhaar: null,
    pan: null,
    utilityBill: null
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (docType, file) => {
    setUploadedDocs(prev => ({ ...prev, [docType]: file }));
  };

  const sections = [
    { id: 'basic', label: 'Basic Details', icon: User },
    { id: 'alternative', label: 'Alternative Data', icon: FileText },
    { id: 'documents', label: 'Upload Documents', icon: Upload }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Profile Setup</h1>
            <p className="text-gray-600">Complete your profile for better financial services</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center mb-8 bg-white rounded-2xl p-2 shadow-lg">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8">
              {/* Basic Details Section */}
              {activeSection === 'basic' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <User className="text-blue-600" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                        <User size={16} />
                        <span>Full Name</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                        <Calendar size={16} />
                        <span>Age</span>
                      </label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your age"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                        <MapPin size={16} />
                        <span>Address</span>
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows="3"
                        placeholder="Enter your complete address"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                        <Briefcase size={16} />
                        <span>Occupation</span>
                      </label>
                      <input
                        type="text"
                        value={formData.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your occupation"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Alternative Data Section */}
              {activeSection === 'alternative' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <FileText className="text-purple-600" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Alternative Data Entry</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                        <CreditCard size={16} />
                        <span>Utility Bill History</span>
                      </label>
                      <textarea
                        value={formData.utilityBills}
                        onChange={(e) => handleInputChange('utilityBills', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows="4"
                        placeholder="Describe your utility payment history (electricity, water, gas bills)"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                        <Home size={16} />
                        <span>Rent Payments</span>
                      </label>
                      <textarea
                        value={formData.rentPayments}
                        onChange={(e) => handleInputChange('rentPayments', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows="4"
                        placeholder="Provide details about your rent payment history"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                        <Smartphone size={16} />
                        <span>Mobile Usage Patterns</span>
                      </label>
                      <textarea
                        value={formData.mobileUsage}
                        onChange={(e) => handleInputChange('mobileUsage', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows="4"
                        placeholder="Describe your mobile recharge patterns and usage"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                        <Briefcase size={16} />
                        <span>Employment Verification</span>
                      </label>
                      <textarea
                        value={formData.employmentVerification}
                        onChange={(e) => handleInputChange('employmentVerification', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows="4"
                        placeholder="Provide employment details, salary information, or business details"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Document Upload Section */}
              {activeSection === 'documents' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <Upload className="text-green-600" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">KYC Document Upload</h2>
                  </div>

                  <div className="grid md:grid-cols-1 gap-6">
                    {/* Aadhaar Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors duration-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <FileText className="text-blue-600" size={24} />
                          <h3 className="text-lg font-semibold text-gray-800">Aadhaar Card</h3>
                          {uploadedDocs.aadhaar && <CheckCircle className="text-green-600" size={20} />}
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload('aadhaar', e.target.files[0])}
                          className="hidden"
                          id="aadhaar-upload"
                        />
                        <label htmlFor="aadhaar-upload" className="cursor-pointer">
                          <div className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors duration-200">
                            <Upload size={20} />
                            <span>{uploadedDocs.aadhaar ? 'Change File' : 'Upload Aadhaar'}</span>
                          </div>
                        </label>
                        {uploadedDocs.aadhaar && (
                          <p className="text-sm text-green-600 mt-2">✓ {uploadedDocs.aadhaar.name}</p>
                        )}
                      </div>
                    </div>

                    {/* PAN Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-purple-400 transition-colors duration-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <CreditCard className="text-purple-600" size={24} />
                          <h3 className="text-lg font-semibold text-gray-800">PAN Card</h3>
                          {uploadedDocs.pan && <CheckCircle className="text-green-600" size={20} />}
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload('pan', e.target.files[0])}
                          className="hidden"
                          id="pan-upload"
                        />
                        <label htmlFor="pan-upload" className="cursor-pointer">
                          <div className="bg-purple-50 hover:bg-purple-100 text-purple-600 px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors duration-200">
                            <Upload size={20} />
                            <span>{uploadedDocs.pan ? 'Change File' : 'Upload PAN'}</span>
                          </div>
                        </label>
                        {uploadedDocs.pan && (
                          <p className="text-sm text-green-600 mt-2">✓ {uploadedDocs.pan.name}</p>
                        )}
                      </div>
                    </div>

                    {/* Utility Bill Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-green-400 transition-colors duration-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <FileText className="text-green-600" size={24} />
                          <h3 className="text-lg font-semibold text-gray-800">Utility Bill</h3>
                          {uploadedDocs.utilityBill && <CheckCircle className="text-green-600" size={20} />}
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload('utilityBill', e.target.files[0])}
                          className="hidden"
                          id="utility-upload"
                        />
                        <label htmlFor="utility-upload" className="cursor-pointer">
                          <div className="bg-green-50 hover:bg-green-100 text-green-600 px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors duration-200">
                            <Upload size={20} />
                            <span>{uploadedDocs.utilityBill ? 'Change File' : 'Upload Utility Bill'}</span>
                          </div>
                        </label>
                        {uploadedDocs.utilityBill && (
                          <p className="text-sm text-green-600 mt-2">✓ {uploadedDocs.utilityBill.name}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                    <p className="text-sm text-blue-800">
                      <strong>Accepted formats:</strong> PDF, JPG, JPEG, PNG. Maximum file size: 5MB per document.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Save Progress
                </button>
                <button className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;