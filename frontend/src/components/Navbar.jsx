import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  User,
  Handshake,
  CreditCard,
  LogIn,
  LogOut,
  MessageCircle,
  Brain,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';
import { useLanguage } from './UI/LanguageContext';

const Navbar = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const isLoggedIn = false; // Replace with real auth check if needed

  const navigationItems = [
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
    { id: 'ngo', label: 'NGO', icon: Handshake, path: '/ngo' },
    { id: 'credit', label: 'Credit', icon: CreditCard, path: '/credit' },
    { id: 'educhat', label: 'Educhat', icon: MessageCircle, path: '/educhat' },
    { id: 'quiz', label: 'Financial Quiz', icon: Target, path: '/quiz' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">SecureBank</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {navigationItems.map(({ id, label, icon: Icon, path }) => {
              return (
                <Link
                  key={id}
                  to={path}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(path)
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Button */}
          <div>
            {isLoggedIn ? (
              <button
                onClick={() => console.log('Logout')} // Replace with actual logout logic
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;