export interface Load {
  id: string;
  badge?: string;
  price: number;
  distance: number;
  weight: number;
  loadedRPM: number;
  estTotalRPM: number;
  pickup: {
    city: string;
    state: string;
    date: string;
    time: string;
    liveLoad?: boolean;
    emptyMiles: number;
    address?: string;
    latitude?: number;
    longitude?: number;
  };
  delivery: {
    city: string;
    state: string;
    date: string;
    time: string;
    instructions: string[];
    emptyMiles: number;
    address?: string;
    latitude?: number;
    longitude?: number;
  };
  isReload?: boolean;
  requirements?: string[];
  equipmentType?: 'Van' | 'Reefer' | 'Flatbed';
}
