import React from 'react';
import { AlertCircle } from 'lucide-react';
import { InputProps } from '../../types/ui';
import { Text } from './Text';

export const InputBox: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    icon,
    className = '',
    id,
    disabled,
    ...props
}) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

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
                    id={inputId}
                    disabled={disabled}
                    className={`
            flex h-10 w-full rounded-md border bg-surface px-3 py-2 text-sm text-white shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 font-sans
            ${icon ? 'pl-9' : ''}
            ${error
                            ? 'border-red-900/50 focus-visible:border-red-500 focus-visible:ring-red-500/50 bg-red-950/10'
                            : 'border-border focus-visible:border-primary focus-visible:ring-primary'
                        }
          `}
                    {...props}
                />

                {error && typeof error === 'string' && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                        <AlertCircle size={16} />
                    </div>
                )}
            </div>

            {(error && typeof error === 'string') ? (
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