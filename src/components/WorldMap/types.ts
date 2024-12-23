export interface Location {
  id: string;
  coordinates: [number, number];
  name: string;
  medals: number;
  details?: string;
}

export interface WorldMapProps {
  data?: Location[];
  dotSize?: number;
  dotColor?: string;
}