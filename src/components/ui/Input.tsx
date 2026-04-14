import { forwardRef } from 'react';
import { cn } from 'lib/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-[var(--color-text-dark)]"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn('form-input', error && 'border-red-500 focus:ring-red-400', className)}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  ),
);
Input.displayName = 'Input';

export { Input };
