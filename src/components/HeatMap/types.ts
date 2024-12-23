export interface TrainingData {
  month: number;
  day: number;
  value: number;
}

export interface HeatMapProps {
  data?: TrainingData[];
  colorScale?: string[];
}