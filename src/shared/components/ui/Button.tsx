import React from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonProps, ButtonSize } from '../../types/ui'; // ButtonSize imported for typing
import { Text } from './Text';
import { cn } from '../../utils/cn';

// Helper to determine icon size based on button size
const iconSizes: Record<ButtonSize, string> = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
    icon: "h-4 w-4",
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    isLoading,
    disabled,
    asChild,
    leftIcon,
    rightIcon,
    ...props
}) => {

    // Base styles
    // Added gap-2 for consistent spacing between icon and text
    const baseStyles = "inline-flex items-center justify-center rounded-md transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] gap-2";

    // Variant styles
    const variants = {
        primary: "bg-primary text-white hover:bg-primaryHover shadow-glow border border-transparent",
        secondary: "bg-transparent border border-border text-white hover:bg-surfaceHighlight hover:text-white",
        ghost: "bg-transparent hover:bg-surfaceHighlight text-muted hover:text-white",
        destructive: "bg-red-950/30 border border-red-900/50 text-red-500 hover:bg-red-900/50 hover:border-red-800",
        link: "text-white underline-offset-4 hover:underline shadow-none border-none bg-transparent",
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

    // Icon 크기 조절을 위한 Wrapper 
    const IconWrapper = ({ icon }: { icon: React.ReactNode }) => {
        if (!React.isValidElement(icon)) return null;
        return React.cloneElement(icon as React.ReactElement<any>, {
            className: cn(iconSizes[size], (icon.props as any).className)
        });
    };

    return (
        <button
            className={finalClassName}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <Loader2 className={cn("animate-spin", iconSizes[size])} />
            ) : (
                leftIcon && <IconWrapper icon={leftIcon} />
            )}

            <Text
                variant="mono"
                as="span"
                className={cn("text-current leading-none", size === 'sm' ? "text-xs" : "text-sm")}
            >
                {children}
            </Text>

            {rightIcon && <IconWrapper icon={rightIcon} />}
        </button>
    );
};
