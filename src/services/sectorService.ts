
import { Sector } from '@/types/marketTypes';
import { sectors } from './mockData';

export const fetchAllSectors = async (): Promise<Sector[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sectors);
    }, 300); // Simulate network delay
  });
};

export const fetchSectorById = async (sectorId: string): Promise<Sector | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sector = sectors.find(s => s.id === sectorId);
      resolve(sector);
    }, 300);
  });
};

export const fetchMarketAnalysis = async (sectorId: string) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      const sector = sectors.find(s => s.id === sectorId);
      resolve(sector?.marketAnalysis || {
        metrics: [],
        summary: "No market analysis available for this sector."
      });
    }, 300);
  });
};
