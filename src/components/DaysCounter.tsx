
import React, { useState, useEffect } from "react";
import VintageCalendarCard from "./VintageCalendarCard";

interface DaysCounterProps {
  lastEventDate: Date;
}

const DaysCounter: React.FC<DaysCounterProps> = ({ lastEventDate }) => {
  const [days, setDays] = useState<number>(0);
  const [flipping, setFlipping] = useState<boolean>(false);
  
  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastDate = new Date(lastEventDate);
      lastDate.setHours(0, 0, 0, 0);
      
      const differenceInTime = today.getTime() - lastDate.getTime();
      const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
      
      if (differenceInDays !== days) {
        setFlipping(true);
        setTimeout(() => setFlipping(false), 600);
        setDays(differenceInDays);
      }
    };
    
    calculateDays();
    const interval = setInterval(calculateDays, 1000 * 60 * 60); // Check every hour
    
    return () => clearInterval(interval);
  }, [lastEventDate, days]);
  
  // Convert days to digits
  const daysString = days.toString().padStart(3, '0');
  const digits = daysString.split('');
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center gap-2 md:gap-4">
        {digits.map((digit, index) => (
          <VintageCalendarCard 
            key={index} 
            digit={digit} 
            isFlipping={flipping}
          />
        ))}
      </div>
      <div className="mt-6 text-lg text-muted-foreground">
        days since last repricing
      </div>
    </div>
  );
};

export default DaysCounter;
