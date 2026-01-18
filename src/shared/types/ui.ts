import { ElementType, ReactNode, InputHTMLAttributes } from 'react';

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


export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;

  /** string이면 메시지 출력하고 true면 스타일만 */

  error?: string | boolean;
  icon?: ReactNode;

  className?: string;
  inputClassName?: string;
}
