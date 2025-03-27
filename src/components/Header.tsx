
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-md shadow-soft" 
          : "bg-transparent"
      )}
    >
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5 text-white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-medium text-lg tracking-tight">Repricing Tracker</span>
        </div>
        <nav>
          <ul className="flex items-center space-x-8">
            <li>
              <Link 
                to="/"
                className="text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                Counter
              </Link>
            </li>
            <li>
              <Link 
                to="/home"
                className="text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Button 
                variant="outline"
                size="sm"
                className="rounded-full transition-all duration-300 hover:bg-primary hover:text-white border-primary/20"
              >
                Contact
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
