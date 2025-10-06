import { useState, useEffect } from 'react';

export interface LandRecord {
  id: string;
  ownerName: string;
  fatherName: string;
  contact: string;
  aadhar?: string;
  surveyNumber: string;
  area: string;
  village: string;
  district: string;
  address: string;
  latitude?: string;
  longitude?: string;
  verified: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'bhumibandhu_land_records';

export const useLandRecords = () => {
  const [records, setRecords] = useState<LandRecord[]>([]);

  // Load records from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecords(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading records:', error);
      }
    }
  }, []);

  // Save records to localStorage whenever they change
  const saveToStorage = (newRecords: LandRecord[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords));
    setRecords(newRecords);
  };

  const addRecord = (record: Omit<LandRecord, 'id' | 'verified' | 'createdAt'>) => {
    const newRecord: LandRecord = {
      ...record,
      id: Date.now().toString(),
      verified: false,
      createdAt: new Date().toISOString(),
    };
    const newRecords = [...records, newRecord];
    saveToStorage(newRecords);
    return newRecord;
  };

  const updateRecord = (id: string, updates: Partial<LandRecord>) => {
    const newRecords = records.map(record =>
      record.id === id ? { ...record, ...updates } : record
    );
    saveToStorage(newRecords);
  };

  const deleteRecord = (id: string) => {
    const newRecords = records.filter(record => record.id !== id);
    saveToStorage(newRecords);
  };

  const getRecord = (id: string) => {
    return records.find(record => record.id === id);
  };

  return {
    records,
    addRecord,
    updateRecord,
    deleteRecord,
    getRecord,
  };
};
