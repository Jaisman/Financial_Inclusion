import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  Home,
  User,
  Handshake,
  CreditCard,
  LogIn,
  LogOut,
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isLoggedIn = false; // Replace with real auth check if needed

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/dashboard' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
    { id: 'ngo', label: 'NGO', icon: Handshake, path: '/ngo' },
    { id: 'credit', label: 'Credit', icon: CreditCard, path: '/credit' },
  ];

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
              const isActive = location.pathname === path;
              return (
                <Link
                  key={id}
                  to={path}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
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
                to="/"
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
