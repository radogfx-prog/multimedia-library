import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { ImageGrid } from './components/ImageGrid';
import { FilterModal } from './components/FilterModal';
import { FilterState, INITIAL_FILTERS, MediaItem, TabId } from './types';

// Mock Data Generator
const MOCK_ITEMS: MediaItem[] = [
  { id: '1', src: 'https://picsum.photos/400/600?random=1', alt: 'Woman looking at mirror', aspectRatio: '9:16', usageInfo: 'Social Media', metadata: { contentType: ['RODZINA'], license: 'STOCK', format: '9:16' } },
  { id: '2', src: 'https://picsum.photos/600/600?random=2', alt: 'Living room interior', aspectRatio: '1:1', usageInfo: 'Social Media', metadata: { contentType: ['MIESZKANIA', 'LOKALE'], license: 'SESJA', format: '1:1' } },
  { id: '3', src: 'https://picsum.photos/800/600?random=3', alt: 'Mother and daughter', aspectRatio: '4:3', usageInfo: 'Social Media', metadata: { contentType: ['RODZINA', 'PARA'], license: 'STOCK', format: '4:3' } },
  { id: '4', src: 'https://picsum.photos/400/500?random=4', alt: 'Person working', aspectRatio: '9:16', usageInfo: 'Social Media', metadata: { contentType: ['SINGIEL'], license: 'STOCK', format: '9:16' } },
  { id: '5', src: 'https://picsum.photos/400/600?random=5', alt: 'People hugging', aspectRatio: '9:16', usageInfo: 'Social Media', metadata: { contentType: ['RODZINA'], license: 'KUPIONE', format: '9:16' } },
  { id: '6', src: 'https://picsum.photos/800/450?random=6', alt: 'House garden', aspectRatio: '16:9', usageInfo: 'Social Media', metadata: { contentType: ['DOM', 'DZIAŁKA'], license: 'SESJA', format: '16:9' } },
  { id: '7', src: 'https://picsum.photos/600/600?random=7', alt: 'Father and son', aspectRatio: '1:1', usageInfo: 'Social Media', metadata: { contentType: ['RODZINA'], license: 'STOCK', format: '1:1' } },
  { id: '8', src: 'https://picsum.photos/800/450?random=8', alt: 'Kids running', aspectRatio: '16:9', usageInfo: 'Social Media', metadata: { contentType: ['RODZINA'], license: 'KUPIONE', format: '16:9' } },
  { id: '9', src: 'https://picsum.photos/800/450?random=9', alt: 'Attic room', aspectRatio: '16:9', usageInfo: 'INPON', metadata: { contentType: ['MIESZKANIA'], license: 'SESJA', format: '16:9' } },
  { id: '10', src: 'https://picsum.photos/800/450?random=10', alt: 'Boy playing', aspectRatio: '16:9', usageInfo: 'INPON', metadata: { contentType: ['RODZINA'], license: 'STOCK', format: '16:9' } },
  { id: '11', src: 'https://picsum.photos/800/450?random=11', alt: 'Outdoor dining', aspectRatio: '16:9', usageInfo: 'Zimowa Kampania Brandowa 2024', metadata: { contentType: ['RODZINA', 'DOM'], license: 'SESJA', format: '16:9' } },
  { id: '12', src: 'https://picsum.photos/800/450?random=12', alt: 'Women talking in kitchen', aspectRatio: '16:9', usageInfo: 'Social Media', metadata: { contentType: ['PARA', 'SINGIEL'], license: 'STOCK', format: '16:9' } },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('photos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
     // Pre-setting some filters to match the design screenshot
     contentType: { people: ['RODZINA'], interiors: ['MIESZKANIA'], infrastructure: [] },
     license: [],
     format: ['16:9']
  });

  const handleToggleFilter = (
    category: keyof FilterState, 
    value: string, 
    subCategory?: keyof FilterState['contentType']
  ) => {
    setFilters(prev => {
      const newState = { ...prev };
      
      if (category === 'contentType' && subCategory) {
        const list = newState.contentType[subCategory];
        const index = list.indexOf(value);
        if (index > -1) {
           newState.contentType = {
             ...newState.contentType,
             [subCategory]: list.filter(item => item !== value)
           };
        } else {
           newState.contentType = {
             ...newState.contentType,
             [subCategory]: [...list, value]
           };
        }
      } else if (category !== 'contentType') {
        const list = newState[category] as string[];
        const index = list.indexOf(value);
        if (index > -1) {
          (newState[category] as string[]) = list.filter(item => item !== value);
        } else {
          (newState[category] as string[]) = [...list, value];
        }
      }
      return newState;
    });
  };

  const handleRemoveFilter = (category: keyof FilterState, value: string, subCategory?: string) => {
    // Re-use logic for removal
    handleToggleFilter(category, value, subCategory as keyof FilterState['contentType']);
  };

  const filteredItems = useMemo(() => {
    return MOCK_ITEMS.filter(item => {
      // 1. Content Type Filter
      const contentFilters = [
        ...filters.contentType.people,
        ...filters.contentType.interiors,
        ...filters.contentType.infrastructure
      ];
      
      const matchesContent = contentFilters.length === 0 || 
        item.metadata.contentType.some(type => contentFilters.includes(type));

      // 2. License Filter
      const matchesLicense = filters.license.length === 0 || 
        filters.license.includes(item.metadata.license);

      // 3. Format Filter
      const matchesFormat = filters.format.length === 0 || 
        filters.format.includes(item.metadata.format);

      return matchesContent && matchesLicense && matchesFormat;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-brand-black text-brand-white font-sans selection:bg-brand-primary selection:text-white">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onAddClick={() => console.log('Add clicked')} 
      />
      
      <FilterBar 
        filters={filters} 
        onOpenFilter={() => setIsFilterOpen(!isFilterOpen)} 
        onRemoveFilter={handleRemoveFilter}
      />
      
      <div className="relative">
         {/* 
            Positioning the Modal logic here to be visually connected 
            to the "Filtruj" button area in terms of DOM order, 
            though visually it uses fixed positioning 
         */}
         <FilterModal 
           isOpen={isFilterOpen} 
           onClose={() => setIsFilterOpen(false)} 
           filters={filters}
           onToggle={handleToggleFilter}
         />
         
         <ImageGrid items={filteredItems} />
      </div>
      
      {/* Decorative dots from footer of design */}
      <div className="flex justify-center gap-2 pb-12">
        <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
        <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
        <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
        <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
      </div>
    </div>
  );
};

export default App;