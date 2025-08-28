import React, { forwardRef } from 'react';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    { label, error, multiline = false, rows = 4, className = '', ...props },
    ref,
  ) => {
    const baseClasses = `
      w-full 
      px-4 
      py-4 
      bg-gray-900/50 
      border 
      border-gray-700 
      rounded-lg 
      text-white 
      placeholder:text-gray-400 
      focus:outline-none 
      focus:ring-2 
      focus:ring-[#fff1ac] 
      focus:border-[#fff1ac] 
      transition-colors 
      duration-200
      ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
      ${className}
    `;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}

        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            className={baseClasses}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={baseClasses}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
