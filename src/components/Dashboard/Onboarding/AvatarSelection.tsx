import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

interface AvatarSelectionProps {
  onSelectAvatar: (avatarUrl: string) => void;
}

interface AvatarOption {
  id: number;
  src: string;
  alt: string;
}

const avatarOptions: AvatarOption[] = [
  { id: 1, src: '/images/avatar/avatar1.png', alt: 'Avatar 1' },
  { id: 2, src: '/images/avatar/avatar2.jpeg', alt: 'Avatar 2' },
  // { id: 3, src: '/images/avatar/avatar3.png', alt: 'Avatar 3' },
  // Add more avatars as needed
];

const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onSelectAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAvatarClick = (id: number) => {
    setSelectedAvatar(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAvatar !== null) {
      const avatar = avatarOptions.find((a) => a.id === selectedAvatar);
      if (avatar) {
        setIsSubmitting(true);
        // Simulate a brief delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        onSelectAvatar(avatar.src);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      {/* Grid Layout for Avatars */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <AnimatePresence mode="wait">
          {avatarOptions.map((avatar, index) => {
            const isSelected = selectedAvatar === avatar.id;
            
            return (
              <motion.div
                key={avatar.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="relative aspect-square"
              >
                {/* Avatar Container */}
                <motion.button
                  type="button"
                  onClick={() => handleAvatarClick(avatar.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative w-full h-full rounded-2xl overflow-hidden cursor-pointer
                    transition-all duration-300 group
                    ${isSelected 
                      ? 'ring-4 ring-green-500 ring-offset-4 shadow-2xl' 
                      : 'ring-2 ring-gray-200 hover:ring-green-300 hover:ring-offset-2 shadow-lg'
                    }
                  `}
                >
                  {/* Avatar Image */}
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-t from-black/50 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    ${isSelected ? 'opacity-100' : ''}
                  `} />
                  
                  {/* Selected Checkmark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <FiCheck className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={3} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                
                {/* Avatar Label */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className={`
                    text-center mt-2 text-sm font-medium transition-colors duration-300
                    ${isSelected ? 'text-green-700' : 'text-gray-600'}
                  `}
                >
                  {avatar.alt}
                </motion.p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Continue Button */}
      <motion.button
        type="submit"
        disabled={selectedAvatar === null || isSubmitting}
        whileHover={selectedAvatar !== null && !isSubmitting ? { scale: 1.02 } : {}}
        whileTap={selectedAvatar !== null && !isSubmitting ? { scale: 0.98 } : {}}
        className={`
          w-full py-4 px-8 rounded-xl font-semibold text-white
          transition-all duration-300 transform
          ${selectedAvatar !== null && !isSubmitting
            ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl'
            : 'bg-gray-300 cursor-not-allowed'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          'Continue'
        )}
      </motion.button>

      {/* Helper Text */}
      {selectedAvatar === null && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-500 text-sm mt-4"
        >
          Please select an avatar to continue
        </motion.p>
      )}
    </form>
  );
};

export default AvatarSelection;