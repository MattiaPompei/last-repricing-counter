
import React, { useState } from "react";
import { Calendar, CalendarIcon, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import DaysCounter from "@/components/DaysCounter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const RepricingCounter: React.FC = () => {
  // Get stored values or use defaults
  const getStoredDate = () => {
    const storedDate = localStorage.getItem("lastRepricingDate");
    return storedDate ? new Date(storedDate) : new Date('2023-11-15');
  };

  const [lastRepricingDate, setLastRepricingDate] = useState<Date>(getStoredDate());
  const [datePickerDate, setDatePickerDate] = useState<Date | undefined>(getStoredDate());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateRepricingDate = () => {
    if (datePickerDate) {
      setLastRepricingDate(datePickerDate);
      localStorage.setItem("lastRepricingDate", datePickerDate.toISOString());
      setIsDialogOpen(false);
      toast.success("Repricing date updated successfully");
    }
  };

  const resetCounter = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setLastRepricingDate(today);
    setDatePickerDate(today);
    localStorage.setItem("lastRepricingDate", today.toISOString());
    toast.success("Counter reset to today");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Mesh background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mesh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 L40 20 M20 0 L20 40" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#mesh)" />
          </svg>
        </div>
      </div>
      
      {/* Gradient orbs for tech feel */}
      <div className="absolute top-[20%] right-[15%] w-64 h-64 rounded-full bg-blue-500/20 blur-[100px]"></div>
      <div className="absolute bottom-[20%] left-[15%] w-72 h-72 rounded-full bg-indigo-600/20 blur-[100px]"></div>
      <div className="absolute top-[40%] left-[20%] w-48 h-48 rounded-full bg-cyan-400/20 blur-[100px]"></div>
      
      <div className="w-full max-w-3xl mx-auto text-center relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-white bg-clip-text">
          Days Since Last Repricing
        </h1>
        
        <Card className="bg-white/5 backdrop-blur-md shadow-xl border-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none"></div>
          <CardContent className="p-8 flex flex-col items-center relative">
            <div className="relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-t-md"></div>
              <DaysCounter lastEventDate={lastRepricingDate} />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-sm text-slate-300">
          Last repriced on {lastRepricingDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 border-0 hover:from-blue-600 hover:to-indigo-700">
                <Calendar className="h-4 w-4" />
                Set Repricing Date
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-800/90 backdrop-blur-lg border border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Set Repricing Date</DialogTitle>
                <DialogDescription className="text-slate-300">
                  Choose the date of the last repricing event to update the counter.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-col space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal border-slate-700 bg-slate-900/50",
                            !datePickerDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {datePickerDate ? (
                            format(datePickerDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-slate-800 border border-slate-700" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={datePickerDate}
                          onSelect={setDatePickerDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <Button 
                  onClick={updateRepricingDate} 
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 border-0 hover:from-blue-600 hover:to-indigo-700"
                >
                  Update Date
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300" 
            onClick={resetCounter}
          >
            <RotateCcw className="h-4 w-4" />
            Reset Counter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RepricingCounter;
