import React from 'react';
import { cn } from '../../utils/cn'
import { TextProps, TextVariant } from '../../types/ui';

// Variant Logic: Maps logical variants to Tailwind classes (using system tokens)
// Variant Logic: Maps logical variants to Tailwind classes (Arbitrary Values for Precision)
const variantStyles: Record<TextVariant, string> = {
    // Hero & Display
    'display-2xl': 'font-display text-[4.5rem] leading-[1] tracking-[-0.04em] font-bold text-main',
    'display-xl': 'font-display text-[3.75rem] leading-[1.1] tracking-[-0.03em] font-bold text-main',

    // Headings
    h1: 'font-display text-[3rem] leading-[1.2] tracking-[-0.02em] font-semibold text-main',
    h2: 'font-display text-[2.25rem] leading-[1.2] tracking-[-0.02em] font-semibold text-main',
    h3: 'font-display text-[1.875rem] leading-[1.3] tracking-[-0.02em] font-medium text-main',
    h4: 'font-display text-[1.5rem] leading-[1.3] tracking-[-0.01em] font-medium text-main',

    // Body
    body: 'font-sans text-[1rem] leading-[1.6] tracking-[-0.01em] text-sub',
    large: 'font-sans text-[1.125rem] leading-[1.6] tracking-[-0.01em] text-sub',
    small: 'font-sans text-[0.875rem] leading-[1.5] text-muted',

    // Utilities
    label: 'font-mono text-[0.75rem] leading-[1] tracking-[0.05em] font-semibold uppercase text-muted',
    code: 'font-mono text-[0.875rem] leading-[1.5] bg-surfaceHighlight/50 px-1.5 py-0.5 rounded text-primary border border-white/5',
    mono: 'font-mono text-[0.875rem] leading-[1.5] text-current',
    tiny: 'font-mono text-[10px] leading-tight text-muted',
};

export const Text = <T extends React.ElementType = 'p'>({
    as,
    variant = 'body',
    weight,
    gradient = false,
    className = '',
    children,
    ...props
}: TextProps<T> & React.ComponentPropsWithoutRef<T>) => {
    const Component = as || mapVariantToTag(variant);

    // Gradient Logic: High-end Tech Vibe
    const gradientClass = gradient
        ? 'bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/50'
        : '';

    const finalClassName = cn(
        variantStyles[variant],
        weight && `font-${weight}`,
        gradientClass,
        className
    );

    return (
        <Component className={finalClassName} {...props}>
            {children}
        </Component>
    );
};

// Helper: Semantic HTML Tag Mapping
function mapVariantToTag(variant: TextVariant): React.ElementType {
    switch (variant) {
        case 'display-2xl':
        case 'display-xl':
        case 'h1':
            return 'h1';
        case 'h2':
            return 'h2';
        case 'h3':
            return 'h3';
        case 'h4':
            return 'h4';
        case 'label':
            return 'span';
        case 'code':
            return 'code';
        case 'small':
            return 'small';
        case 'tiny':
            return 'span';
        default:
            return 'p';
    }
}
