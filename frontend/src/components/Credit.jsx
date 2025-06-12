import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
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
  Sparkles,
  Volume2,
  VolumeX,
  BarChart2
} from 'lucide-react';

const AICreditScoreInsights = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedScore, setAnimatedScore] = useState(0);
  const [targetScore, setTargetScore] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [shapValues, setShapValues] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  // Sample user data for testing
  const SAMPLE_USER = {
    age: 32,
    employment_status: "self-employed",
    monthly_income: 25000,
    utility_bill_payment_history: 78.5,
    rental_payment_history: 82.0,
    mobile_recharge_frequency: 3,
    mobile_data_usage: 5.5,
    education_level: "Graduate",
    financial_literacy_score: 6,
    loan_repayment_history: 65.0,
    region: "semi-urban"
  };

  // Fetch credit score on component mount
  useEffect(() => {
    const fetchCreditScore = async () => {
      try {
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(SAMPLE_USER)
        });
        
        const data = await response.json();
        if (data.status === 'success') {
          setTargetScore(data.credit_score);
        } else {
          console.error('Error fetching credit score:', data);
        }
      } catch (error) {
        console.error('Error fetching credit score:', error);
      }
    };
    fetchCreditScore();
  }, []);

  // Animate score on load
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedScore(prev => {
        if (prev < targetScore) {
          return Math.min(prev + 0.15, targetScore);
        }
        clearInterval(interval);
        return prev;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [targetScore]);

  // Fetch explanation on component mount
  useEffect(() => {
    const fetchExplanation = async () => {
      try {
        console.log('Fetching explanation...');
        const response = await fetch('http://localhost:5000/interpret', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(SAMPLE_USER)
        });
        
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);
        
        if (data.status === 'success') {
          setExplanation(data.explanation);
          // Update audio source
          audio.src = `http://localhost:5000/audio?t=${new Date().getTime()}`;
        } else {
          console.error('Error in response:', data);
          setExplanation('Unable to load explanation. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching explanation:', error);
        setExplanation('Unable to load explanation. Please try again later.');
      }
    };
    fetchExplanation();
  }, []);

  // Fetch SHAP values on component mount
  useEffect(() => {
    const fetchShapValues = async () => {
      try {
        console.log('Fetching SHAP values...');
        const response = await fetch('http://localhost:5000/explain', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(SAMPLE_USER)
        });
        
        const data = await response.json();
        console.log('SHAP values response:', data);
        
        if (data.status === 'success') {
          // Transform the data to match our expected format
          const transformedData = Object.entries(data.shap_values).map(([feature, data]) => ({
            feature: feature.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            value: data.shap
          }));
          setShapValues(transformedData);
        } else {
          console.error('Error fetching SHAP values:', data);
        }
      } catch (error) {
        console.error('Error fetching SHAP values:', error);
      }
    };
    fetchShapValues();
  }, []);

  const toggleAudio = async () => {
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    } else {
      try {
        setIsLoadingAudio(true);
        const response = await fetch('http://localhost:5000/text-to-speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: explanation })
        });

        if (!response.ok) {
          throw new Error('Failed to generate audio');
        }

        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        audio.src = audioUrl;
        
        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };

        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
      } finally {
        setIsLoadingAudio(false);
      }
    }
  };

  const factors = [
    { name: 'Utility Payment History', weight: 25, score: 85, icon: Home, color: 'bg-blue-500' },
    { name: 'Rent Payment Consistency', weight: 20, score: 90, icon: CreditCard, color: 'bg-green-500' },
    { name: 'Mobile Recharge Patterns', weight: 15, score: 75, icon: Smartphone, color: 'bg-purple-500' },
    { name: 'Employment Stability', weight: 20, score: 80, icon: Briefcase, color: 'bg-orange-500' },
    { name: 'Digital Footprint', weight: 10, score: 70, icon: Shield, color: 'bg-teal-500' },
    { name: 'Banking Behavior', weight: 10, score: 88, icon: BarChart3, color: 'bg-pink-500' }
  ];

  const tabs = [
    { id: 'overview', label: 'Score Overview', icon: BarChart3 },
    { id: 'factors', label: 'Score Factors', icon: Target }
  ];

  const renderShapBarGraph = () => {
    console.log('Current SHAP values:', shapValues);
    
    if (!shapValues || shapValues.length === 0) {
      console.log('No SHAP values available');
      return (
        <div className="mt-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-200">Feature Importance Analysis</h3>
          </div>
          <div className="text-center text-gray-400">
            Loading feature importance data...
          </div>
        </div>
      );
    }

    const maxValue = Math.max(...shapValues.map(v => Math.abs(v.value)));
    
    return (
      <div className="mt-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart2 className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-200">Feature Importance Analysis</h3>
        </div>
        <div className="space-y-4">
          {shapValues.map((item, index) => {
            const percentage = (Math.abs(item.value) / maxValue) * 100;
            const isPositive = item.value > 0;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-300">{item.feature}</span>
                  <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {item.value.toFixed(3)}
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPositive ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-red-500 to-red-400'
                    }`}
                    style={{
                      width: `${percentage}%`,
                      marginLeft: isPositive ? '0' : 'auto',
                      marginRight: isPositive ? 'auto' : '0'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Positive Impact</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Negative Impact</span>
          </div>
        </div>
      </div>
    );
  };

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
              <div className="lg:col-span-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-200">Your AI Credit Score</h2>
                  <div className="relative">
                    <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text mb-2">
                      {animatedScore.toFixed(2)}
                    </div>
                    <div className="text-lg text-gray-400">out of 10</div>
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

                {/* Score Breakdown */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">85%</div>
                    <div className="text-sm text-gray-400">Payment Reliability</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">90%</div>
                    <div className="text-sm text-gray-400">Financial Stability</div>
                  </div>
                </div>

                {/* Explanation Section */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <Info className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-semibold text-gray-200">AI-Powered Explanation</h3>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({node, ...props}) => <p className="text-gray-300 leading-relaxed mb-4" {...props} />,
                            strong: ({node, ...props}) => <strong className="text-blue-400 font-semibold" {...props} />,
                            em: ({node, ...props}) => <em className="text-purple-400 italic" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 text-gray-300" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 text-gray-300" {...props} />,
                            li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
                            h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mb-4" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-xl font-bold text-white mb-3" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-lg font-bold text-white mb-2" {...props} />,
                            blockquote: ({node, ...props}) => (
                              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300 my-4" {...props} />
                            ),
                            code: ({node, ...props}) => (
                              <code className="bg-slate-700/50 px-2 py-1 rounded text-blue-300 font-mono text-sm" {...props} />
                            ),
                          }}
                        >
                          {explanation}
                        </ReactMarkdown>
                      </div>
                    </div>
                    <button
                      onClick={toggleAudio}
                      disabled={isLoadingAudio}
                      className={`p-3 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors duration-200 ml-4 flex-shrink-0 ${
                        isLoadingAudio ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      title={isLoadingAudio ? "Loading audio..." : isPlaying ? "Stop audio" : "Play audio"}
                    >
                      {isLoadingAudio ? (
                        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      ) : isPlaying ? (
                        <VolumeX className="w-5 h-5 text-blue-400" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-blue-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Factors Tab */}
          {activeTab === 'factors' && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-200">Credit Score Factors</h2>
              <div className="space-y-6">
                {shapValues.map((item, index) => {
                  const isPositive = item.value > 0;
                  const score = Math.abs(item.value) * 100; // Convert SHAP value to a 0-100 scale
                  const color = isPositive ? 'bg-green-500' : 'bg-red-500';
                  const IconComponent = index % 6 === 0 ? Home :
                                      index % 6 === 1 ? CreditCard :
                                      index % 6 === 2 ? Smartphone :
                                      index % 6 === 3 ? Briefcase :
                                      index % 6 === 4 ? Shield :
                                      BarChart3;

                  return (
                    <div key={index} className="bg-slate-700/30 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 ${color} rounded-lg`}>
                            <IconComponent className="text-white" size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-200">{item.feature}</h3>
                            <p className="text-sm text-gray-400">Impact: {isPositive ? 'Positive' : 'Negative'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-200">{score.toFixed(1)}%</div>
                          <div className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {isPositive ? 'Improves Score' : 'Reduces Score'}
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${color} transition-all duration-500`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
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