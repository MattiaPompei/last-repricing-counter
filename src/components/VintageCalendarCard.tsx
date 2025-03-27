
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VintageCalendarCardProps {
  digit: string;
  isFlipping?: boolean;
}

const VintageCalendarCard: React.FC<VintageCalendarCardProps> = ({
  digit,
  isFlipping = false,
}) => {
  const [flip, setFlip] = useState(false);
  
  useEffect(() => {
    if (isFlipping) {
      setFlip(true);
      const timer = setTimeout(() => setFlip(false), 600);
      return () => clearTimeout(timer);
    }
  }, [digit, isFlipping]);

  return (
    <div className="relative w-24 h-32 md:w-32 md:h-44">
      <div 
        className={cn(
          "absolute w-full h-full transform-style-3d transition-transform duration-600",
          flip ? "rotate-x-180" : ""
        )}
      >
        {/* Front face */}
        <div className="absolute w-full h-full bg-white border border-gray-300 rounded-md shadow-md backface-hidden flex items-center justify-center transform rotate-x-0">
          <span className="text-5xl md:text-7xl font-bold text-gray-800 font-mono">
            {digit}
          </span>
          <div className="absolute bottom-0 w-full h-[1px] bg-gray-300"></div>
          <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-gray-100 to-transparent opacity-30 pointer-events-none"></div>
        </div>
        
        {/* Back face */}
        <div className="absolute w-full h-full bg-white border border-gray-300 rounded-md shadow-md backface-hidden flex items-center justify-center transform rotate-x-180">
          <span className="text-5xl md:text-7xl font-bold text-gray-800 font-mono">
            {digit}
          </span>
          <div className="absolute bottom-0 w-full h-[1px] bg-gray-300"></div>
          <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-gray-100 to-transparent opacity-30 pointer-events-none"></div>
        </div>
      </div>
      
      {/* Calendar binding holes */}
      <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gray-800"></div>
      <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gray-800"></div>
    </div>
  );
};

export default VintageCalendarCard;
