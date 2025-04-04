
import React, { useState } from "react";
import { Calendar, CalendarIcon, RotateCcw, ArrowRight } from "lucide-react";
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
  
  const skipOneDay = () => {
    // Create a new date that's one day earlier than the current repricing date
    const newDate = new Date(lastRepricingDate);
    newDate.setDate(newDate.getDate() - 1);
    setLastRepricingDate(newDate);
    setDatePickerDate(newDate);
    localStorage.setItem("lastRepricingDate", newDate.toISOString());
    toast.success("Skipped ahead one day");
  };
  
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Remove gradient orbs */}
      
      <div className="w-full max-w-3xl mx-auto text-center relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-black">
          Days Since Last Repricing
        </h1>
        
        <Card className="bg-white shadow-xl border-black/5 overflow-hidden">
          {/* Removed the colored tint background div that was here */}
          <CardContent className="p-8 flex flex-col items-center relative">
            <div className="relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-gradient-to-r from-[#E60000] to-[#FDC400] rounded-t-md"></div>
              <DaysCounter lastEventDate={lastRepricingDate} />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-sm text-black/70">
          Last repriced on {lastRepricingDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-8 flex items-center gap-2 bg-[#E60000] hover:bg-[#E60000]/90 border-0 text-white">
              <Calendar className="h-4 w-4" />
              Set Repricing Date
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border border-black/10">
            <DialogHeader>
              <DialogTitle className="text-black">Set Repricing Date</DialogTitle>
              <DialogDescription className="text-black/70">
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
                          "w-full justify-start text-left font-normal border-black/10 bg-white",
                          !datePickerDate && "text-black/50"
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
                    <PopoverContent className="w-auto p-0 bg-white border border-black/10" align="start">
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
                className="bg-[#E60000] hover:bg-[#E60000]/90 border-0 text-white"
              >
                Update Date
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button 
            className="flex items-center gap-2 bg-[#E60000] hover:bg-[#E60000]/90 border-0 text-white"
            onClick={() => setIsDialogOpen(true)}
          >
            <Calendar className="h-4 w-4" />
            Set Repricing Date
          </Button>

          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-[#FDC400] bg-white hover:bg-white/90 text-black/70" 
            onClick={resetCounter}
          >
            <RotateCcw className="h-4 w-4" />
            Reset Counter
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-[#FDC400] bg-white hover:bg-white/90 text-black/70" 
            onClick={skipOneDay}
          >
            <ArrowRight className="h-4 w-4" />
            Skip One Day
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RepricingCounter;
