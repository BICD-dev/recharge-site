import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AuthHeaderProps {
  logoUrl?: string;
  logoText?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ 
  logoUrl, 
  logoText = "Datafy" 
}) => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <Link to="/" className="group flex items-center gap-3 transition-transform duration-300 hover:scale-105">
            {logoUrl ? (
              <motion.img 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src={logoUrl} 
                alt={logoText}
                className="h-10 md:h-12 w-auto"
              />
            ) : (
              <div className="flex items-center gap-2.5">
                {/* Logo Icon */}
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                >
                  <span className="text-white font-bold text-xl md:text-2xl">D</span>
                </motion.div>
                
                {/* Logo Text */}
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent leading-none">
                    {logoText}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">
                    Data Solutions
                  </span>
                </div>
              </div>
            )}
          </Link>

          {/* Right Section - Optional Nav Items */}
          <div className="flex items-center gap-4">
            {/* Help/Support Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">
                Data Solutions
              </span>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Subtle gradient line at bottom */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
    </motion.header>
  );
};

export default AuthHeader;