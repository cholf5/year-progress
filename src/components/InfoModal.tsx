'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CloseButton from './CloseButton';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function InfoModal({ isOpen, onClose, title, content }: InfoModalProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsAnimating(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!shouldRender || typeof window === 'undefined') return null;

  return createPortal(
    <div
      className={`
        fixed inset-0 z-[10000] transition-all duration-350
        ${isAnimating 
          ? 'bg-black/50 backdrop-blur-sm' 
          : 'bg-black/0 backdrop-blur-none'
        }
      `}
      onClick={handleBackdropClick}
    >
      <div className="flex items-center justify-center min-h-full p-4" onClick={handleBackdropClick}>
        <div
          className={`
            rounded-2xl shadow-2xl 
            max-w-4xl w-full max-h-[80vh] overflow-hidden
            transform transition-all duration-350
            ${isAnimating 
              ? 'scale-100 opacity-100' 
              : 'scale-95 opacity-0'
            }
          `}
          style={{
            backgroundColor: 'var(--modal-bg-color, #ffffff)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 模态窗头部 */}
          <div className="flex justify-center items-center p-6 border-b border-gray-200 dark:border-gray-700 relative">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <CloseButton onClick={onClose} className="absolute right-6" />
          </div>

          {/* 模态窗内容 */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div 
                className="leading-relaxed whitespace-pre-line"
                style={{
                  color: 'var(--modal-text-color, #374151)'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: content.replace(/\n/g, '<br>').replace(/•/g, '&bull;') 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
