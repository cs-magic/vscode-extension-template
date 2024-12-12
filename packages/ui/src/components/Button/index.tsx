import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseStyles = 'font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
  
  const variantStyles = {
    primary: `bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    secondary: `bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
