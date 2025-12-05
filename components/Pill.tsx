import React from 'react';
import { X } from 'lucide-react';

interface PillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  size?: 'sm' | 'md';
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ 
  label, 
  active = false, 
  onClick, 
  onRemove,
  size = 'md',
  className = ''
}) => {
  const baseStyles = "rounded-full transition-all duration-200 font-medium flex items-center justify-center whitespace-nowrap";
  
  // Design Tokens mapping
  // Inactive: bg-[#2c2c2c] (gray950), text-white
  // Active: border border-[#555555] (gray800), text-white (or brand color depending on specific context, but design shows white text with border for active nav)
  
  const sizeStyles = size === 'sm' 
    ? "px-3 py-1.5 text-[12px]" 
    : "px-6 py-2.5 text-[14px]";

  const stateStyles = active
    ? "bg-transparent border border-brand-gray800 text-brand-white"
    : "bg-brand-gray950 text-brand-gray600 hover:bg-opacity-80 hover:text-brand-white";
    
  // If it's a removable tag (like in active filters)
  const isRemovable = !!onRemove;
  const removableStyles = isRemovable 
    ? "pl-4 pr-2 flex items-center gap-2 border border-brand-gray800 bg-black text-xs uppercase tracking-wider" 
    : "";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${isRemovable ? removableStyles : `${sizeStyles} ${stateStyles}`} ${className}`}
      role={isRemovable ? "button" : "tab"}
      aria-selected={active}
      aria-label={onRemove ? `Remove filter ${label}` : label}
    >
      {label}
      {onRemove && (
        <span 
          role="button" 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="p-1 hover:text-brand-primary rounded-full transition-colors"
        >
          <X size={14} />
        </span>
      )}
    </button>
  );
};