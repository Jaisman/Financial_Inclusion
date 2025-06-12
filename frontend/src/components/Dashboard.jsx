import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  User, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Plus, 
  Settings, 
  Link,
  Target,
  Shield,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown,
  X,
  Lightbulb,
  Activity,
  FileText,
  Menu,
  LogOut,
  TrendingDown,
  Clock,
  Percent
} from 'lucide-react';

export default function Dashboard() {
  const [profileCompletion, setProfileCompletion] = useState(75);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock user data
  const userData = {
    name: "John Doe",
    creditScore: 742,
    aiCreditScore: 758,
    lastUpdated: "2 days ago",
    alerts: [
      {
        id: 1,
        type: 'warning',
        title: 'Payment Due Soon',
        message: 'Credit card payment of $2,450 due in 3 days',
        time: '2 hours ago'
      },
      {
        id: 2,
        type: 'info',
        title: 'Credit Score Update',
        message: 'Your credit score increased by 12 points',
        time: '1 day ago'
      },
      {
        id: 3,
        type: 'alert',
        title: 'Suspicious Activity',
        message: 'Unusual transaction detected on your account',
        time: '3 days ago'
      }
    ],
    tips: [
      {
        id: 1,
        category: 'Payment History',
        tip: 'Set up automatic payments to avoid late fees and improve your credit score',
        impact: '+15 points potential',
        difficulty: 'Easy'
      },
      {
        id: 2,
        category: 'Credit Utilization',
        tip: 'Keep your credit utilization below 30% for optimal credit health',
        impact: '+20 points potential',
        difficulty: 'Medium'
      },
      {
        id: 3,
        category: 'Credit Mix',
        tip: 'Consider diversifying your credit types with a personal loan',
        impact: '+10 points potential',
        difficulty: 'Medium'
      }
    ],
    scoreFactors: [
      {
        id: 1,
        factor: 'High Credit Utilization',
        impact: 'Negative',
        description: 'Your credit utilization is at 67% across all cards',
        severity: 'high',
        icon: Percent,
        recommendation: 'Pay down balances to below 30% utilization'
      },
      {
        id: 2,
        factor: 'Recent Credit Inquiries',
        impact: 'Negative',
        description: '3 hard inquiries in the last 6 months',
        severity: 'medium',
        icon: FileText,
        recommendation: 'Avoid applying for new credit for 6-12 months'
      },
      {
        id: 3,
        factor: 'Short Credit History',
        impact: 'Negative',
        description: 'Average account age is only 2.1 years',
        severity: 'medium',
        icon: Clock,
        recommendation: 'Keep older accounts open to improve average age'
      },
      {
        id: 4,
        factor: 'Limited Credit Mix',
        impact: 'Negative',
        description: 'Only credit cards, no installment loans',
        severity: 'low',
        icon: CreditCard,
        recommendation: 'Consider adding a personal loan or auto loan'
      }
    ]
  };

  const getCreditScoreColor = (score) => {
    if (score >= 800) return 'text-green-600';
    if (score >= 740) return 'text-blue-600';
    if (score >= 670) return 'text-yellow-600';
    if (score >= 580) return 'text-orange-600';
    return 'text-red-600';
  };

  const getCreditScoreLabel = (score) => {
    if (score >= 800) return 'Excellent';
    if (score >= 740) return 'Very Good';
    if (score >= 670) return 'Good';
    if (score >= 580) return 'Fair';
    return 'Poor';
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16"> */}
            {/* Logo */}
            {/* <div className="flex items-center">
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-blue-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">SecureBank</span>
              </div>
            </div> */}

            {/* User Menu */}
            {/* <div className="flex items-center space-x-4"> */}
              {/* Notifications */}
              {/* <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                >
                  <Bell className="w-6 h-6" />
                  {userData.alerts.length > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                  )}
                </button> */}

                {/* Notifications Dropdown */}
                {/* {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {userData.alerts.map((alert) => (
                          <div key={alert.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                            {getAlertIcon(alert.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                              <p className="text-sm text-gray-500">{alert.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div> */}

              {/* User Profile */}
              {/* <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">JD</span>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userData.name.split(' ')[0]}!</h1>
          <p className="text-gray-600">Here's your financial overview for today</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Credit Score Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Credit Score</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className={`text-3xl font-bold ${getCreditScoreColor(userData.creditScore)}`}>
                    {userData.creditScore}
                  </span>
                  <span className="text-sm text-gray-500">
                    {getCreditScoreLabel(userData.creditScore)}
                  </span>
                </div>
                <p className="text-xs text-gray-400">Traditional Score</p>
              </div>
              
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold text-blue-600">{userData.aiCreditScore}</span>
                    <p className="text-xs text-gray-400">AI-Enhanced Score</p>
                  </div>
                  <div className="flex items-center text-green-600 text-sm">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    +{userData.aiCreditScore - userData.creditScore}
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500">Last updated {userData.lastUpdated}</p>
            </div>
          </div>

          {/* Score Factors Card - Spans 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900">Factors Affecting Your Score</h3>
              </div>
              <span className="text-sm text-gray-500">What's holding you back</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.scoreFactors.map((factor) => {
                const IconComponent = factor.icon;
                return (
                  <div key={factor.id} className={`rounded-lg p-4 border ${getSeverityColor(factor.severity)}`}>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">{factor.factor}</h4>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-current bg-opacity-10">
                            {factor.severity.charAt(0).toUpperCase() + factor.severity.slice(1)}
                          </span>
                        </div>
                        <p className="text-xs mb-2 opacity-80">{factor.description}</p>
                        <p className="text-xs font-medium">💡 {factor.recommendation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Personalized Tips Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Personalized Credit Tips</h3>
            </div>
            <span className="text-sm text-gray-500">AI-Powered Recommendations</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userData.tips.map((tip) => (
              <div key={tip.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {tip.category}
                  </span>
                  <span className="text-xs text-gray-500">{tip.difficulty}</span>
                </div>
                <p className="text-sm text-gray-800 mb-3">{tip.tip}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-green-600">{tip.impact}</span>
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Payment processed successfully</p>
                <p className="text-xs text-gray-500">Credit Card • $2,450 • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Credit score updated</p>
                <p className="text-xs text-gray-500">Increased by 12 points • 1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Link className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New account connected</p>
                <p className="text-xs text-gray-500">Chase Savings Account • 3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}