import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Thông tin công ty */}
        <div>
          <h3 className="text-lg font-bold mb-2">About Us</h3>
          <p className="mb-4">
            We are a leading e-commerce platform, providing a wide range of products at unbeatable prices.
          </p>
          <h4 className="font-semibold">Contact Us</h4>
          <p>Email: support@yourcompany.com</p>
          <p>Phone: +1 (234) 567-890</p>
        </div>

        {/* Liên kết */}
        <div>
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <div className="footer-links mb-2">
            <Link to="/shop/home" onClick={scrollToTop} className="block hover:underline">Home</Link>
            <Link to="/shop/listing" onClick={scrollToTop} className="block hover:underline">Listing</Link>
            <Link to="/shop/search" onClick={scrollToTop} className="block hover:underline">Search</Link>
            <Link to="/shop/account" onClick={scrollToTop} className="block hover:underline">Account</Link>
            <Link to="/shop/checkout" onClick={scrollToTop} className="block hover:underline">Checkout</Link>
          </div>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;