
import React from 'react';
import { cn } from '../../../utils/cn';
import { Text } from '../Text';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    description?: string;
    cover?: React.ReactNode;
    footer?: React.ReactNode;
    hover?: boolean;
};

export const Card: React.FC<CardProps> = ({
    title,
    description,
    cover,
    footer,
    hover = false,
    className,
    children,
    ...props
}) => {
    const hasHeader = !!title || !!description;
    const hasCover = !!cover;
    const hasFooter = !!footer;

    return (
        <div
            className={cn(
                'w-full overflow-hidden rounded-lg border border-white/5 bg-surface shadow-sm ring-1 ring-white/5',
                hover && 'transition-all hover:-translate-y-0.5 hover:border-white/10 hover:shadow-md hover:ring-white/10',
                className
            )}
            {...props}
        >
            {hasCover && (
                <div className="relative">
                    {cover}

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/25 to-transparent" />
                </div>
            )}

            {(hasHeader || children) && (
                <div className={cn('px-4 py-4', hasCover && 'pt-3')}>
                    {hasHeader && (
                        <div className={cn('mb-3', !children && !hasFooter && 'mb-0')}>
                            {title && (
                                <Text
                                    variant="h4"
                                    className="text-white font-semibold"
                                >
                                    {title}
                                </Text>
                            )}

                        </div>
                    )}

                    {children}
                </div>
            )}

            {hasFooter && (
                <div className="flex items-center justify-end gap-2 border-t border-white/5 px-4 py-3">
                    {footer}
                </div>
            )}
        </div>
    );
};
