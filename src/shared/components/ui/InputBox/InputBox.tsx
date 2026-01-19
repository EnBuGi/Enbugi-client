import React from 'react';
import { AlertCircle } from 'lucide-react';
import { InputProps } from '../../../types/ui';
import { Text } from '../Text';

type InputBoxProps = InputProps & {
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  hideErrorIcon?: boolean;
};

export const InputBox: React.FC<InputBoxProps> = ({
  label,
  error,
  helperText,
  icon,
  rightIcon,
  onRightIconClick,
  hideErrorIcon,
  className = '',
  id,
  disabled,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  const hasLeftIcon = !!icon;
  const canShowErrorIcon = !hideErrorIcon && !!error && typeof error === 'string';
  const hasRightIcon = !!rightIcon || canShowErrorIcon;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={inputId}>
          <Text variant="label" className="text-zinc-400">
            {label}
          </Text>
        </label>
      )}

      <div className="relative group">
        {hasLeftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          disabled={disabled}
          className={`
            flex h-10 w-full rounded-md border px-3 py-2 text-sm text-white shadow-sm transition-all
            file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-600
            focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 font-sans
            ${hasLeftIcon ? 'pl-10' : 'pl-3'}
            ${hasRightIcon ? 'pr-10' : 'pr-3'}
            ${error && typeof error === 'string'
              ? 'border-red-900/50 focus-visible:border-red-500 focus-visible:ring-red-500/50 bg-red-950/10'
              : 'bg-surface border-border ring-1 ring-white/5 focus-visible:border-primary focus-visible:ring-primary'
            }

          `}
          {...props}
        />

        {rightIcon && (
          <button
            type="button"
            disabled={disabled}
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="input action"
          >
            {rightIcon}
          </button>
        )}

        {!rightIcon && canShowErrorIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
            <AlertCircle size={16} />
          </div>
        )}
      </div>

      {error && typeof error === 'string' ? (
        <Text variant="tiny" className="text-red-400 font-medium">
          {error}
        </Text>
      ) : helperText ? (
        <Text variant="tiny" className="text-zinc-500">
          {helperText}
        </Text>
      ) : null}
    </div>
  );
};
