'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  closeText?: string;
}

export default function InfoModal({ isOpen, onClose, title, content, closeText = 'Close' }: InfoModalProps) {
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

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target?.classList.contains('modal-backdrop')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!shouldRender || typeof window === 'undefined') return null;

  return createPortal(
    <div
      className={`
        fixed inset-0 z-[10000] transition-all duration-350
        ${isAnimating 
          ? 'bg-black/50 backdrop-blur-sm' 
          : 'bg-black/0 backdrop-blur-none'
        }
        modal-backdrop
      `}
    >
      <div className="flex items-center justify-center min-h-full p-4">
        <div
          className={`
            bg-white dark:bg-gray-800 rounded-2xl shadow-2xl 
            max-w-4xl w-full max-h-[80vh] overflow-hidden
            transform transition-all duration-350
            ${isAnimating 
              ? 'scale-100 opacity-100' 
              : 'scale-95 opacity-0'
            }
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 模态窗头部 */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500 dark:text-gray-400"
                />
              </svg>
            </button>
          </div>

          {/* 模态窗内容 */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div 
                className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ 
                  __html: content.replace(/\n/g, '<br>').replace(/•/g, '&bull;') 
                }}
              />
            </div>
          </div>

          {/* 模态窗底部 */}
          <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
            >
              {closeText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
