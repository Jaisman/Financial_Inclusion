import React, { useState, useEffect } from 'react';
import { 
  Users, Target, BookOpen, Handshake, MapPin, Mail, Phone,
  ArrowRight, Building, Heart, DollarSign, Star, Share2, 
  ChevronLeft, ChevronRight, Search, BarChart3, FileText, 
  MessageCircle, ThumbsUp, User, Upload, CheckCircle,
  Award, Globe, TrendingUp, Calendar, Video, Download,
  Pause, Play, ExternalLink, Clock, Camera
} from 'lucide-react';
import images from '../assets/images.png';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.avif';
import img from '../assets/img.jpg';
import img2 from '../assets/img2.jpg';
// Updated SVG Avatars with Better Design
const WomanAvatar = ({ size = 96 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="skinGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#FDB5A6", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#F4A49C", stopOpacity:1}} />
      </linearGradient>
      <linearGradient id="hairGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#8B4513", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#654321", stopOpacity:1}} />
      </linearGradient>
    </defs>
    
    {/* Face background */}
    <circle cx="50" cy="50" r="45" fill="#FFE5D4" stroke="#E0C3A8" strokeWidth="2"/>
    
    {/* Face shape */}
    <ellipse cx="50" cy="55" rx="32" ry="38" fill="url(#skinGradient1)"/>
    
    {/* Hair */}
    <ellipse cx="50" cy="35" rx="35" ry="25" fill="url(#hairGradient1)"/>
    <ellipse cx="50" cy="28" rx="28" ry="18" fill="url(#hairGradient1)"/>
    
    {/* Hair strands */}
    <path d="M25 40 Q30 35 35 40" stroke="url(#hairGradient1)" strokeWidth="3" fill="none"/>
    <path d="M65 40 Q70 35 75 40" stroke="url(#hairGradient1)" strokeWidth="3" fill="none"/>
    
    {/* Eyes */}
    <ellipse cx="42" cy="48" rx="4" ry="3" fill="white"/>
    <ellipse cx="58" cy="48" rx="4" ry="3" fill="white"/>
    <circle cx="42" cy="48" r="2" fill="#4A4A4A"/>
    <circle cx="58" cy="48" r="2" fill="#4A4A4A"/>
    <circle cx="42.5" cy="47.5" r="0.8" fill="white"/>
    <circle cx="58.5" cy="47.5" r="0.8" fill="white"/>
    
    {/* Eyebrows */}
    <path d="M38 43 Q42 41 46 43" stroke="#654321" strokeWidth="2" fill="none"/>
    <path d="M54 43 Q58 41 62 43" stroke="#654321" strokeWidth="2" fill="none"/>
    
    {/* Nose */}
    <ellipse cx="50" cy="55" rx="2" ry="3" fill="#E8A691"/>
    
    {/* Mouth */}
    <path d="M46 62 Q50 66 54 62" stroke="#C4817A" strokeWidth="2" fill="none"/>
    
    {/* Earrings */}
    <circle cx="25" cy="52" r="2" fill="#FFD700"/>
    <circle cx="75" cy="52" r="2" fill="#FFD700"/>
    
    {/* Blush */}
    <ellipse cx="35" cy="58" rx="4" ry="2" fill="#F8B5A9" opacity="0.6"/>
    <ellipse cx="65" cy="58" rx="4" ry="2" fill="#F8B5A9" opacity="0.6"/>
  </svg>
);

const ManAvatar = ({ size = 96 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="skinGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#E8B889", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#D4A574", stopOpacity:1}} />
      </linearGradient>
      <linearGradient id="hairGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#2F2F2F", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#1A1A1A", stopOpacity:1}} />
      </linearGradient>
    </defs>
    
    {/* Face background */}
    <circle cx="50" cy="50" r="45" fill="#F5E6D3" stroke="#D4A574" strokeWidth="2"/>
    
    {/* Face shape */}
    <ellipse cx="50" cy="55" rx="32" ry="38" fill="url(#skinGradient2)"/>
    
    {/* Hair - Short professional cut */}
    <ellipse cx="50" cy="32" rx="33" ry="20" fill="url(#hairGradient2)"/>
    <rect x="20" y="25" width="60" height="15" rx="8" fill="url(#hairGradient2)"/>
    
    {/* Glasses */}
    <rect x="35" y="42" width="30" height="12" rx="6" fill="none" stroke="#333333" strokeWidth="2"/>
    <line x1="35" y1="48" x2="20" y2="48" stroke="#333333" strokeWidth="2"/>
    <line x1="65" y1="48" x2="80" y2="48" stroke="#333333" strokeWidth="2"/>
    <line x1="50" y1="42" x2="50" y2="46" stroke="#333333" strokeWidth="2"/>
    
    {/* Eyes behind glasses */}
    <ellipse cx="42" cy="48" rx="4" ry="3" fill="white"/>
    <ellipse cx="58" cy="48" rx="4" ry="3" fill="white"/>
    <circle cx="42" cy="48" r="2" fill="#2D5AA0"/>
    <circle cx="58" cy="48" r="2" fill="#2D5AA0"/>
    <circle cx="42.5" cy="47.5" r="0.8" fill="white"/>
    <circle cx="58.5" cy="47.5" r="0.8" fill="white"/>
    
    {/* Eyebrows */}
    <path d="M38 40 Q42 38 46 40" stroke="#2F2F2F" strokeWidth="2" fill="none"/>
    <path d="M54 40 Q58 38 62 40" stroke="#2F2F2F" strokeWidth="2" fill="none"/>
    
    {/* Nose */}
    <ellipse cx="50" cy="55" rx="2.5" ry="3" fill="#D19968"/>
    
    {/* Mouth */}
    <path d="M46 63 Q50 67 54 63" stroke="#A67C52" strokeWidth="2" fill="none"/>
    
    {/* Beard shadow */}
    <ellipse cx="50" cy="70" rx="15" ry="8" fill="#E8B889" opacity="0.7"/>
    <ellipse cx="50" cy="68" rx="12" ry="6" fill="#D4A574" opacity="0.5"/>
  </svg>
);

const ElderlyWomanAvatar = ({ size = 96 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="skinGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#F5E1D0", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#E6C8B5", stopOpacity:1}} />
      </linearGradient>
      <linearGradient id="hairGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#C0C0C0", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#A0A0A0", stopOpacity:1}} />
      </linearGradient>
    </defs>
    
    {/* Face background */}
    <circle cx="50" cy="50" r="45" fill="#FAF0E6" stroke="#D4A574" strokeWidth="2"/>
    
    {/* Face shape */}
    <ellipse cx="50" cy="55" rx="32" ry="38" fill="url(#skinGradient3)"/>
    
    {/* Hair - Traditional bun style */}
    <ellipse cx="50" cy="32" rx="30" ry="18" fill="url(#hairGradient3)"/>
    <circle cx="50" cy="25" r="12" fill="url(#hairGradient3)"/>
    <ellipse cx="25" cy="35" rx="8" ry="12" fill="url(#hairGradient3)"/>
    <ellipse cx="75" cy="35" rx="8" ry="12" fill="url(#hairGradient3)"/>
    
    {/* Hair accessories */}
    <circle cx="50" cy="25" r="3" fill="#8B4513"/>
    
    {/* Eyes with slight wrinkles */}
    <ellipse cx="42" cy="48" rx="4" ry="3" fill="white"/>
    <ellipse cx="58" cy="48" rx="4" ry="3" fill="white"/>
    <circle cx="42" cy="48" r="2" fill="#654321"/>
    <circle cx="58" cy="48" r="2" fill="#654321"/>
    <circle cx="42.5" cy="47.5" r="0.8" fill="white"/>
    <circle cx="58.5" cy="47.5" r="0.8" fill="white"/>
    
    {/* Smile lines */}
    <path d="M36 45 Q39 43 42 45" stroke="#D4A574" strokeWidth="1" fill="none"/>
    <path d="M58 45 Q61 43 64 45" stroke="#D4A574" strokeWidth="1" fill="none"/>
    
    {/* Eyebrows */}
    <path d="M38 42 Q42 40 46 42" stroke="#A0A0A0" strokeWidth="2" fill="none"/>
    <path d="M54 42 Q58 40 62 42" stroke="#A0A0A0" strokeWidth="2" fill="none"/>
    
    {/* Nose */}
    <ellipse cx="50" cy="55" rx="2" ry="3" fill="#E0C3A8"/>
    
    {/* Mouth - gentle smile */}
    <path d="M46 63 Q50 67 54 63" stroke="#B8956E" strokeWidth="2" fill="none"/>
    
    {/* Traditional necklace */}
    <ellipse cx="50" cy="85" rx="20" ry="3" fill="#FFD700"/>
    <circle cx="50" cy="83" r="2" fill="#FF6B35"/>
    
    {/* Gentle wrinkles */}
    <path d="M32 60 Q35 58 38 60" stroke="#D4A574" strokeWidth="1" fill="none" opacity="0.6"/>
    <path d="M62 60 Q65 58 68 60" stroke="#D4A574" strokeWidth="1" fill="none" opacity="0.6"/>
  </svg>
);

export default function NGOPage() {
  const [activeSection, setActiveSection] = useState('programs');
  const [currentStory, setCurrentStory] = useState(0);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentStory(prev => (prev + 1) % stories.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  const sections = [
    { id: 'programs', label: 'Impact Programs', icon: Target },
    { id: 'partners', label: 'Partner Network', icon: Building },
    { id: 'tracker', label: 'Progress Tracker', icon: BarChart3 },
    { id: 'resources', label: 'Learning Hub', icon: BookOpen }
  ];

  const stories = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      story: "Started a small tailoring business with a ₹15,000 microloan. Now employs 5 women and has expanded to two locations.",
      achievement: "Business Growth: 400%",
      duration: "2 years",
      profileImage: <WomanAvatar size={96} />,
      thumb: <WomanAvatar size={48} />,
      businessImage: img
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Patna, Bihar",
      story: "Used financial literacy training to improve his credit score from 450 to 720 and secured his first home loan.",
      achievement: "Credit Score: +270 points",
      duration: "18 months",
      profileImage: <ManAvatar size={96} />,
      thumb: <ManAvatar size={48} />,
      businessImage: img2
    },
    {
      id: 3,
      name: "Sunita Devi",
      location: "Jaipur, Rajasthan",
      story: "Built a successful dairy cooperative with 20 members using community credit building program.",
      achievement: "Community Impact: 20 families",
      duration: "3 years",
      profileImage: <ElderlyWomanAvatar size={96} />,
      thumb: <ElderlyWomanAvatar size={48} />,
      businessImage: image3
    }
  ];

  const programs = [
    {
      id: 1,
      title: "Microfinance Initiative",
      description: "Small loans for entrepreneurs in underserved communities with flexible repayment terms",
      impact: "2,500+ beneficiaries",
      category: "Lending",
      icon: DollarSign,
      progress: 85,
      color: "blue"
    },
    {
      id: 2,
      title: "Financial Literacy Workshops",
      description: "Educational programs on credit management, digital banking, and financial planning",
      impact: "10,000+ participants",
      category: "Education",
      icon: BookOpen,
      progress: 92,
      color: "green"
    },
    {
      id: 3,
      title: "Community Credit Building",
      description: "Alternative credit scoring for unbanked populations using innovative data sources",
      impact: "5,000+ credit profiles",
      category: "Credit Access",
      icon: Target,
      progress: 78,
      color: "purple"
    }
  ];

  const partners = [
    {
      id: 1,
      name: "Rural Development Trust",
      type: "Community Development",
      location: "Mumbai, Maharashtra",
      focus: "Microfinance & Education",
      beneficiaries: "5,000+",
      established: "2015"
    },
    {
      id: 2,
      name: "Financial Inclusion Foundation",
      type: "Policy & Advocacy",
      location: "Delhi, India",
      focus: "Digital Financial Services",
      beneficiaries: "15,000+",
      established: "2018"
    },
    {
      id: 3,
      name: "Women Entrepreneurs Network",
      type: "Business Support",
      location: "Bangalore, Karnataka",
      focus: "Women-led Businesses",
      beneficiaries: "8,000+",
      established: "2016"
    }
  ];

  const applications = [
    {
      id: 1,
      program: "Microfinance Initiative",
      applicant: "Raj Patel",
      stage: "Document Review",
      progress: 65,
      status: "In Progress",
      nextStep: "Credit Assessment"
    },
    {
      id: 2,
      program: "Financial Literacy Workshop",
      applicant: "Meera Sharma",
      stage: "Approved",
      progress: 100,
      status: "Completed",
      nextStep: "Workshop Attendance"
    }
  ];

  const resources = [
    {
      id: 1,
      title: "Understanding Credit Scores",
      type: "Article",
      category: "Credit Building",
      rating: 4.8,
      downloads: 2847,
      icon: FileText
    },
    {
      id: 2,
      title: "Digital Banking Basics",
      type: "Video",
      category: "Digital Banking",
      rating: 4.6,
      downloads: 1923,
      icon: Video
    }
  ];

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Handshake className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Financial Inclusion Network</h1>
            <p className="text-gray-600 text-lg">Empowering communities through innovative financial solutions</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { number: "25+", label: "NGO Partners", color: "blue" },
              { number: "50K+", label: "Lives Impacted", color: "green" },
              { number: "₹5Cr+", label: "Funding Provided", color: "purple" },
              { number: "12", label: "States Covered", color: "orange" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
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
              
              {/* Programs Section */}
              {activeSection === 'programs' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Target className="text-blue-600" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Our Impact Programs</h2>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {programs.map((program) => {
                      const IconComponent = program.icon;
                      return (
                        <div key={program.id} className={`border-2 border-gray-200 rounded-2xl p-6 hover:border-${program.color}-400 transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                          <div className="flex items-center mb-4">
                            <div className={`bg-${program.color}-100 rounded-xl p-3 mr-4`}>
                              <IconComponent className={`w-6 h-6 text-${program.color}-600`} />
                            </div>
                            <span className={`text-xs bg-${program.color}-50 text-${program.color}-600 px-2 py-1 rounded-full font-medium`}>
                              {program.category}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-2">{program.title}</h3>
                          <p className="text-gray-600 mb-4">{program.description}</p>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">{program.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className={`bg-${program.color}-500 h-2 rounded-full transition-all duration-500`} style={{ width: `${program.progress}%` }}></div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-green-600 font-medium">{program.impact}</span>
                            <button className={`text-${program.color}-600 text-sm font-medium flex items-center hover:scale-105 transition-transform duration-200`}>
                              Learn More <ArrowRight className="w-4 h-4 ml-1" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Enhanced Success Stories Carousel with Updated SVG Avatars */}
                  <div className="mt-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Star className="w-4 h-4 mr-2" />
                        Success Stories
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Real People, Real Impact</h3>
                      <p className="text-gray-600">Discover how our programs have transformed lives across India</p>
                    </div>
                    
                    <div className="relative max-w-5xl mx-auto">
                      {/* Story Card with Updated SVG Avatars */}
                      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
                        <div className="flex flex-col lg:flex-row">
                          {/* Left Side - Profile & Business Images */}
                          <div className="lg:w-2/5 relative">
                            <div className="relative h-64 lg:h-full overflow-hidden flex items-end justify-center">
                              <img 
                                src={stories[currentStory].businessImage}
                                alt={`${stories[currentStory].name}'s business`}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                              {/* Profile Avatar Overlay */}
                              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                                <div className="relative">
                                  <div className="rounded-full border-4 border-white shadow-lg bg-white" style={{width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    {stories[currentStory].profileImage}
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Side - Story Content */}
                          <div className="lg:w-3/5 p-8 lg:p-10">
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex items-center space-x-4">
                                {/* Profile Image for Mobile */}
                                <div className="lg:hidden">
                                  <div className="w-16 h-16 rounded-full border-3 border-green-200 shadow-md bg-white flex items-center justify-center">
                                    {React.cloneElement(stories[currentStory].profileImage, { size: 64 })}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-2xl lg:text-3xl font-bold text-gray-900">{stories[currentStory].name}</h4>
                                  <p className="text-green-600 font-medium flex items-center text-lg">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    {stories[currentStory].location}
                                  </p>
                                </div>
                              </div>
                              <button className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-all duration-300 hover:scale-110 group">
                                <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                              </button>
                            </div>
                            
                            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                              <p className="text-gray-700 text-lg leading-relaxed italic">
                                "{stories[currentStory].story}"
                              </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-3 mb-6">
                              <div className="bg-green-100 px-4 py-2 rounded-full">
                                <span className="text-green-700 font-semibold text-sm">
                                  {stories[currentStory].achievement}
                                </span>
                              </div>
                              <div className="bg-blue-100 px-4 py-2 rounded-full">
                                <span className="text-blue-700 font-semibold text-sm flex items-center">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  {stories[currentStory].duration}
                                </span>
                              </div>
                            </div>

                            {/* Impact Metrics */}
                            <div className="border-t border-gray-200 pt-6">
                              <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                  <div className="text-2xl font-bold text-green-600">₹2.5L+</div>
                                  <div className="text-sm text-gray-600">Revenue Generated</div>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold text-blue-600">5+</div>
                                  <div className="text-sm text-gray-600">Jobs Created</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center justify-between mt-8">
                        <button
                          onClick={() => setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length)}
                          className="bg-white shadow-lg rounded-full p-4 hover:shadow-xl transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 group"
                        >
                          <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-green-600" />
                        </button>
                        
                        <div className="flex items-center space-x-6">
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105 flex items-center shadow-lg"
                          >
                            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                            {isPlaying ? 'Pause' : 'Play'}
                          </button>
                          
                          <button 
                            onClick={() => setShowShareModal(true)}
                            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all duration-300 hover:scale-105 flex items-center shadow-lg"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Share Your Story
                          </button>
                        </div>
                        
                        <button
                          onClick={() => setCurrentStory((prev) => (prev + 1) % stories.length)}
                          className="bg-white shadow-lg rounded-full p-4 hover:shadow-xl transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 group"
                        >
                          <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-green-600" />
                        </button>
                      </div>

                      {/* Story Indicators with Thumbnails */}
                      <div className="flex justify-center space-x-4 mt-8">
                        {stories.map((story, index) => (
                          <button
                            key={story.id}
                            onClick={() => setCurrentStory(index)}
                            className={`relative transition-all duration-300 ${
                              index === currentStory ? 'scale-110' : 'hover:scale-105'
                            }`}
                            style={{ background: 'none', border: 'none', padding: 0 }}
                          >
                            <div className={`rounded-full border-3 object-cover transition-all duration-300 ${
                              index === currentStory 
                                ? 'border-green-500 shadow-lg' 
                                : 'border-gray-300 hover:border-green-400 opacity-70 hover:opacity-100'
                            }`}>
                              {story.thumb}
                            </div>
                            {index === currentStory && (
                              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white">
                                <div className="w-full h-full rounded-full bg-green-500 animate-ping"></div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Partners Section with Interactive Map */}
              {activeSection === 'partners' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <Building className="text-purple-600" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Partner Network Discovery</h2>
                  </div>

                  <div className="mb-6">
                    <div className="relative max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search partners by name or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Interactive Map Section */}
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-4 min-h-[500px] relative overflow-hidden">
                      <div className="bg-white rounded-xl h-full relative">
                        <div className="p-4 border-b border-gray-200">
                          <h3 className="text-lg font-bold text-gray-800 flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                            Partner Locations Map
                          </h3>
                          {selectedPartner && (
                            <p className="text-sm text-gray-600 mt-1">
                              Showing: {selectedPartner.name}
                            </p>
                          )}
                        </div>
                        
                        {/* Map Container */}
                        <div className="p-4 h-full">
                          {/* Simulated Interactive Map */}
                          <div className="w-full h-full bg-gray-50 rounded-lg border-2 border-gray-200 relative overflow-hidden">
                            {/* Map Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
                            
                            {/* Map Grid Lines */}
                            <div className="absolute inset-0 opacity-20">
                              {[...Array(10)].map((_, i) => (
                                <div key={`h-${i}`} className="absolute w-full border-t border-gray-300" style={{top: `${i * 10}%`}}></div>
                              ))}
                              {[...Array(10)].map((_, i) => (
                                <div key={`v-${i}`} className="absolute h-full border-l border-gray-300" style={{left: `${i * 10}%`}}></div>
                              ))}
                            </div>
                            
                            {/* Partner Location Markers */}
                            {filteredPartners.map((partner, index) => {
                              const isSelected = selectedPartner?.id === partner.id;
                              const positions = [
                                { top: '25%', left: '30%' }, // Mumbai
                                { top: '15%', left: '60%' }, // Delhi
                                { top: '65%', left: '45%' }, // Bangalore
                              ];
                              const position = positions[index % positions.length];
                              
                              return (
                                <div
                                  key={partner.id}
                                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                                    isSelected ? 'scale-150 z-20' : 'scale-100 z-10 hover:scale-125'
                                  }`}
                                  style={{ top: position.top, left: position.left }}
                                >
                                  {/* Marker Pin */}
                                  <div className={`relative cursor-pointer ${isSelected ? 'animate-bounce' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full border-4 border-white shadow-lg transition-all duration-300 ${
                                      isSelected 
                                        ? 'bg-purple-600 ring-4 ring-purple-200' 
                                        : 'bg-blue-500 hover:bg-purple-500'
                                    }`}>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <Building className="w-4 h-4 text-white" />
                                      </div>
                                    </div>
                                    
                                    {/* Marker Tail */}
                                    <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                                      isSelected ? 'border-t-purple-600' : 'border-t-blue-500'
                                    }`}></div>
                                    
                                    {/* Info Popup for Selected Partner */}
                                    {isSelected && (
                                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-48 z-30">
                                        <div className="text-center">
                                          <h4 className="font-bold text-sm text-gray-900">{partner.name}</h4>
                                          <p className="text-xs text-purple-600 font-medium">{partner.type}</p>
                                          <p className="text-xs text-gray-600 mt-1">{partner.location}</p>
                                        </div>
                                        {/* Popup Arrow */}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Ripple Effect for Selected Partner */}
                                  {isSelected && (
                                    <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping"></div>
                                  )}
                                </div>
                              );
                            })}
                            
                            {/* Map Legend */}
                            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                              <h4 className="text-sm font-bold text-gray-800 mb-2">Legend</h4>
                              <div className="space-y-1 text-xs">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                  <span className="text-gray-600">Available Partners</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                                  <span className="text-gray-600">Selected Partner</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Zoom Controls */}
                            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200">
                              <button className="block p-2 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200">
                                <span className="text-lg font-bold text-gray-600">+</span>
                              </button>
                              <button className="block p-2 hover:bg-gray-50 transition-colors duration-200">
                                <span className="text-lg font-bold text-gray-600">−</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Partner Cards Section */}
                    <div className="space-y-4">
                      {filteredPartners.map((partner) => (
                        <div
                          key={partner.id}
                          className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-102 ${
                            selectedPartner?.id === partner.id 
                              ? 'border-purple-500 shadow-xl bg-purple-50' 
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-bold text-lg">{partner.name}</h3>
                              <p className="text-purple-600 font-medium">{partner.type}</p>
                            </div>
                            <div className="bg-purple-100 rounded-full p-2">
                              <Building className="w-5 h-5 text-purple-600" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {partner.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              Est. {partner.established}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2" />
                              {partner.beneficiaries}
                            </div>
                            <div className="flex items-center">
                              <Target className="w-4 h-4 mr-2" />
                              {partner.focus}
                            </div>
                          </div>

                          <button 
                            onClick={() => setSelectedPartner(partner)}
                            className={`w-full py-3 rounded-xl transition-all duration-300 hover:scale-105 font-medium ${
                              selectedPartner?.id === partner.id
                                ? 'bg-purple-700 text-white'
                                : 'bg-purple-600 text-white hover:bg-purple-700'
                            }`}
                          >
                            {selectedPartner?.id === partner.id ? 'Connected - View on Map' : 'Connect with Partner'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tracker Section */}
              {activeSection === 'tracker' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <BarChart3 className="text-green-600" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Application Progress Tracker</h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: "Total Applications", value: "2,847", color: "blue" },
                      { label: "Success Rate", value: "67.6%", color: "green" },
                      { label: "Approved", value: "1,924", color: "purple" },
                      { label: "Avg. Time", value: "14 days", color: "orange" }
                    ].map((metric, index) => (
                      <div key={index} className="bg-gray-50 rounded-2xl p-4 text-center hover:bg-gray-100 transition-colors duration-300">
                        <div className={`text-xl font-bold text-${metric.color}-600 mb-1`}>{metric.value}</div>
                        <div className="text-gray-600 text-sm">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {applications.map((app, index) => (
                      <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-300 hover:scale-102">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{app.program}</h3>
                            <p className="text-gray-600">Applicant: {app.applicant}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            app.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {app.status}
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-700">Progress: {app.stage}</span>
                            <span className="font-medium">{app.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: `${app.progress}%` }}></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Next Step: <span className="font-medium">{app.nextStep}</span>
                          </span>
                          <button className="text-blue-600 text-sm font-medium flex items-center hover:scale-105 transition-transform duration-200">
                            View Details <ArrowRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources Section with Separated Learning Hub */}
              {activeSection === 'resources' && (
                <div className="space-y-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <BookOpen className="text-orange-600" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Learning Hub</h2>
                  </div>

                  {/* Financial Literacy Resources Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <FileText className="text-orange-600" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Financial Literacy Resources</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {resources.map((resource, index) => {
                        const IconComponent = resource.icon;
                        return (
                          <div key={index} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-orange-400 transition-all duration-300 hover:shadow-lg hover:scale-105">
                            <div className="flex justify-between items-start mb-4">
                              <div className="bg-orange-100 rounded-xl p-3">
                                <IconComponent className="w-6 h-6 text-orange-600" />
                              </div>
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">{resource.type}</span>
                            </div>

                            <h4 className="font-semibold mb-2">{resource.title}</h4>
                            <p className="text-gray-600 text-sm mb-4">{resource.category}</p>

                            <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{resource.rating}</span>
                              </div>
                              <span className="text-sm text-gray-500">{resource.downloads} downloads</span>
                            </div>

                            <button className="w-full bg-orange-600 text-white py-2 rounded-xl hover:bg-orange-700 transition-colors duration-300 text-sm font-medium">
                              Access Resource
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add More Resources Button */}
                    <div className="text-center mt-6">
                      <button className="bg-orange-100 text-orange-600 px-6 py-3 rounded-xl hover:bg-orange-200 transition-colors duration-300 font-medium">
                        View All Resources
                      </button>
                    </div>
                  </div>

                  {/* Community Feedback Section - Separate Section */}
                  <div className="space-y-6 border-t border-gray-200 pt-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <MessageCircle className="text-blue-600" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Community Feedback & Discussion</h3>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold text-lg flex items-center">
                          <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                          Recent Community Reviews
                        </h4>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300 font-medium">
                          Add Your Feedback
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="bg-blue-100 rounded-full p-2 mr-3">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">Priya S.</p>
                                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}</div>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">2 days ago</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">The credit guide helped improve my score by 150 points! Highly recommend the step-by-step approach.</p>
                          <div className="flex justify-between items-center">
                            <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm transition-colors duration-300">
                              <ThumbsUp className="w-4 h-4 mr-1" />24
                            </button>
                            <span className="text-xs text-blue-600 font-medium">Credit Building Guide</span>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="bg-green-100 rounded-full p-2 mr-3">
                                <User className="w-4 h-4 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium">Ravi K.</p>
                                <div className="flex">{[...Array(4)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}</div>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">1 week ago</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">Very practical resources. Would love more video content for better understanding.</p>
                          <div className="flex justify-between items-center">
                            <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm transition-colors duration-300">
                              <ThumbsUp className="w-4 h-4 mr-1" />18
                            </button>
                            <span className="text-xs text-green-600 font-medium">Digital Banking Basics</span>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="bg-purple-100 rounded-full p-2 mr-3">
                                <User className="w-4 h-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium">Sunita M.</p>
                                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}</div>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">2 weeks ago</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">The budgeting worksheet is exactly what I needed. Thank you for making it so easy to use!</p>
                          <div className="flex justify-between items-center">
                            <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm transition-colors duration-300">
                              <ThumbsUp className="w-4 h-4 mr-1" />31
                            </button>
                            <span className="text-xs text-purple-600 font-medium">Budgeting Template</span>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="bg-orange-100 rounded-full p-2 mr-3">
                                <User className="w-4 h-4 text-orange-600" />
                              </div>
                              <div>
                                <p className="font-medium">Amit P.</p>
                                <div className="flex">{[...Array(4)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}</div>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">3 weeks ago</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">Great resource collection! The loan application guide saved me a lot of time and confusion.</p>
                          <div className="flex justify-between items-center">
                            <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm transition-colors duration-300">
                              <ThumbsUp className="w-4 h-4 mr-1" />15
                            </button>
                            <span className="text-xs text-orange-600 font-medium">Business Loan Guide</span>
                          </div>
                        </div>
                      </div>

                      {/* Community Stats */}
                      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">124</div>
                          <div className="text-sm text-gray-600">Total Reviews</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">4.7</div>
                          <div className="text-sm text-gray-600">Average Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">89%</div>
                          <div className="text-sm text-gray-600">Helpful Rate</div>
                        </div>
                      </div>

                      {/* View More Button */}
                      <div className="text-center mt-6">
                        <button className="bg-blue-100 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-200 transition-colors duration-300 font-medium">
                          View All Community Feedback
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

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
            
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg">
              Start Partnership Today
            </button>
          </div>

          {/* Share Story Modal */}
          {showShareModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
                <div className="text-center mb-6">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                    <Camera className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Share Your Success Story</h3>
                  <p className="text-gray-600">Help inspire others by sharing your journey with photos.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors duration-300">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload your profile photo</p>
                  </div>
                  
                  <button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors duration-300 font-medium">
                    Upload Story & Photos
                  </button>
                  <button 
                    onClick={() => setShowShareModal(false)}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
