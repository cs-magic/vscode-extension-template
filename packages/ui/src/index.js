import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }) => {
    const baseStyles = 'font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variantStyles = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
        secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500',
    };
    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };
    return (_jsx("button", { className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`, ...props, children: children }));
};
export const Card = ({ title, children, className = '' }) => {
    return (_jsxs("div", { className: `bg-white rounded-xl shadow-md overflow-hidden ${className}`, children: [title && (_jsx("div", { className: "px-6 py-4 border-b border-gray-200", children: _jsx("h3", { className: "text-lg font-medium text-gray-900", children: title }) })), _jsx("div", { className: "p-6", children: children })] }));
};
//# sourceMappingURL=index.js.map