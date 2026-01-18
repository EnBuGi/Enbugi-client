import React from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonProps } from '../../types/ui';
import { Text } from './Text';
import { cn } from '@/shared/utils/cn';

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    isLoading,
    disabled,
    asChild,
    ...props
}) => {

    // Base styles
    const baseStyles = "inline-flex items-center justify-center rounded-md transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    // Variant styles
    const variants = {
        primary: "bg-primary text-white hover:bg-primaryHover shadow-glow border border-transparent",
        secondary: "bg-transparent border border-border text-white hover:bg-surfaceHighlight hover:text-white",
        ghost: "bg-transparent hover:bg-surfaceHighlight text-muted hover:text-white",
        destructive: "bg-red-950/30 border border-red-900/50 text-red-500 hover:bg-red-900/50 hover:border-red-800",
        link: "text-primary underline-offset-4 hover:underline shadow-none border-none bg-transparent",
    };

    // Size styles
    const sizes = {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 py-2 text-sm",
        lg: "h-10 px-8 text-sm",
        icon: "h-9 w-9",
    };

    const finalClassName = cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
    );

    if (asChild) {
        return <span className={finalClassName}>{children}</span>;
    }

    return (
        <button
            className={finalClassName}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            <Text
                variant="mono"
                as="span"
                className={cn("text-current flex items-center gap-2", size === 'sm' ? "text-xs" : "text-sm")}
            >
                {children}
            </Text>
        </button>
    );
};
