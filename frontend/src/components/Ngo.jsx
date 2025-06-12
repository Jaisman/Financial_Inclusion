import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Target,
  BookOpen,
  Handshake,
  MapPin,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Building,
  Heart,
  DollarSign
} from 'lucide-react';

export default function NGOPage() {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = [
    {
      id: 1,
      title: "Microfinance Initiative",
      description: "Small loans for entrepreneurs in underserved communities",
      impact: "2,500+ beneficiaries",
      category: "Lending",
      icon: DollarSign,
      details: "Providing micro-loans from $50-$500 to help individuals start small businesses and build credit history."
    },
    {
      id: 2,
      title: "Financial Literacy Workshops",
      description: "Educational programs on credit management and financial planning",
      impact: "10,000+ participants",
      category: "Education",
      icon: BookOpen,
      details: "Monthly workshops covering budgeting, saving, credit building, and digital financial services."
    },
    {
      id: 3,
      title: "Community Credit Building",
      description: "Alternative credit scoring for unbanked populations",
      impact: "5,000+ credit profiles",
      category: "Credit Access",
      icon: Target,
      details: "Using utility payments, mobile money, and rental history to build credit profiles for the unbanked."
    }
  ];

  const partners = [
    {
      name: "Rural Development Trust",
      type: "Community Development",
      location: "Punjab, India",
      focus: "Microfinance & Education"
    },
    {
      name: "Financial Inclusion Foundation",
      type: "Policy & Advocacy",
      location: "Delhi, India",
      focus: "Digital Financial Services"
    },
    {
      name: "Women Entrepreneurs Network",
      type: "Business Support",
      location: "Maharashtra, India",
      focus: "Women-led Businesses"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <Handshake className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Building Financial Inclusion Together</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Partnering with NGOs and community organizations to expand access to credit and financial services for underserved populations
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Partner With Us
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors">
                View Programs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">NGO Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Lives Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">₹5Cr+</div>
              <div className="text-gray-600">Funding Provided</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
              <div className="text-gray-600">States Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Collaborative initiatives designed to break down barriers to financial access and create lasting change in communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => {
              const IconComponent = program.icon;
              return (
                <div key={program.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {program.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">{program.impact}</span>
                    <button 
                      onClick={() => setSelectedProgram(program)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our NGO Partners</h2>
            <p className="text-gray-600">Working with trusted organizations across India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-white rounded-lg p-2">
                    <Building className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-500">{partner.type}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{partner.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {partner.location}
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    {partner.focus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-12 h-12 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Partner with us to expand financial inclusion and create opportunities for underserved communities
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center text-blue-100">
              <Mail className="w-5 h-5 mr-2" />
              partnerships@securebank.com
            </div>
            <div className="flex items-center text-blue-100">
              <Phone className="w-5 h-5 mr-2" />
              +91 98765 43210
            </div>
          </div>
        </div>
      </section>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedProgram.title}</h3>
              <button 
                onClick={() => setSelectedProgram(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 mb-4">{selectedProgram.details}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-600">{selectedProgram.impact}</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                Get Involved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}