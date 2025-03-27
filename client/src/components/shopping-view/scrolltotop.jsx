import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react'; // Nhập icon từ lucide-react

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded ${isVisible ? 'block' : 'hidden'}`}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} /> {/* Thay thế bằng icon từ Lucide */}
    </button>
  );
};

export default ScrollToTopButton;