import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Target, 
  Calendar, 
  TrendingUp, 
  Lightbulb, 
  BookOpen, 
  DollarSign, 
  Shield, 
  Send,
  ChevronLeft,
  ChevronRight,
  Brain,
  Loader2
} from 'lucide-react';

const EduChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your financial education assistant. Ask me anything about credit, savings, or loans!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState(`user_${Math.floor(Math.random() * 10000)}`);
  const [userData, setUserData] = useState({
    age: 35,
    employment_status: "self-employed",
    monthly_income: 2500,
    utility_bill_payment_history: 70,
    rental_payment_history: 82.0,
    mobile_recharge_frequency: 3,
    mobile_data_usage: 5.5,
    education_level: "High School",
    financial_literacy_score: 6,
    loan_repayment_history: 45.0,
    region: "rural"
  });
  const [creditScore, setCreditScore] = useState(null);
  const [shapValues, setShapValues] = useState(null);
  const messagesEndRef = useRef(null);

  // Mock data for financial goal
  const currentGoal = {
    category: 'Emergency Fund',
    saved: 25000,
    target: 100000,
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  };

  // Mock data for savings history
  const savingsHistory = [
    { month: 'January', saved: 5000, goal: 8000, status: 'completed' },
    { month: 'February', saved: 7500, goal: 8000, status: 'completed' },
    { month: 'March', saved: 6000, goal: 8000, status: 'in-progress' }
  ];

  // Mock data for carousel tips
  const carouselTips = [
    { tip: "Did you know? Paying bills on time can improve your credit score by up to 35%!" },
    { tip: "Start an emergency fund with 3-6 months of expenses for financial security." },
    { tip: "Regularly checking your credit report can help catch errors and prevent fraud." }
  ];

  // Initialize chat with backend
  useEffect(() => {
    const initializeChat = async () => {
      try {
        setIsLoading(true);
        
        // First get the credit score and SHAP values
        const scoreResponse = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
        const scoreData = await scoreResponse.json();
        setCreditScore(scoreData.credit_score);
        
        const shapResponse = await fetch('http://localhost:5000/explain', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
        const shapData = await shapResponse.json();
        setShapValues(shapData.shap_values);
        
        // Then initialize the chat session
        const chatResponse = await fetch('http://localhost:5000/educhat/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...userData,
            user_id: userId
          })
        });
        const chatData = await chatResponse.json();
        
        // Update the initial bot message with the personalized greeting
        setMessages([{ 
          id: 1, 
          text: chatData.message, 
          sender: 'bot' 
        }]);
        
      } catch (error) {
        console.error("Error initializing chat:", error);
        setMessages([{ 
          id: 1, 
          text: "Hi! I'm your financial education assistant. We're having some technical issues, but you can still ask me questions!", 
          sender: 'bot' 
        }]);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeChat();
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message to UI immediately
    const userMessage = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send message to backend
      const response = await fetch('http://localhost:5000/educhat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          message: input
        })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          text: data.message, 
          sender: 'bot' 
        }]);
      } else {
        throw new Error(data.message || 'Failed to get response');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { 
        id: prev.length + 1, 
        text: "Sorry, I'm having trouble responding right now. Please try again later.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetGoal = (e) => {
    e.preventDefault();
    // Handle setting new goal
    setGoal('');
  };

  // Generate personalized tips based on credit score and SHAP values
  const generatePersonalizedTips = () => {
    if (!shapValues || !creditScore) return [];
    
    const tips = [];
    
    // Get top 3 factors affecting the score
    const topFactors = Object.entries(shapValues)
      .sort((a, b) => Math.abs(b[1].shap) - Math.abs(a[1].shap))
      .slice(0, 3);
    
    topFactors.forEach(([factor, data]) => {
      const isPositive = data.shap > 0;
      
      let tip = '';
      let category = 'Credit Score';
      
      switch(factor) {
        case 'utility_bill_payment_history':
          tip = isPositive 
            ? "Great job paying your utility bills on time! Keep it up to maintain your good credit score."
            : "Try to improve your utility bill payment history. Setting up automatic payments can help.";
          category = 'Bills';
          break;
        case 'monthly_income':
          tip = isPositive
            ? "Your income level is helping your credit score. Consider increasing savings as your income grows."
            : "Your income level is affecting your score. Look for ways to increase income or reduce debt-to-income ratio.";
          category = 'Income';
          break;
        case 'loan_repayment_history':
          tip = isPositive
            ? "Your good loan repayment history is boosting your score. Continue making timely payments."
            : "Improving your loan repayment history could significantly help your credit score.";
          category = 'Loans';
          break;
        default:
          tip = isPositive
            ? `Your ${factor.replace(/_/g, ' ')} is helping your credit score.`
            : `Improving your ${factor.replace(/_/g, ' ')} could help your credit score.`;
      }
      
      tips.push({
        id: factor,
        category,
        tip
      });
    });
    
    // Add general tips based on credit score range
    if (creditScore < 5) {
      tips.push({
        id: 'low-score',
        category: 'Credit Score',
        tip: 'Your credit score needs improvement. Focus on paying bills on time and reducing credit utilization.'
      });
    } else if (creditScore < 8) {
      tips.push({
        id: 'medium-score',
        category: 'Credit Score',
        tip: 'Your credit score is decent. To improve further, maintain low credit utilization and avoid new hard inquiries.'
      });
    } else {
      tips.push({
        id: 'high-score',
        category: 'Credit Score',
        tip: 'Excellent credit score! Maintain your good habits and consider optimizing your credit mix.'
      });
    }
    
    return tips;
  };

  const personalizedTips = generatePersonalizedTips();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Brain className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Financial Education Chat 💡
            </h1>
          </div>
          <p className="text-gray-400">Learn about credit, savings, and more with our AI assistant</p>
        </div>

        {/* Quick Tips Carousel */}
        <div className="mb-6 bg-slate-800/50 rounded-lg shadow-sm border border-slate-700 p-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentTipIndex((prev) => (prev - 1 + carouselTips.length) % carouselTips.length)}
            className="text-gray-400 hover:text-gray-200"
            aria-label="Previous Tip"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 text-center">
            <p className="text-sm text-gray-300 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-yellow-400 mr-2" />
              {carouselTips[currentTipIndex]?.tip}
            </p>
          </div>
          <button
            onClick={() => setCurrentTipIndex((prev) => (prev + 1) % carouselTips.length)}
            className="text-gray-400 hover:text-gray-200"
            aria-label="Next Tip"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Financial Goal Section */}
          <div className="lg:col-span-1 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-sm border border-slate-700 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-gray-200">Your Financial Goal</h3>
            </div>

            {/* Current Goal Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-400">{currentGoal.category}</span>
                <span className="text-sm font-medium text-green-400">₹{currentGoal.saved.toLocaleString()} / ₹{currentGoal.target.toLocaleString()}</span>
              </div>
              <div className="bg-slate-700 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentGoal.saved / currentGoal.target) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Start: {new Date(currentGoal.startDate).toLocaleDateString()}</span>
                <span>Target: {new Date(currentGoal.endDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Monthly Savings History */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-200 mb-3">Monthly Progress</h4>
              <div className="space-y-3">
                {savingsHistory.map((month, index) => (
                  <div key={index} className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-300">{month.month}</span>
                      </div>
                      <span className={`text-sm font-medium ${
                        month.status === 'completed' ? 'text-green-400' : 'text-blue-400'
                      }`}>
                        {month.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Saved: ₹{month.saved.toLocaleString()}</span>
                      <span className="text-gray-400">Goal: ₹{month.goal.toLocaleString()}</span>
                    </div>
                    <div className="bg-slate-600 rounded-full h-1.5 mt-2">
                      <div
                        className={`h-1.5 rounded-full ${
                          month.status === 'completed' 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-600'
                        }`}
                        style={{ width: `${(month.saved / month.goal) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Set New Goal Form */}
            <div className="border-t border-slate-700 pt-4">
              <h4 className="text-sm font-medium text-gray-200 mb-3">Set New Goal</h4>
              <form onSubmit={handleSetGoal} className="space-y-3">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g., Save ₹50,000 for emergency fund"
                  className="w-full p-2 text-sm bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-200 placeholder-gray-400"
                  aria-label="Goal input"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 text-sm font-medium transition-all duration-300"
                >
                  Set New Goal
                </button>
              </form>
            </div>
          </div>

          {/* Chatbot Section */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-sm border border-slate-700">
            <div className="p-6 flex flex-col h-[600px]">
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-200">Chat with EduBot</h3>
                {creditScore && (
                  <span className="ml-auto text-sm font-medium px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                    Your Score: {creditScore.toFixed(1)}/10
                  </span>
                )}
              </div>
              <div className="flex-1 overflow-y-auto bg-slate-700/30 rounded-lg p-4 mb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-slate-700/50 border border-slate-600 text-gray-200'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-slate-700/50 border border-slate-600 text-gray-200 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSendMessage} className="flex items-center mt-auto">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about credit, savings, or loans..."
                  className="flex-1 p-3 bg-slate-700/50 border border-slate-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400"
                  aria-label="Chat input"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  className={`p-3 rounded-r-lg transition-all duration-300 ${
                    isLoading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                  }`}
                  aria-label="Send message"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Personalized Tips Sidebar */}
          <div className="lg:col-span-1 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-sm border border-slate-700 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-gray-200">Your Financial Tips</h3>
            </div>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {personalizedTips.length > 0 ? (
                personalizedTips.map((tip) => (
                  <div
                    key={tip.id}
                    className="bg-slate-700/30 rounded-lg p-4 border border-slate-600"
                  >
                    <span className="text-xs font-medium text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                      {tip.category}
                    </span>
                    <p className="text-sm text-gray-300 mt-2">{tip.tip}</p>
                    <button
                      onClick={() => setInput(`Tell me more about: ${tip.tip}`)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium mt-2 transition-colors duration-200"
                      disabled={isLoading}
                    >
                      Ask EduBot
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-400 text-sm">
                  {isLoading ? 'Loading tips...' : 'Personalized tips will appear here based on your financial data'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduChat;