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
        <stop offset="0%" style={{stopColor:"#2A2A2A", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#4A4A4A", stopOpacity:1}} />
      </linearGradient>
      <linearGradient id="hairGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#654321", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#36454F", stopOpacity:1}} />
      </linearGradient>
    </defs>
    
    {/* Face background */}
    <circle cx="50" cy="50" r="45" fill="#2A2A2A" stroke="#4A4A4A" strokeWidth="2"/>
    
    {/* Face shape */}
    <ellipse cx="50" cy="55" rx="32" ry="38" fill="url(#skinGradient1)"/>
    
    {/* Hair */}
    <ellipse cx="50" cy="35" rx="35" ry="25" fill="url(#hairGradient1)"/>
    <ellipse cx="50" cy="28" rx="28" ry="18" fill="url(#hairGradient1)"/>
    
    {/* Hair strands */}
    <path d="M25 40 Q30 35 35 40" stroke="url(#hairGradient1)" strokeWidth="3" fill="none"/>
    <path d="M65 40 Q70 35 75 40" stroke="url(#hairGradient1)" strokeWidth="3" fill="none"/>
    
    {/* Eyes */}
    <ellipse cx="42" cy="48" rx="4" ry="3" fill="#36454F"/>
    <ellipse cx="58" cy="48" rx="4" ry="3" fill="#36454F"/>
    <circle cx="42" cy="48" r="2" fill="#4A4A4A"/>
    <circle cx="58" cy="48" r="2" fill="#4A4A4A"/>
    <circle cx="42.5" cy="47.5" r="0.8" fill="#B0C4DE"/>
    <circle cx="58.5" cy="47.5" r="0.8" fill="#B0C4DE"/>
    
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
    <circle cx="50" cy="50" r="45" fill="#2A2A2A" stroke="#4A4A4A" strokeWidth="2"/>
    
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
    <ellipse cx="42" cy="48" rx="4" ry="3" fill="#36454F"/>
    <ellipse cx="58" cy="48" rx="4" ry="3" fill="#36454F"/>
    <circle cx="42" cy="48" r="2" fill="#2D5AA0"/>
    <circle cx="58" cy="48" r="2" fill="#2D5AA0"/>
    <circle cx="42.5" cy="47.5" r="0.8" fill="#B0C4DE"/>
    <circle cx="58.5" cy="47.5" r="0.8" fill="#B0C4DE"/>
    
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
    <circle cx="50" cy="50" r="45" fill="#2A2A2A" stroke="#4A4A4A" strokeWidth="2"/>
    
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
    <ellipse cx="42" cy="48" rx="4" ry="3" fill="#36454F"/>
    <ellipse cx="58" cy="48" rx="4" ry="3" fill="#36454F"/>
    <circle cx="42" cy="48" r="2" fill="#654321"/>
    <circle cx="58" cy="48" r="2" fill="#654321"/>
    <circle cx="42.5" cy="47.5" r="0.8" fill="#B0C4DE"/>
    <circle cx="58.5" cy="47.5" r="0.8" fill="#B0C4DE"/>
    
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Handshake className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-200 mb-2">Financial Inclusion Network</h1>
            <p className="text-gray-300 text-lg">Empowering communities through innovative financial solutions</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { number: "25+", label: "NGO Partners", color: "blue" },
              { number: "50K+", label: "Lives Impacted", color: "green" },
              { number: "₹5Cr+", label: "Funding Provided", color: "purple" },
              { number: "12", label: "States Covered", color: "orange" }
            ].map((stat, index) => (
              <div key={index} className="bg-slate-800/50 rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className={`text-2xl font-bold text-${stat.color}-400 mb-1`}>{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center mb-8 bg-slate-800/50 rounded-2xl p-2 shadow-lg">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-300 hover:text-blue-600 hover:bg-slate-700/50'
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Card */}
          <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8">
              
              {/* Programs Section */}
              {activeSection === 'programs' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-blue-900/20 rounded-xl">
                      <Target className="text-blue-400" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-200">Our Impact Programs</h2>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {programs.map((program) => {
                      const IconComponent = program.icon;
                      return (
                        <div key={program.id} className={`border-2 border-slate-700 rounded-2xl p-6 hover:border-${program.color}-400 transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                          <div className="flex items-center mb-4">
                            <div className={`bg-${program.color}-900/20 rounded-xl p-3 mr-4`}>
                              <IconComponent className={`w-6 h-6 text-${program.color}-400`} />
                            </div>
                            <span className={`text-xs bg-${program.color}-900/20 text-${program.color}-400 px-2 py-1 rounded-full font-medium`}>
                              {program.category}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-200 mb-2">{program.title}</h3>
                          <p className="text-gray-300 mb-4">{program.description}</p>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-300">Progress</span>
                              <span className="font-medium text-gray-200">{program.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div className={`bg-${program.color}-500 h-2 rounded-full transition-all duration-500`} style={{ width: `${program.progress}%` }}></div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-green-400 font-medium">{program.impact}</span>
                            <button className={`text-${program.color}-400 text-sm font-medium flex items-center hover:scale-105 transition-transform duration-200`}>
                              Learn More <ArrowRight className="w-4 h-4 ml-1" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Enhanced Success Stories Carousel with Updated SVG Avatars */}
                  <div className="mt-12 bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-2xl p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center bg-green-900/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Star className="w-4 h-4 mr-2" />
                        Success Stories
                      </div>
                      <h3 className="text-2xl font-bold text-gray-200 mb-2">Real People, Real Impact</h3>
                      <p className="text-gray-300">Discover how our programs have transformed lives across India</p>
                    </div>
                    
                    <div className="relative max-w-5xl mx-auto">
                      {/* Story Card with Updated SVG Avatars */}
                      <div className="bg-slate-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
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
                                  <div className="rounded-full border-4 border-slate-700 shadow-lg bg-slate-900" style={{width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    {stories[currentStory].profileImage}
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-slate-700 flex items-center justify-center">
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
                                  <div className="w-16 h-16 rounded-full border-3 border-green-700 shadow-md bg-slate-900 flex items-center justify-center">
                                    {React.cloneElement(stories[currentStory].profileImage, { size: 64 })}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-2xl lg:text-3xl font-bold text-gray-200">{stories[currentStory].name}</h4>
                                  <p className="text-green-400 font-medium flex items-center text-lg">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    {stories[currentStory].location}
                                  </p>
                                </div>
                              </div>
                              <button className="bg-blue-900/20 text-blue-400 p-3 rounded-full hover:bg-blue-900/40 transition-all duration-300 hover:scale-110 group">
                                <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                              </button>
                            </div>
                            
                            <div className="bg-slate-900/50 rounded-2xl p-6 mb-6">
                              <p className="text-gray-300 text-lg leading-relaxed italic">
                                "{stories[currentStory].story}"
                              </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-3 mb-6">
                              <div className="bg-green-900/20 px-4 py-2 rounded-full">
                                <span className="text-green-400 font-semibold text-sm">
                                  {stories[currentStory].achievement}
                                </span>
                              </div>
                              <div className="bg-blue-900/20 px-4 py-2 rounded-full">
                                <span className="text-blue-400 font-semibold text-sm flex items-center">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  {stories[currentStory].duration}
                                </span>
                              </div>
                            </div>
                            
                            {/* Impact Metrics */}
                            <div className="border-t border-slate-700 pt-6">
                              <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                  <div className="text-2xl font-bold text-green-400">₹2.5L+</div>
                                  <div className="text-sm text-gray-300">Revenue Generated</div>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold text-blue-400">5+</div>
                                  <div className="text-sm text-gray-300">Jobs Created</div>
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
                          className="bg-slate-800 shadow-lg rounded-full p-4 hover:shadow-xl transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 group"
                        >
                          <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-green-400" />
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
                          className="bg-slate-800 shadow-lg rounded-full p-4 hover:shadow-xl transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 group"
                        >
                          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-green-400" />
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
                                : 'border-slate-700 hover:border-green-400 opacity-70 hover:opacity-100'
                            }`}>
                              {story.thumb}
                            </div>
                            {index === currentStory && (
                              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-slate-700">
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
                    <div className="p-3 bg-purple-900/20 rounded-xl">
                      <Building className="text-purple-400" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-200">Partner Network Discovery</h2>
                  </div>

                  <div className="mb-6">
                    <div className="relative max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search partners by name or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-slate-800 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Interactive Map Section */}
                    <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl p-4 min-h-[500px] relative overflow-hidden">
                      <div className="bg-slate-800 rounded-xl h-full relative">
                        <div className="p-4 border-b border-slate-700">
                          <h3 className="text-lg font-bold text-gray-200 flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                            Partner Locations Map
                          </h3>
                          {selectedPartner && (
                            <p className="text-sm text-gray-300 mt-1">
                              Showing: {selectedPartner.name}
                            </p>
                          )}
                        </div>
                        
                        {/* Map Container */}
                        <div className="p-4 h-full">
                          {/* Simulated Interactive Map */}
                          <div className="w-full h-full bg-slate-900 rounded-lg border-2 border-slate-700 relative overflow-hidden">
                            {/* Map Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20"></div>
                            
                            {/* Map Grid Lines */}
                            <div className="absolute inset-0 opacity-20">
                              {[...Array(10)].map((_, i) => (
                                <div key={`h-${i}`} className="absolute w-full border-t border-slate-700" style={{top: `${i * 10}%`}}></div>
                              ))}
                              {[...Array(10)].map((_, i) => (
                                <div key={`v-${i}`} className="absolute h-full border-l border-slate-700" style={{left: `${i * 10}%`}}></div>
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
                                    <div className={`w-8 h-8 rounded-full border-4 border-slate-700 shadow-lg transition-all duration-300 ${
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
                                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-3 min-w-48 z-30">
                                        <div className="text-center">
                                          <h4 className="font-bold text-sm text-gray-200">{partner.name}</h4>
                                          <p className="text-xs text-purple-400 font-medium">{partner.type}</p>
                                          <p className="text-xs text-gray-300 mt-1">{partner.location}</p>
                                        </div>
                                        {/* Popup Arrow */}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
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
                            <div className="absolute bottom-4 left-4 bg-slate-800 rounded-lg shadow-lg p-3 border border-slate-700">
                              <h4 className="text-sm font-bold text-gray-200 mb-2">Legend</h4>
                              <div className="space-y-1 text-xs">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                  <span className="text-gray-300">Available Partners</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                                  <span className="text-gray-300">Selected Partner</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Partner List Section */}
                    <div className="space-y-4">
                      {filteredPartners.map((partner) => (
                        <div key={partner.id} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102">
                          <h3 className="text-xl font-bold text-gray-200 mb-2">{partner.name}</h3>
                          <p className="text-purple-400 text-sm font-medium mb-3">{partner.type}</p>
                          <p className="text-gray-300 text-sm mb-4">{partner.focus}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-300 text-sm mb-6">
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
                    <div className="p-3 bg-green-900/20 rounded-xl">
                      <BarChart3 className="text-green-400" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-200">Application Progress Tracker</h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: "Total Applications", value: "2,847", color: "blue" },
                      { label: "Success Rate", value: "67.6%", color: "green" },
                      { label: "Approved", value: "1,924", color: "purple" },
                      { label: "Avg. Time", value: "14 days", color: "orange" }
                    ].map((metric, index) => (
                      <div key={index} className="bg-slate-800/50 rounded-2xl p-4 text-center hover:bg-slate-700 transition-colors duration-300">
                        <div className={`text-xl font-bold text-${metric.color}-400 mb-1`}>{metric.value}</div>
                        <div className="text-gray-300 text-sm">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {applications.map((app, index) => (
                      <div key={index} className="bg-slate-800/50 rounded-2xl p-6 hover:bg-slate-700 transition-all duration-300 hover:scale-102">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-200">{app.program}</h3>
                            <p className="text-gray-300">Applicant: {app.applicant}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            app.status === 'Completed' ? 'bg-green-900/20 text-green-400' : 'bg-blue-900/20 text-blue-400'}`}>
                            {app.status}
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-300">Progress: {app.stage}</span>
                            <span className="font-medium text-gray-200">{app.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: `${app.progress}%` }}></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">
                            Next Step: <span className="font-medium">{app.nextStep}</span>
                          </span>
                          <button className="text-blue-400 text-sm font-medium flex items-center hover:scale-105 transition-transform duration-200">
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
                    <div className="p-3 bg-orange-900/20 rounded-xl">
                      <BookOpen className="text-orange-400" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-200">Learning Hub</h2>
                  </div>

                  {/* Financial Literacy Resources Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-orange-900/10 rounded-lg">
                        <FileText className="text-orange-400" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-200">Financial Literacy Resources</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {resources.map((resource, index) => {
                        const IconComponent = resource.icon;
                        return (
                          <div key={index} className="border-2 border-slate-700 rounded-2xl p-6 hover:border-orange-700 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-slate-800/50">
                            <div className="flex justify-between items-start mb-4">
                              <div className="bg-orange-900/20 rounded-xl p-3">
                                <IconComponent className="w-6 h-6 text-orange-400" />
                              </div>
                              <span className="bg-blue-900/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">{resource.type}</span>
                            </div>

                            <h4 className="font-semibold text-gray-200 mb-2">{resource.title}</h4>
                            <p className="text-gray-300 text-sm mb-4">{resource.category}</p>

                            <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium text-gray-300">{resource.rating}</span>
                              </div>
                              <span className="text-sm text-gray-400">{resource.downloads} downloads</span>
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
                      <button className="bg-orange-900/20 text-orange-400 px-6 py-3 rounded-xl hover:bg-orange-900/40 transition-colors duration-300 font-medium">
                        View All Resources
                      </button>
                    </div>
                  </div>

                  {/* Community Feedback Section - Separate Section */}
                  <div className="space-y-6 border-t border-slate-700 pt-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-900/10 rounded-lg">
                        <MessageCircle className="text-blue-400" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-200">Community Feedback & Discussion</h3>
                    </div>

                    <div className="bg-slate-800/50 rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold text-lg text-gray-200 flex items-center">
                          <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
                          Recent Community Reviews
                        </h4>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300 font-medium">
                          Add Your Feedback
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-900/50 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="bg-blue-900/20 rounded-full p-2 mr-3">
                                <User className="w-4 h-4 text-blue-400" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-200">Priya S.</p>
                                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}</div>
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">2 days ago</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">The credit guide helped improve my score by 150 points! Highly recommend the step-by-step approach.</p>
                          <div className="flex justify-between items-center">
                            <button className="flex items-center text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                              <ThumbsUp className="w-4 h-4 mr-1" />24
                            </button>
                            <span className="text-xs text-blue-400 font-medium">Credit Building Guide</span>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="bg-green-900/20 rounded-full p-2 mr-3">
                                <User className="w-4 h-4 text-green-400" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-200">Ravi K.</p>
                                <div className="flex">{[...Array(4)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}</div>
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">5 days ago</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">The financial literacy workshop was incredibly insightful. Gained practical tips!</p>
                          <div className="flex justify-between items-center">
                            <button className="flex items-center text-gray-400 hover:text-green-400 text-sm transition-colors duration-300">
                              <ThumbsUp className="w-4 h-4 mr-1" />18
                            </button>
                            <span className="text-xs text-green-400 font-medium">Financial Literacy Workshop</span>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="bg-purple-900/20 rounded-full p-2 mr-3">
                                <User className="w-4 h-4 text-purple-400" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-200">Sunita M.</p>
                                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}</div>
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">2 weeks ago</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">The budgeting worksheet is exactly what I needed. Thank you for making it so easy to use!</p>
                          <div className="flex justify-between items-center">
                            <button className="flex items-center text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                              <ThumbsUp className="w-4 h-4 mr-1" />31
                            </button>
                            <span className="text-xs text-purple-400 font-medium">Budgeting Template</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Share Story Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-lg shadow-xl p-8 w-full max-w-lg border border-blue-700 relative">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-3xl font-bold text-blue-300 mb-6 text-center">Share Your Story</h2>
            <p className="text-gray-300 mb-6 text-center">
              We'd love to hear how EduNurture has made a difference in your life.
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-200 text-sm font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-200 text-sm font-semibold mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="story" className="block text-gray-200 text-sm font-semibold mb-2">Your Story</label>
                <textarea
                  id="story"
                  rows="6"
                  className="w-full p-3 rounded-md bg-slate-800 text-white border border-slate-700 focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Share your inspiring journey..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-800 transition duration-300 shadow-lg"
              >
                Submit Story
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Partner Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-lg shadow-xl p-8 w-full max-w-2xl border border-purple-700 relative">
            <button
              onClick={() => setSelectedPartner(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-3xl font-bold text-purple-300 mb-6 text-center">Partner Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-200">{selectedPartner.name}</h3>
                <p className="text-purple-400 font-medium">{selectedPartner.type}</p>
                <p className="text-gray-300">{selectedPartner.focus}</p>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-2" />
                  {selectedPartner.location}
                </div>
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-2" />
                  Established: {selectedPartner.established}
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-5 h-5 mr-2" />
                  Beneficiaries: {selectedPartner.beneficiaries}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Contact & Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-300">
                      <Globe className="w-5 h-5 mr-2" />
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-300">
                      <Mail className="w-5 h-5 mr-2" />
                      Email Partner
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-blue-400 hover:text-blue-300 transition duration-300">
                      <Phone className="w-5 h-5 mr-2" />
                      Call Partner
                    </a>
                  </li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-4">Impact Highlights</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Launched 5 new programs</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Reached 10,000+ individuals</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Secured $1M in funding</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => setSelectedPartner(null)}
                className="bg-gradient-to-r from-purple-600 to-blue-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-blue-800 transition duration-300 shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
