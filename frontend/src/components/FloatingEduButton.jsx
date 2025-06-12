import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const FloatingEduButton = () => {
  return (
    <Link
      to="/educhat"
      className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50 flex items-center justify-center"
      aria-label="Ask EduBot"
    >
      <MessageCircle className="w-6 h-6" />
    </Link>
  );
};

export default FloatingEduButton; 