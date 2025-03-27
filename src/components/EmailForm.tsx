
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, you would send the email to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Thank you for your interest! We'll keep you updated.", {
        description: "You'll be among the first to know when we launch.",
      });
      
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md mx-auto relative animate-fade-up"
      style={{ animationDelay: "0.2s" }}
    >
      <div 
        className={`
          relative flex items-center transition-all duration-300 ease-out
          ${isFocused ? 'transform scale-[1.02]' : ''}
        `}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full"></div>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-1 bg-transparent border border-border/50 rounded-l-full rounded-r-none h-14 pl-6 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 relative z-10"
          required
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Button 
          type="submit" 
          className="rounded-r-full rounded-l-none h-14 px-8 text-base font-medium relative z-10 transition-all duration-300 hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Joining
            </div>
          ) : (
            "Join Waitlist"
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-3 text-center">
        We respect your privacy. No spam, ever.
      </p>
    </form>
  );
};

export default EmailForm;
