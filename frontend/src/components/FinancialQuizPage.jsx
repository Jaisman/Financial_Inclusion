import React, { useState, useContext } from 'react';
import { 
  Lightbulb, 
  CheckCircle, 
  ArrowRight, 
  Share2, 
  Star, 
  Loader2,
  Brain,
  TrendingUp,
  DollarSign,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from './UI/LanguageContext';

const FinancialQuizPage = ({ userData }) => {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ total: 0, credit: 0, savings: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data (replace with Financial Services Cloud)
  const user = userData || { 
    id: 'user123', 
    name: 'John Doe', 
    alternativeCreditScore: 650, 
    region: 'Punjab, India' 
  };

  // AI-driven questions based on user data
  const questions = [
    {
      text: t.quizQuestions?.payBills || 'Do you pay your bills on time?',
      options: ['Always', 'Sometimes', 'Rarely'],
      weights: { credit: [30, 15, 0] },
      category: 'credit',
      feedback: [
        'Great! Timely payments boost your credit score.',
        'Try setting reminders to improve consistency.',
        "Late payments hurt your score. Let's work on this!"
      ],
      icon: TrendingUp
    },
    {
      text: t.quizQuestions?.saveIncome || 'Do you save a portion of your income?',
      options: ['Yes, regularly', 'Occasionally', 'No'],
      weights: { savings: [30, 15, 0] },
      category: 'savings',
      feedback: [
        'Excellent! Savings build financial security.',
        'Occasional savings are a start. Aim for consistency.',
        'No savings? Start small with our budgeting tips.'
      ],
      icon: DollarSign
    },
    {
      text: t.quizQuestions?.checkScore || 'Have you checked your credit score recently?',
      options: ['Yes', 'No'],
      weights: { credit: [20, 0] },
      category: 'credit',
      feedback: [
        'Smart move! Monitoring your score is key.',
        'Check your score to stay informed.'
      ],
      icon: Shield
    }
  ];

  const handleAnswer = (index) => {
    const question = questions[currentQuestion];
    const weight = question.weights[question.category][index];
    setScore((prev) => ({
      ...prev,
      total: prev.total + weight,
      [question.category]: prev[question.category] + weight
    }));
    setFeedback(question.feedback[index]);
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setFeedback('');
      } else {
        setIsComplete(true);
      }
    }, 500);
  };

  const getBadge = () => {
    if (score.total >= 60) return { 
      name: 'Financial Star', 
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      gradient: 'from-yellow-500 to-orange-600'
    };
    if (score.total >= 40) return { 
      name: 'Financial Starter', 
      icon: <Star className="w-8 h-8 text-blue-400" />,
      gradient: 'from-blue-500 to-purple-600'
    };
    return { 
      name: 'Financial Learner', 
      icon: <Star className="w-8 h-8 text-gray-400" />,
      gradient: 'from-gray-500 to-slate-600'
    };
  };

  const handleShare = () => {
    const shareText = `I scored ${score.total}/80 on SecureBank's Financial Health Quiz! Check your financial health at securebank.com/quiz`;
    if (navigator.share) {
      navigator.share({ 
        title: 'My Financial Health Score', 
        text: shareText, 
        url: window.location.href 
      });
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Brain className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Financial Health Quiz 💡
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Discover your financial strengths and get personalized tips!</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700 p-8">
          {!isComplete ? (
            <div>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {t.questionProgress || 'Question'} {currentQuestion + 1} {t.of || 'of'} {questions.length}
                </p>
              </div>

              {/* Question */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  {React.createElement(questions[currentQuestion].icon, { className: "text-white", size: 24 })}
                </div>
                <h2 className="text-xl font-semibold text-gray-200">{questions[currentQuestion].text}</h2>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={isLoading}
                    className={`w-full text-left p-4 rounded-lg text-base transition-all duration-300 ${
                      isLoading 
                        ? 'bg-slate-700/50 cursor-not-allowed' 
                        : 'bg-slate-700/30 hover:bg-slate-700/50 text-gray-200 border border-slate-600 hover:border-slate-500'
                    }`}
                    aria-label={`Select ${option}`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {feedback && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-400 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {feedback}
                  </p>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="flex justify-center mt-4">
                  <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              {/* Badge */}
              <div className="mb-6">
                <div className={`inline-flex items-center justify-center p-4 bg-gradient-to-r ${getBadge().gradient} rounded-2xl mb-4`}>
                  {getBadge().icon}
                </div>
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  {getBadge().name}
                </h2>
              </div>

              {/* Score */}
              <div className="bg-slate-700/30 rounded-2xl p-6 mb-6 border border-slate-600">
                <p className="text-lg text-gray-300 mb-4">
                  {t.quizScore || 'Your Financial Health Score'}: 
                  <span className="font-semibold text-green-400 ml-2">{score.total}/80</span>
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600">
                    <p className="text-sm text-gray-400">{t.creditBuilding || 'Credit Building'}</p>
                    <p className="text-lg font-medium text-blue-400">{score.credit}/50</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600">
                    <p className="text-sm text-gray-400">{t.savings || 'Savings'}</p>
                    <p className="text-lg font-medium text-blue-400">{score.savings}/30</p>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <p className="text-base text-gray-300 mb-6">
                {score.total >= 60
                  ? t.highScoreTip || "Great job! Keep building your financial future with our tools."
                  : t.lowScoreTip || "Let's improve! Explore our educational resources and NGO programs."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <Link
                  to="/educhat"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                >
                  {t.askEduBot || 'Ask EduBot'} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  to="/ngo"
                  className="bg-slate-700/30 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-700/50 transition-all duration-300 border border-slate-600 flex items-center justify-center"
                >
                  {t.explorePrograms || 'Explore Programs'} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center mx-auto transition-colors duration-200"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {t.shareScore || 'Share Your Score'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialQuizPage; 