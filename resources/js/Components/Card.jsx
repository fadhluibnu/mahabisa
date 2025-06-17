import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

// Header component for the card
Card.Header = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

// Content component for the card
Card.Content = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

// Footer component for the card
Card.Footer = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
