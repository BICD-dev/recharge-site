import React from 'react';
import { Link } from 'react-router-dom';

interface AuthHeaderProps {
  logoUrl?: string;
  logoText?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ 
  logoUrl, 
  logoText = "Datafy" 
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            
            {logoUrl ? (
                <Link to={"/"}>
                    <img 
                      src={logoUrl} 
                      alt={logoText}
                      className="h-8 w-auto"
                    />
            </Link>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <span className="text-2xl font-bold bg-linear-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  {logoText}
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default AuthHeader;