'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-[calc(100%-2rem)] md:max-w-[calc(100%-4rem)]',
};

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className,
  size = 'md' 
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className={cn(
        "relative w-full bg-surfaceStrong border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200",
        sizeClasses[size],
        className
      )}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-surfaceHighlight/50">
            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-sub hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        )}
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto max-h-[85vh]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
