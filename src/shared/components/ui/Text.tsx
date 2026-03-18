import React from 'react';

import { TextProps, TextVariant } from '../../types/ui';
import { cn } from '../../utils/cn';

// Variant Logic: Maps logical variants to Tailwind classes (using system tokens)
const variantStyles: Record<TextVariant, string> = {
  // Hero & Display
  'display-2xl': 'font-display text-display-2xl tracking-tighter text-main',
  'display-xl': 'font-display text-display-xl tracking-tighter text-main',

  // Headings
  h1: 'font-display text-heading-xl tracking-tight text-main',
  h2: 'font-display text-heading-lg tracking-tight text-main',
  h3: 'font-display text-heading-md tracking-tight text-main',
  h4: 'font-display text-heading-sm tracking-tight text-main',

  // Body
  body: 'font-sans text-body-base text-sub',
  large: 'font-sans text-body-lg text-sub',
  small: 'font-sans text-body-sm text-muted',

  // Utilities
  label: 'font-mono text-label uppercase tracking-normal text-muted',
  code: 'font-mono text-code bg-surfaceHighlight/50 px-1.5 py-0.5 rounded text-primary border border-white/5',
  mono: 'font-mono text-body-sm text-current',
  tiny: 'font-mono text-[10px] leading-tight text-muted',
};

// Helper: Semantic HTML Tag Mapping
const tagMap: Record<TextVariant, React.ElementType> = {
  'display-2xl': 'h1',
  'display-xl': 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  label: 'span',
  code: 'code',
  small: 'small',
  tiny: 'span',
  body: 'p',
  large: 'p',
  mono: 'span',
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
  const Tag = as || tagMap[variant] || 'p';

  // Gradient Logic: High-end Tech Vibe
  const gradientClass = gradient
    ? 'bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/50'
    : '';

  const finalClassName = cn(
    variantStyles[variant],
    weight && `font-${weight}`,
    gradientClass,
    className,
  );

  return (
    <Tag className={finalClassName} {...props}>
      {children}
    </Tag>
  );
};
