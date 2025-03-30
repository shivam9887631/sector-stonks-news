
import { Company } from '@/types/marketTypes';
import { companies } from './mockData';

export const fetchTopCompaniesBySector = async (sectorId: string, limit: number = 5): Promise<Company[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sectorCompanies = companies
        .filter(company => company.sectorId === sectorId)
        .slice(0, limit);
      resolve(sectorCompanies);
    }, 300);
  });
};

export const fetchAllCompanies = async (): Promise<Company[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(companies);
    }, 300);
  });
};
