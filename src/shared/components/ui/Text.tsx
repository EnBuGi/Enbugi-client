import React from 'react';
import { TextProps, TextVariant } from '../../types/ui';

// Variant Logic: Maps logical variants to Tailwind classes (using system tokens)
const variantStyles: Record<TextVariant, string> = {
    // Hero & Display
    'display-2xl': "font-display text-display-2xl tracking-tighter text-main",
    'display-xl': "font-display text-display-xl tracking-tighter text-main",

    // Headings
    h1: "font-display text-heading-xl tracking-tight text-main",
    h2: "font-display text-heading-lg tracking-tight text-main",
    h3: "font-display text-heading-md tracking-tight text-main",
    h4: "font-display text-heading-sm tracking-tight text-main",

    // Body
    body: "font-sans text-body-base text-sub",
    large: "font-sans text-body-lg text-sub",
    small: "font-sans text-body-sm text-muted",

    // Utilities
    label: "font-mono text-label uppercase tracking-widest text-muted",
    code: "font-mono text-code bg-surfaceHighlight/50 px-1.5 py-0.5 rounded text-primary border border-white/5",
    tiny: "font-mono text-[10px] leading-tight text-muted",
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
        ? "bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/50"
        : "";

    const finalClassName = `
    ${variantStyles[variant]}
    ${weight ? `font-${weight}` : ''}
    ${gradientClass}
    ${className}
  `.trim();

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
        case 'h1': return 'h1';
        case 'h2': return 'h2';
        case 'h3': return 'h3';
        case 'h4': return 'h4';
        case 'label': return 'span';
        case 'code': return 'code';
        case 'small': return 'small';
        case 'tiny': return 'span';
        default: return 'p';
    }
}
