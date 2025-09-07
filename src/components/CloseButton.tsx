'use client';

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

export default function CloseButton({ onClick, className = '' }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}
