import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, variant = 'primary', className, onClick, ...props }) => {
  const baseStyles = "px-6 py-3 font-black uppercase tracking-widest border-2 border-black transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-black text-white hover:bg-white hover:text-black neo-shadow hover:neo-shadow-hover",
    secondary: "bg-white text-black neo-shadow hover:neo-shadow-hover",
    danger: "bg-red-600 text-white hover:bg-red-700 neo-shadow hover:neo-shadow-hover",
    outline: "bg-transparent hover:bg-gray-100"
  };

  return (
    <button 
      className={twMerge(baseStyles, variants[variant], className)} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;