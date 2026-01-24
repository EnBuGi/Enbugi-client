import React from 'react';
import { cn } from '../../utils/cn'
import { TextProps, TextVariant } from '../../types/ui';

// Variant Logic: Maps logical variants to Tailwind classes (using system tokens)
// Variant Logic: Maps logical variants to Tailwind classes
const variantStyles: Record<TextVariant, string> = {
    // Hero & Display
    'display-2xl': 'font-display text-7xl font-bold tracking-tighter text-main',
    'display-xl': 'font-display text-6xl font-bold tracking-tighter text-main',

    // Headings
    h1: 'font-display text-5xl font-semibold tracking-tight text-main', // 3rem
    h2: 'font-display text-4xl font-semibold tracking-tight text-main', // 2.25rem
    h3: 'font-display text-3xl font-medium tracking-tight text-main',   // 1.875rem
    h4: 'font-display text-2xl font-medium tracking-tight text-main',   // 1.5rem

    // Body
    body: 'font-sans text-base text-sub',
    large: 'font-sans text-lg text-sub',
    small: 'font-sans text-sm text-muted',

    // Utilities
    label: 'font-mono text-xs font-semibold uppercase tracking-wider text-muted',
    code: 'font-mono text-sm bg-surfaceHighlight/50 px-1.5 py-0.5 rounded text-primary border border-white/5',
    mono: 'font-mono text-sm text-current',
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
