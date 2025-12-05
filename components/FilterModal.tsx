import React, { useEffect, useRef } from 'react';
import { FilterState } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onToggle: (category: keyof FilterState, value: string, subCategory?: keyof FilterState['contentType']) => void;
}

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6 last:mb-0">
    <h3 className="text-brand-gray600 text-sm mb-3 font-medium">{title}</h3>
    <div className="flex flex-col gap-3">
      {children}
    </div>
  </div>
);

const FilterRow: React.FC<{ label?: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-wrap items-center gap-3">
    {label && <span className="text-brand-gray600 text-xs w-20 shrink-0">{label}</span>}
    {children}
  </div>
);

const FilterOption: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 text-xs font-medium uppercase tracking-wide rounded-full border transition-all
      ${active 
        ? 'bg-brand-gray800 border-brand-gray600 text-brand-white' 
        : 'bg-transparent border-brand-gray800 text-brand-gray600 hover:border-brand-gray600'
      }
    `}
  >
    {label}
  </button>
);

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, filters, onToggle }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content - Positioned absolutely relative to the page flow or fixed */}
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filter options"
        className="fixed z-50 left-6 lg:left-[calc(108px+20px)] top-[240px] w-full max-w-md bg-[#2c2c2c]/95 backdrop-blur-xl border border-brand-gray900 rounded-[16px] shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200"
      >
        <FilterSection title="Typ treści">
          <FilterRow label="Ludzie">
            {['RODZINA', 'SINGIEL', 'STUDENT', 'SILVERS', 'PARA'].map(opt => (
              <FilterOption 
                key={opt} 
                label={opt} 
                active={filters.contentType.people.includes(opt)}
                onClick={() => onToggle('contentType', opt, 'people')}
              />
            ))}
          </FilterRow>
          <FilterRow label="Wnętrza">
            {['LOKALE', 'MIESZKANIA'].map(opt => (
              <FilterOption 
                key={opt} 
                label={opt} 
                active={filters.contentType.interiors.includes(opt)}
                onClick={() => onToggle('contentType', opt, 'interiors')}
              />
            ))}
          </FilterRow>
          <FilterRow label="Infrastruktura">
            {['DOM', 'BLOK', 'INWESTYCJA', 'DZIAŁKA'].map(opt => (
              <FilterOption 
                key={opt} 
                label={opt} 
                active={filters.contentType.infrastructure.includes(opt)}
                onClick={() => onToggle('contentType', opt, 'infrastructure')}
              />
            ))}
          </FilterRow>
        </FilterSection>

        <div className="h-[1px] bg-brand-gray900 w-full my-4" />

        <FilterSection title="Licencja">
          <FilterRow>
            {['STOCK', 'SESJA', 'KUPIONE'].map(opt => (
              <FilterOption 
                key={opt} 
                label={opt} 
                active={filters.license.includes(opt)}
                onClick={() => onToggle('license', opt)}
              />
            ))}
          </FilterRow>
        </FilterSection>

        <div className="h-[1px] bg-brand-gray900 w-full my-4" />

        <FilterSection title="Format">
          <FilterRow>
            {['1:1', '4:3', '16:9', 'INNE'].map(opt => (
              <FilterOption 
                key={opt} 
                label={opt} 
                active={filters.format.includes(opt)}
                onClick={() => onToggle('format', opt)}
              />
            ))}
          </FilterRow>
        </FilterSection>
      </div>
    </>
  );
};