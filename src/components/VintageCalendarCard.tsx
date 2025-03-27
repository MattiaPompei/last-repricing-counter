
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
        <div className="absolute w-full h-full bg-gradient-to-b from-white to-white/90 border border-black/10 rounded-md shadow-lg backface-hidden flex items-center justify-center transform rotate-x-0">
          <span className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E60000] to-[#FDC400] font-mono">
            {digit}
          </span>
          <div className="absolute bottom-0 w-full h-[1px] bg-black/10"></div>
          <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-60 pointer-events-none"></div>
          
          {/* Tech details */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-2 left-2 right-2 h-[1px] bg-black/5"></div>
            <div className="absolute bottom-2 left-2 right-2 h-[1px] bg-black/5"></div>
            <div className="absolute left-2 top-2 bottom-2 w-[1px] bg-black/5"></div>
            <div className="absolute right-2 top-2 bottom-2 w-[1px] bg-black/5"></div>
          </div>
        </div>
        
        {/* Back face */}
        <div className="absolute w-full h-full bg-gradient-to-b from-white to-white/90 border border-black/10 rounded-md shadow-lg backface-hidden flex items-center justify-center transform rotate-x-180">
          <span className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E60000] to-[#FDC400] font-mono">
            {digit}
          </span>
          <div className="absolute bottom-0 w-full h-[1px] bg-black/10"></div>
          <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-60 pointer-events-none"></div>
          
          {/* Tech details */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-2 left-2 right-2 h-[1px] bg-black/5"></div>
            <div className="absolute bottom-2 left-2 right-2 h-[1px] bg-black/5"></div>
            <div className="absolute left-2 top-2 bottom-2 w-[1px] bg-black/5"></div>
            <div className="absolute right-2 top-2 bottom-2 w-[1px] bg-black/5"></div>
          </div>
        </div>
      </div>
      
      {/* Card "holes" redesigned as tech accents */}
      <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gradient-to-r from-[#E60000] to-[#FDC400] shadow-[0_0_5px_rgba(230,0,0,0.5)]"></div>
      <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-r from-[#E60000] to-[#FDC400] shadow-[0_0_5px_rgba(230,0,0,0.5)]"></div>
    </div>
  );
};

export default VintageCalendarCard;
