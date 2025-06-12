import React, { useState, useRef } from 'react';
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
  Brain
} from 'lucide-react';

const EduChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your financial education assistant. Ask me anything about credit, savings, or loans!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [goal, setGoal] = useState('');
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

  // Mock data for personalized tips
  const personalizedTips = [
    { id: 1, category: 'Credit Score', tip: 'Your credit utilization is high. Try to keep it below 30%.' },
    { id: 2, category: 'Savings', tip: 'Consider setting up automatic transfers to your savings account.' },
    { id: 3, category: 'Investment', tip: 'Start with index funds for a diversified portfolio.' }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { id: messages.length + 1, text: input, sender: 'user' }]);
    setInput('');

    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: prev.length + 1, 
        text: "That's a great question! Let me help you with that...", 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  const handleSetGoal = (e) => {
    e.preventDefault();
    // Handle setting new goal
    setGoal('');
  };

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
              </div>
              <div className="flex-1 overflow-y-auto bg-slate-700/30 rounded-lg p-4 mb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-slate-700/50 border border-slate-600 text-gray-200'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
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
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
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
              {personalizedTips.map((tip) => (
                <div
                  key={tip.id}
                  className="bg-slate-700/30 rounded-lg p-4 border border-slate-600"
                >
                  <span className="text-xs font-medium text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                    {tip.category}
                  </span>
                  <p className="text-sm text-gray-300 mt-2">{tip.tip}</p>
                  <button
                    onClick={() => setInput(`Tell me more about ${tip.tip.toLowerCase()}`)}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium mt-2 transition-colors duration-200"
                  >
                    Ask EduBot
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduChat;