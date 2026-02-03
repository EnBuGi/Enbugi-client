import { ElementType, ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, HTMLAttributes, } from 'react';

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


export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    cover?: ReactNode;
    footer?: ReactNode;
    hover?: boolean;
}
