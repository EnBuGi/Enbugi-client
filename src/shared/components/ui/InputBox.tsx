// src/shared/components/ui/InputBox.tsx
import React from 'react';
import { AlertCircle } from 'lucide-react';
import type { InputProps } from '../../types/ui';
import { Text } from './Text';

export const InputBox = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            icon,
            className = '',
            inputClassName = '',
            id,
            disabled,
            ...props
        },
        ref
    ) => {
        const generatedId = React.useId();
        const inputId = id || generatedId;

        const hasError = Boolean(error);
        const errorMessage = typeof error === 'string' ? error : undefined;

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
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none group-focus-within:text-primary transition-colors">
                            {icon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        disabled={disabled}
                        aria-invalid={hasError || undefined}
                        aria-describedby={errorMessage || helperText ? `${inputId}-desc` : undefined}
                        className={`
              flex h-10 w-full rounded-md border bg-surface px-3 py-2 text-sm text-white shadow-sm transition-all
              file:border-0 file:bg-transparent file:text-sm file:font-medium
              placeholder:text-zinc-600
              focus-visible:outline-none focus-visible:ring-1
              disabled:cursor-not-allowed disabled:opacity-50 font-sans
              ${icon ? 'pl-9' : ''}
              ${hasError
                                ? 'border-red-900/50 focus-visible:border-red-500 focus-visible:ring-red-500/50 bg-red-950/10'
                                : 'border-border focus-visible:border-primary focus-visible:ring-primary'
                            }
              ${inputClassName}
            `}
                        {...props}
                    />

                    {errorMessage && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                            <AlertCircle size={16} />
                        </div>
                    )}
                </div>

                {(errorMessage || helperText) ? (
                    <Text
                        id={`${inputId}-desc`}
                        variant="tiny"
                        className={errorMessage ? 'text-red-400 font-medium' : 'text-zinc-500'}
                    >
                        {errorMessage ?? helperText}
                    </Text>
                ) : null}
            </div>
        );
    }
);

InputBox.displayName = 'InputBox';
