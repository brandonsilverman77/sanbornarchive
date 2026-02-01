export interface MapImage {
  id: string;
  city: string;
  state: string;
  year: number;
  type: 'cover' | 'title';
  thumbnail: string;
  medium: string;
  full: string;
  width: number;
  height: number;
  aspectRatio: number;
  favorite?: boolean;
}

export interface PrintOption {
  id: string;
  label: string;
  description: string;
  basePrice: number;
}

export interface FrameOption {
  id: string;
  label: string;
  color: string;
  priceModifier: number;
}

export type FilterState = {
  type: 'all' | 'cover' | 'title';
  state: string | null;
  search: string;
  sortBy: 'city' | 'year' | 'state';
  sortOrder: 'asc' | 'desc';
  favoritesOnly: boolean;
};
