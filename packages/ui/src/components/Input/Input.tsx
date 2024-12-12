import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full bg-vscode-input-background text-vscode-input-foreground border border-vscode-input-border rounded px-3 py-2 
          placeholder-vscode-input-placeholder focus:outline-none focus:ring-1 focus:ring-offset-1
          disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    );
  }
);
