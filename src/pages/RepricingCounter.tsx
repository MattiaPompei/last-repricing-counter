
import React from "react";
import DaysCounter from "@/components/DaysCounter";
import { Card, CardContent } from "@/components/ui/card";

const RepricingCounter: React.FC = () => {
  // Set this to your last repricing date
  const lastRepricingDate = new Date('2023-11-15');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
          Days Since Last Repricing
        </h1>
        
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-gray-200">
          <CardContent className="p-8 flex flex-col items-center">
            <div className="relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-red-600 rounded-t-md"></div>
              <DaysCounter lastEventDate={lastRepricingDate} />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-sm text-muted-foreground">
          Last repriced on {lastRepricingDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </div>
  );
};

export default RepricingCounter;
