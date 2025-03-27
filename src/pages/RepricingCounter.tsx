
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

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Set Repricing Date
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Set Repricing Date</DialogTitle>
                <DialogDescription>
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
                            "w-full justify-start text-left font-normal",
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
                      <PopoverContent className="w-auto p-0" align="start">
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
                <Button onClick={updateRepricingDate} type="submit">Update Date</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="flex items-center gap-2" onClick={resetCounter}>
            <RotateCcw className="h-4 w-4" />
            Reset Counter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RepricingCounter;
