import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Pill } from './Pill';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onOpenFilter: () => void;
  onRemoveFilter: (category: keyof FilterState, value: string, subCategory?: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onOpenFilter, onRemoveFilter }) => {
  // Flatten active filters for display
  const activeFilters: Array<{ label: string; remove: () => void }> = [];

  // Helper to push filters
  const pushFilters = (category: keyof FilterState, list: string[], subCat?: string) => {
    list.forEach(val => {
      activeFilters.push({
        label: val.toUpperCase(),
        remove: () => onRemoveFilter(category, val, subCat)
      });
    });
  };

  pushFilters('contentType', filters.contentType.people, 'people');
  pushFilters('contentType', filters.contentType.interiors, 'interiors');
  pushFilters('contentType', filters.contentType.infrastructure, 'infrastructure');
  pushFilters('license', filters.license);
  pushFilters('format', filters.format);

  return (
    <div className="px-6 lg:px-container mb-8 flex flex-col md:flex-row md:items-center gap-8">
      <h1 className="text-[36px] font-bold text-brand-white leading-none">Zdjęcia</h1>

      <div className="flex flex-wrap items-center gap-4">
        <button 
          onClick={onOpenFilter}
          className="flex items-center gap-2 px-6 py-3 bg-brand-gray950 hover:bg-brand-gray900 text-brand-white rounded-full transition-colors text-sm font-medium"
          aria-haspopup="dialog"
        >
          <SlidersHorizontal size={16} />
          <span>Filtruj</span>
        </button>

        {activeFilters.length > 0 && (
            <div className="w-[1px] h-8 bg-brand-gray900 mx-2 hidden md:block"></div>
        )}

        <div className="flex flex-wrap gap-3" aria-live="polite">
          {activeFilters.map((filter, idx) => (
            <Pill 
              key={`${filter.label}-${idx}`}
              label={filter.label}
              onRemove={filter.remove}
              className="border-brand-gray800"
            />
          ))}
        </div>
      </div>
    </div>
  );
};