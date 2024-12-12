import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}
export declare const Button: ({ variant, size, children, className, ...props }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}
export declare const Card: ({ title, children, className }: CardProps) => import("react/jsx-runtime").JSX.Element;
