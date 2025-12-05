export interface FilterState {
  contentType: {
    people: string[];
    interiors: string[];
    infrastructure: string[];
  };
  license: string[];
  format: string[];
}

export interface MediaItem {
  id: string;
  src: string;
  alt: string;
  aspectRatio: '1:1' | '4:3' | '16:9' | '9:16';
  usageInfo: string;
  metadata: {
    contentType: string[];
    license: string;
    format: string;
  };
}

export type TabId = 'photos' | 'videos' | 'sfx' | 'materials' | 'elements' | 'reportages';

export interface TabConfig {
  id: TabId;
  label: string;
}

export const INITIAL_FILTERS: FilterState = {
  contentType: {
    people: [],
    interiors: [],
    infrastructure: []
  },
  license: [],
  format: []
};