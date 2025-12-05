import React from 'react';
import { Plus, Home } from 'lucide-react';
import { Pill } from './Pill';
import { TabConfig, TabId } from '../types';

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
  onAddClick: () => void;
}

const TABS: TabConfig[] = [
  { id: 'photos', label: 'Zdjęcia' },
  { id: 'videos', label: 'Filmy' },
  { id: 'sfx', label: 'SFX' },
  { id: 'materials', label: 'Materiały' },
  { id: 'elements', label: 'Elementy' },
  { id: 'reportages', label: 'Reportaże' },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onAddClick }) => {
  return (
    <header className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-container py-8 lg:py-12 gap-8 w-full bg-brand-black">
      {/* Logo Section */}
      <div className="flex items-center gap-6 self-start lg:self-auto">
        <div className="flex items-center gap-2 text-brand-white font-medium text-lg tracking-wide">
          <Home className="text-brand-primary fill-brand-primary" size={24} />
          <span>nieruchomosci-online.pl</span>
        </div>
        
        {/* Vertical Divider */}
        <div className="w-[1px] h-6 bg-brand-primary"></div>
        
        <span className="text-[25px] font-normal text-brand-white">Multimedia</span>
      </div>

      {/* Navigation & Actions */}
      <div className="flex items-center gap-8 self-end lg:self-auto w-full lg:w-auto justify-between lg:justify-end">
        <nav role="tablist" className="flex items-center gap-3 overflow-x-auto no-scrollbar mask-gradient">
          {TABS.map((tab) => (
            <Pill 
              key={tab.id}
              label={tab.label}
              active={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            />
          ))}
        </nav>

        <button 
          onClick={onAddClick}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-primary hover:bg-orange-500 transition-colors flex items-center justify-center text-brand-white shadow-lg"
          aria-label="Add new media"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>
    </header>
  );
};