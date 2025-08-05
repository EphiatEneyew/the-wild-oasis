"use client"
import { createContext, useContext, useState } from 'react';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const defaultRange = { from: undefined, to: undefined };
  const [range, setRange] = useState(defaultRange);

  const resetRange = () => {
    setRange(defaultRange);
  };

  const value = {
    range,
    setRange,
    resetRange
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservaion = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservaion must be used within a RangeProvider');
  }
  return context;
};
