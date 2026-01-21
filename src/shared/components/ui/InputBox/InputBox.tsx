import React from 'react';
import { AlertCircle } from 'lucide-react';
import { InputProps } from '../../../types/ui';
import { Text } from '../Text';
import { cn } from '../../../utils/cn';

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
  className,
  id,
  disabled,
  ...props
}) => {
  const inputId = id ?? React.useId();
  const hasError = !!error;
  const errorMsg = typeof error === 'string' ? error : '';
  const showErrorIcon = !rightIcon && !hideErrorIcon && hasError;

  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={inputId}>
          <Text variant="label" className="text-zinc-400">
            {label}
          </Text>
        </label>
      )}

      <div className="relative group">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-primary">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded-md border px-3 py-2 text-sm font-sans text-white shadow-sm transition-all',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-600',
            'focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
            icon ? 'pl-10' : 'pl-3',
            (rightIcon || showErrorIcon) ? 'pr-10' : 'pr-3',
            hasError
              ? 'border-red-900/50 bg-red-950/10 focus-visible:border-red-500 focus-visible:ring-red-500/50'
              : 'bg-surface border-border ring-1 ring-white/5 focus-visible:border-primary focus-visible:ring-primary'
          )}
          {...props}
        />

        {rightIcon ? (
          <button
            type="button"
            disabled={disabled}
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="input action"
          >
            {rightIcon}
          </button>
        ) : showErrorIcon ? (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-red-500 animate-in fade-in zoom-in-95 duration-200">
            <AlertCircle size={16} />
          </div>
        ) : null}
      </div>

      {errorMsg ? (
        <Text variant="tiny" className="font-medium text-red-400">
          {errorMsg}
        </Text>
      ) : helperText ? (
        <Text variant="tiny" className="text-zinc-500">
          {helperText}
        </Text>
      ) : null}
    </div>
  );
};
