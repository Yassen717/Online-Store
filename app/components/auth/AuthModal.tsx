"use client";

import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';

type AuthMode = 'login' | 'register' | 'forgot-password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  if (!isOpen) return null;

  const handleLoginSuccess = () => {
    onClose();
    // Redirect to account page after successful login
    window.location.href = '/account';
  };

  const handleRegisterSuccess = () => {
    // Switch to login mode after successful registration
    setMode('login');
  };

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm
            onSwitchToRegister={() => setMode('register')}
            onForgotPassword={() => setMode('forgot-password')}
            onSuccess={handleLoginSuccess}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onSwitchToLogin={() => setMode('login')}
            onSuccess={handleRegisterSuccess}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onBackToLogin={() => setMode('login')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-purple-100/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#f8f9ff] rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === 'login' && 'Sign In'}
              {mode === 'register' && 'Create Account'}
              {mode === 'forgot-password' && 'Reset Password'}
            </h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          {renderForm()}
        </div>
      </div>
    </div>
  );
} 