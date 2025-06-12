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
  DollarSign,
  X
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-16 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4">
                <Handshake className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Building Financial Inclusion Together
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Partnering with NGOs and community organizations to expand access to credit and financial services for underserved populations
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg">
                Partner With Us
              </button>
              <button className="border border-blue-400 text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-500/10 transition-all duration-300">
                View Programs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">25+</div>
              <div className="text-gray-300">NGO Partners</div>
            </div>
            <div className="text-center bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <div className="text-3xl font-bold text-green-400 mb-2">50K+</div>
              <div className="text-gray-300">Lives Impacted</div>
            </div>
            <div className="text-center bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">₹5Cr+</div>
              <div className="text-gray-300">Funding Provided</div>
            </div>
            <div className="text-center bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <div className="text-3xl font-bold text-orange-400 mb-2">12</div>
              <div className="text-gray-300">States Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact Programs</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Collaborative initiatives designed to break down barriers to financial access and create lasting change in communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => {
              const IconComponent = program.icon;
              return (
                <div key={program.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg border border-slate-700 p-6 hover:border-blue-500/50 transition-all duration-300 group">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 mr-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full border border-blue-500/30">
                        {program.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{program.title}</h3>
                  <p className="text-gray-300 mb-4">{program.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-400">{program.impact}</span>
                    <button 
                      onClick={() => setSelectedProgram(program)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center group-hover:translate-x-1 transition-all duration-300"
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
      <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our NGO Partners</h2>
            <p className="text-gray-300">Working with trusted organizations across India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-6 border border-slate-600 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-2">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-gray-400 bg-slate-600/50 px-2 py-1 rounded-full">{partner.type}</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{partner.name}</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                    {partner.location}
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-2 text-purple-400" />
                    {partner.focus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 rounded-full p-4 w-fit mx-auto mb-6">
            <Heart className="w-12 h-12 text-pink-300" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Partner with us to expand financial inclusion and create opportunities for underserved communities
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center text-blue-100 bg-white/10 px-4 py-2 rounded-lg">
              <Mail className="w-5 h-5 mr-2" />
              partnerships@securebank.com
            </div>
            <div className="flex items-center text-blue-100 bg-white/10 px-4 py-2 rounded-lg">
              <Phone className="w-5 h-5 mr-2" />
              +91 98765 43210
            </div>
          </div>
        </div>
      </section>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg max-w-md w-full p-6 border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{selectedProgram.title}</h3>
              <button 
                onClick={() => setSelectedProgram(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-300 mb-4">{selectedProgram.details}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-400">{selectedProgram.impact}</span>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                Get Involved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}