"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

export interface NatNalData {
  date: string;
  time: string;
  city: string;
  state: string;
}

interface NatNalContextType {
  natNalData: NatNalData | null;
  setNatNalData: (data: NatNalData | null) => void;
}

const NatNalContext = createContext<NatNalContextType | undefined>(undefined);

export function NatNalProvider({ children }: { children: ReactNode }) {
  const [natNalData, setNatNalData] = useState<NatNalData | null>(null);

  console.log('🔵 NatNalProvider rendered, current data:', natNalData);

  return (
    <NatNalContext.Provider value={{ natNalData, setNatNalData }}>
      {children}
    </NatNalContext.Provider>
  );
}

export function useNatNal() {
  const context = useContext(NatNalContext);
  if (context === undefined) {
    throw new Error('useNatNal must be used within a NatNalProvider');
  }
  return context;
}

