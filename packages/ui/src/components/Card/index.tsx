import React from 'react';

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ title, children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};
