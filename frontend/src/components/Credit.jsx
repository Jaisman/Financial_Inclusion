import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Brain, 
  Lightbulb, 
  Target, 
  BarChart3, 
  Zap,
  Eye,
  Calculator,
  Smartphone,
  Home,
  CreditCard,
  Briefcase,
  Shield,
  ArrowUp,
  ArrowDown,
  Info,
  Sparkles
} from 'lucide-react';

const AICreditScoreInsights = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [simulatorData, setSimulatorData] = useState({
    utilityPayments: 85,
    rentPayments: 90,
    mobileRecharges: 75,
    employmentStability: 80
  });
  const [animatedScore, setAnimatedScore] = useState(0);
  const targetScore = 742;

  // Animate score on load
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedScore(prev => {
        if (prev < targetScore) {
          return Math.min(prev + 15, targetScore);
        }
        clearInterval(interval);
        return prev;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleSimulatorChange = (factor, value) => {
    setSimulatorData(prev => ({ ...prev, [factor]: value }));
  };

  const calculateSimulatedScore = () => {
    const { utilityPayments, rentPayments, mobileRecharges, employmentStability } = simulatorData;
    const baseScore = 650;
    const impact = (utilityPayments + rentPayments + mobileRecharges + employmentStability) / 4;
    return Math.round(baseScore + (impact - 50) * 2);
  };

  const factors = [
    { name: 'Utility Payment History', weight: 25, score: 85, icon: Home, color: 'bg-blue-500' },
    { name: 'Rent Payment Consistency', weight: 20, score: 90, icon: CreditCard, color: 'bg-green-500' },
    { name: 'Mobile Recharge Patterns', weight: 15, score: 75, icon: Smartphone, color: 'bg-purple-500' },
    { name: 'Employment Stability', weight: 20, score: 80, icon: Briefcase, color: 'bg-orange-500' },
    { name: 'Digital Footprint', weight: 10, score: 70, icon: Shield, color: 'bg-teal-500' },
    { name: 'Banking Behavior', weight: 10, score: 88, icon: BarChart3, color: 'bg-pink-500' }
  ];

  const aiInsights = [
    {
      type: 'improvement',
      title: 'Improve Mobile Payment Consistency',
      description: 'Your mobile recharge pattern shows 3 missed payments. Setting up auto-recharge could boost your score by 15-20 points.',
      impact: '+18 points',
      urgency: 'high',
      icon: Smartphone
    },
    {
      type: 'opportunity',
      title: 'Optimize Utility Payment Timing',
      description: 'Paying utilities 2-3 days before due date instead of on due date could improve your payment behavior score.',
      impact: '+8 points',
      urgency: 'medium',
      icon: Home
    },
    {
      type: 'strength',
      title: 'Excellent Rent Payment History',
      description: 'Your consistent rent payments are your strongest factor. This reliability pattern positively impacts all other scores.',
      impact: 'Stable',
      urgency: 'low',
      icon: CreditCard
    },
    {
      type: 'alert',
      title: 'Digital Engagement Opportunity',
      description: 'Increasing your digital transaction frequency could enhance your digital footprint score significantly.',
      impact: '+12 points',
      urgency: 'medium',
      icon: Zap
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Score Overview', icon: BarChart3 },
    { id: 'factors', label: 'Score Factors', icon: Target },
    { id: 'simulator', label: 'What-If Simulator', icon: Calculator },
    { id: 'insights', label: 'Einstein AI Insights', icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Brain className="text-white" size={32} />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Credit Score Insights
              </h1>
            </div>
            <p className="text-gray-300 text-lg">Advanced alternative credit scoring powered by AI</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center mb-8 bg-slate-800/50 rounded-2xl p-2 backdrop-blur-sm">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Score Card */}
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-200">Your AI Credit Score</h2>
                  <div className="relative">
                    <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text mb-2">
                      {animatedScore}
                    </div>
                    <div className="text-lg text-gray-400">out of 850</div>
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <div className="px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                        <span className="text-green-400 font-semibold">Good Score</span>
                      </div>
                      <div className="px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">
                        <span className="text-blue-400 font-semibold">95% Confidence</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score Comparison */}
                <div className="bg-slate-700/30 rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-200">Score Comparison</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Traditional Credit Score</span>
                      <span className="text-orange-400 font-semibold">680</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">AI Alternative Score</span>
                      <span className="text-green-400 font-semibold">742</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-600">
                      <span className="text-gray-300 font-semibold">Improvement</span>
                      <span className="text-blue-400 font-semibold flex items-center">
                        <ArrowUp size={16} className="mr-1" />
                        +62 points
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">85%</div>
                    <div className="text-sm text-gray-400">Payment Reliability</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">90%</div>
                    <div className="text-sm text-gray-400">Financial Stability</div>
                  </div>
                </div>
              </div>

              {/* Quick Insights */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-800 to-emerald-900 rounded-2xl p-6 border border-green-700/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <TrendingUp className="text-green-400" size={24} />
                    <h3 className="text-lg font-bold text-green-200">Strong Upward Trend</h3>
                  </div>
                  <p className="text-green-100 text-sm">Your score has improved by 28 points in the last 3 months due to consistent payment behavior.</p>
                </div>

                <div className="bg-gradient-to-br from-blue-800 to-indigo-900 rounded-2xl p-6 border border-blue-700/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <Eye className="text-blue-400" size={24} />
                    <h3 className="text-lg font-bold text-blue-200">AI Advantage</h3>
                  </div>
                  <p className="text-blue-100 text-sm">Our AI model considers 40+ non-traditional factors that traditional scoring misses.</p>
                </div>

                <div className="bg-gradient-to-br from-purple-800 to-pink-900 rounded-2xl p-6 border border-purple-700/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <Sparkles className="text-purple-400" size={24} />
                    <h3 className="text-lg font-bold text-purple-200">Next Milestone</h3>
                  </div>
                  <p className="text-purple-100 text-sm">You're 18 points away from reaching "Excellent" credit tier (760+).</p>
                </div>
              </div>
            </div>
          )}

          {/* Factors Tab */}
          {activeTab === 'factors' && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-200">Credit Score Factors</h2>
              <div className="space-y-6">
                {factors.map((factor, index) => {
                  const IconComponent = factor.icon;
                  return (
                    <div key={index} className="bg-slate-700/30 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 ${factor.color} rounded-lg`}>
                            <IconComponent className="text-white" size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-200">{factor.name}</h3>
                            <p className="text-sm text-gray-400">Weight: {factor.weight}%</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-200">{factor.score}/100</div>
                          <div className={`text-sm ${factor.score >= 80 ? 'text-green-400' : factor.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {factor.score >= 80 ? 'Excellent' : factor.score >= 60 ? 'Good' : 'Needs Improvement'}
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${factor.color} transition-all duration-500`}
                          style={{ width: `${factor.score}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Simulator Tab */}
          {activeTab === 'simulator' && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-200">"What If" Score Simulator</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-300">Adjust Factors</h3>
                  {Object.entries(simulatorData).map(([key, value]) => {
                    const labels = {
                      utilityPayments: 'Utility Payment Score',
                      rentPayments: 'Rent Payment Score',
                      mobileRecharges: 'Mobile Recharge Consistency',
                      employmentStability: 'Employment Stability'
                    };
                    return (
                      <div key={key} className="bg-slate-700/30 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-300">{labels[key]}</label>
                          <span className="text-lg font-bold text-blue-400">{value}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={value}
                          onChange={(e) => handleSimulatorChange(key, parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="bg-slate-700/30 rounded-2xl p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">Simulated Score</h3>
                  <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text mb-4">
                    {calculateSimulatedScore()}
                  </div>
                  <div className="text-sm text-gray-400 mb-4">out of 850</div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                    calculateSimulatedScore() > targetScore ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 
                    calculateSimulatedScore() < targetScore ? 'bg-red-500/20 border border-red-500/30 text-red-400' : 
                    'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                  }`}>
                    {calculateSimulatedScore() > targetScore ? <ArrowUp size={16} className="mr-1" /> : 
                     calculateSimulatedScore() < targetScore ? <ArrowDown size={16} className="mr-1" /> : null}
                    {calculateSimulatedScore() - targetScore > 0 ? '+' : ''}{calculateSimulatedScore() - targetScore} points
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Einstein AI Insights Tab */}
          {activeTab === 'insights' && (
            <div className="space-y-6">
              {/* Einstein Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-center shadow-2xl">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <Brain className="text-white" size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Einstein AI Insights</h2>
                </div>
                <p className="text-blue-100">Personalized recommendations powered by advanced machine learning</p>
              </div>

              {/* Insights Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {aiInsights.map((insight, index) => {
                  const IconComponent = insight.icon;
                  const urgencyColors = {
                    high: 'from-red-800 to-pink-900 border-red-700/50',
                    medium: 'from-orange-800 to-yellow-900 border-orange-700/50',
                    low: 'from-green-800 to-emerald-900 border-green-700/50'
                  };
                  const urgencyBadges = {
                    high: 'bg-red-500/20 text-red-400 border-red-500/30',
                    medium: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
                    low: 'bg-green-500/20 text-green-400 border-green-500/30'
                  };
                  
                  return (
                    <div key={index} className={`bg-gradient-to-br ${urgencyColors[insight.urgency]} rounded-2xl p-6 border hover:scale-105 transition-transform duration-200 shadow-xl`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            <IconComponent className="text-white" size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{insight.title}</h3>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${urgencyBadges[insight.urgency]} mt-1`}>
                              {insight.urgency.charAt(0).toUpperCase() + insight.urgency.slice(1)} Priority
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">{insight.impact}</div>
                        </div>
                      </div>
                      <p className="text-gray-200 text-sm">{insight.description}</p>
                      <button className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 backdrop-blur-sm">
                        Learn More
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* AI Summary */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700">
                <div className="flex items-center space-x-3 mb-6">
                  <Lightbulb className="text-yellow-400" size={24} />
                  <h3 className="text-xl font-bold text-gray-200">AI Summary & Next Steps</h3>
                </div>
                <div className="bg-slate-700/30 rounded-xl p-6">
                  <p className="text-gray-300 mb-4">
                    Based on our analysis of your financial behavior, you have excellent potential for score improvement. 
                    Your strongest asset is consistent rent payments, which demonstrates reliability. Focus on mobile payment 
                    consistency for the biggest immediate impact.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-500/20 rounded-lg p-4 text-center border border-blue-500/30">
                      <div className="text-2xl font-bold text-blue-400">30 days</div>
                      <div className="text-sm text-blue-300">Quick wins timeline</div>
                    </div>
                    <div className="bg-green-500/20 rounded-lg p-4 text-center border border-green-500/30">
                      <div className="text-2xl font-bold text-green-400">+25</div>
                      <div className="text-sm text-green-300">Potential score increase</div>
                    </div>
                    <div className="bg-purple-500/20 rounded-lg p-4 text-center border border-purple-500/30">
                      <div className="text-2xl font-bold text-purple-400">92%</div>
                      <div className="text-sm text-purple-300">Success probability</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default AICreditScoreInsights;