'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { SelectProps, DropdownItem } from '@/shared/types/ui';
import { cn } from '@/shared/utils/cn';
import { Text } from '../Text';

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
    (
        {
            label,
            placeholder = '선택하기',
            value = null,
            onChange,
            items = [],
            error = false,
            helperText,
            disabled = false,
            isLoading = false,
            hasMore = false,
            onLoadMore,
            className = '',
            ...props
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = React.useState(false);
        const containerRef = React.useRef<HTMLDivElement>(null);
        const dropdownRef = React.useRef<HTMLDivElement>(null);

        // 선택된 항목 찾기
        const selectedItem = items.find((item) => item.value === value);

        // 외부 클릭 처리
        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    containerRef.current &&
                    !containerRef.current.contains(event.target as Node)
                ) {
                    setIsOpen(false);
                }
            };

            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
                return () => {
                    document.removeEventListener('mousedown', handleClickOutside);
                };
            }
        }, [isOpen]);

        // ESC 키 처리
        React.useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape' && isOpen) {
                    setIsOpen(false);
                }
            };

            if (isOpen) {
                document.addEventListener('keydown', handleKeyDown);
                return () => {
                    document.removeEventListener('keydown', handleKeyDown);
                };
            }
        }, [isOpen]);

        // 드롭다운 스크롤 처리
        const handleDropdownScroll = (e: React.UIEvent<HTMLDivElement>) => {
            const element = e.currentTarget;
            const isNearBottom =
                element.scrollHeight - element.scrollTop - element.clientHeight <
                50;

            if (isNearBottom && hasMore && onLoadMore) {
                if (!isLoading) {
                    onLoadMore();
                }
            }
        };

        const handleSelect = (item: DropdownItem) => {
            if (!item.disabled) {
                onChange?.(item.value);
                setIsOpen(false);
            }
        };

        const isErrorState = error === true || (typeof error === 'string' && error);

        const triggerClasses = cn(
            'w-full min-w-0 px-4 py-2.5 rounded-lg',
            'bg-surface border border-border transition-all',
            'flex items-center justify-between gap-2',
            'text-sm text-white',
            'focus:outline-none focus:ring-1 focus:ring-primary',
            isErrorState &&
            'border-brand-red-500 focus:ring-brand-red-500 bg-red-950/10',
            disabled && 'opacity-50 cursor-not-allowed',
            !disabled && !isOpen && 'cursor-pointer hover:border-border-light',
            isOpen && 'border-primary ring-1 ring-primary/30',
            className
        );

        return (
            <div
                ref={ref || containerRef}
                className={cn('w-full', { 'pointer-events-none': disabled })}
            >
                {label && (
                    <Text
                        variant="label"
                        as="label"
                        className="mb-2 block text-muted font-semibold"
                    >
                        {label}
                    </Text>
                )}

                <div
                    ref={containerRef}
                    className="relative"
                    {...props}
                >
                    <button
                        type="button"
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        className={triggerClasses}
                        disabled={disabled}
                        aria-expanded={isOpen}
                        aria-haspopup="listbox"
                    >
                        <span className="flex-1 text-left h-6 relative">
                            <span className="text-muted truncate block invisible">
                                {placeholder}
                            </span>
                            {selectedItem ? (
                                <span className="text-white truncate block absolute top-0 left-0 right-0">
                                    {selectedItem.label}
                                </span>
                            ) : (
                                <span className="text-muted truncate block absolute top-0 left-0 right-0">
                                    {placeholder}
                                </span>
                            )}
                        </span>

                        <ChevronDown
                            className={cn(
                                'h-5 w-5 text-muted transition-transform duration-200',
                                isOpen && 'rotate-180'
                            )}
                        />
                    </button>

                    {isOpen && (
                        <div
                            ref={dropdownRef}
                            className={cn(
                                'absolute top-full left-0 right-0 z-50 mt-1',
                                'w-full bg-surface border border-border rounded-lg',
                                'shadow-lg overflow-hidden'
                            )}
                        >
                            <div
                                className="max-h-64 overflow-y-auto"
                                onScroll={handleDropdownScroll}
                                role="listbox"
                            >
                                {items.length === 0 ? null : (
                                    items.map((item, index) => (
                                        <button
                                            key={`${item.value}-${index}`}
                                            type="button"
                                            onClick={() => handleSelect(item)}
                                            disabled={item.disabled}
                                            className={cn(
                                                'w-full px-4 py-3',
                                                'text-left text-sm transition-colors',
                                                'border-b border-border/50 last:border-b-0',
                                                'flex items-start justify-between gap-2',
                                                item.disabled
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'cursor-pointer',
                                                value === item.value
                                                    ? 'bg-primary/10 text-white'
                                                    : 'text-white hover:bg-surfaceHighlight'
                                            )}
                                            role="option"
                                            aria-selected={
                                                value === item.value
                                            }
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold truncate">
                                                    {item.label}
                                                </div>
                                                {item.description && (
                                                    <div className="text-xs text-muted mt-1 truncate">
                                                        {item.description}
                                                    </div>
                                                )}
                                            </div>


                                        </button>
                                    ))
                                )}

                                {isLoading && (
                                    <div className="px-4 py-3 text-center text-sm text-muted border-t border-border/50">
                                        로딩 중...
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {isErrorState && (typeof error === 'string' || helperText) && (
                    <div
                        className={cn(
                            'mt-2 text-xs',
                            typeof error === 'string' ? 'text-brand-red-500' : ''
                        )}
                    >
                        {typeof error === 'string' && error}
                        {error === true && helperText && (
                            <span className="text-brand-red-500">
                                {helperText}
                            </span>
                        )}
                    </div>
                )}
                {!isErrorState && helperText && (
                    <div className="mt-2 text-xs text-muted">{helperText}</div>
                )}
            </div>
        );
    }
);
