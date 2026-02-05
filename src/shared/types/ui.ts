import { ElementType, ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

export type TextVariant =
    | 'display-2xl'
    | 'display-xl' // Hero
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4' // Headings
    | 'body'
    | 'large'
    | 'small' // Body
    | 'label'
    | 'code'
    | 'mono'
    | 'tiny'; // Utilities

export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

export interface TextProps<T extends ElementType> {
    as?: T;
    variant?: TextVariant;
    weight?: TextWeight;
    gradient?: boolean;
    className?: string;
    children?: ReactNode;
}

// Button Types
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    asChild?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}


export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string | boolean;
    helperText?: string;
    icon?: React.ReactNode;
}

// Select/Dropdown Types
export interface DropdownItem<V = string> {
    label: string;
    value: V;
    description?: string;
    disabled?: boolean;
}

export interface SelectProps<V = string> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    label?: string;
    placeholder?: string;
    value?: V | null;
    onChange?: (value: V) => void;
    items?: DropdownItem<V>[];
    error?: string | boolean;
    helperText?: string;
    disabled?: boolean;
    isLoading?: boolean;
    hasMore?: boolean;
    onLoadMore?: () => void;
}

