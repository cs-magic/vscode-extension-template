import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', disabled = false, ...props }, ref) => {
    const baseStyles = `
      block w-full rounded border-vscode-input-border
      bg-vscode-input-background text-vscode-input-foreground
      placeholder-vscode-input-placeholder
      focus:ring-2 focus:ring-offset-2
      transition-colors duration-200
      form-input
    `;
    
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
    const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

    return (
      <div>
        {label && (
          <label className="block text-sm font-medium text-vscode-foreground mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${disabledStyles} ${errorStyles} ${className}`}
          disabled={disabled}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
