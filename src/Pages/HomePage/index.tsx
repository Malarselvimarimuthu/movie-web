import React, { useState, useEffect, startTransition } from 'react';
import { Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom'; // Using useNavigate for React Router v6
import backgroundImage from '../../assets/HomeBackGround1.jpg';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

  // Trigger the animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNavigation = () => {
    startTransition(() => {
      navigate('/movies'); // Navigate to movies page
    });
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-lg"></div>

      {/* Content on top of the overlay */}
      <div className="relative flex flex-col items-center justify-center h-screen text-white">
        <Transition
          show={isVisible}
          enter="transform transition ease-out duration-1000"
          enterFrom="-translate-y-full opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <div
            onClick={handleNavigation}
            className="p-8 rounded-xl bg-black bg-opacity-0 backdrop-md cursor-pointer"
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold shadow-lg">
              <span className="text-white">Movie Recommendations</span>
            </h1>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default HomePage;
