import React from 'react';

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ title, children, className = '' }: CardProps) => {
  return (
    <div className={`bg-vscode-editor-background border border-vscode-input-border rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-vscode-input-border">
          <h3 className="text-base font-medium text-vscode-foreground">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};
