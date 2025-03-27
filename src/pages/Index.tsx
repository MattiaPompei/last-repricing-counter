
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import EmailForm from "@/components/EmailForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Animation on scroll
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          setVisibleSections(prev => [...prev, entry.target.id]);
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const isSectionVisible = (id: string) => visibleSections.includes(id);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-white pointer-events-none" />
      
      {/* Background graphic elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[80%] bg-blue-100/20 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-3xl opacity-70" />
      </div>
      
      <Header />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="min-h-screen flex flex-col justify-center pt-20 pb-20"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center space-y-8 mt-8">
              <Badge 
                variant="outline" 
                className={`
                  rounded-full py-1 px-4 text-sm font-medium bg-white 
                  border-primary/20 text-primary mb-4 backdrop-blur-sm
                  transition-all duration-700 shadow-soft
                  ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}
                `}
              >
                Coming Soon
              </Badge>
              
              <h1 
                className={`
                  text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter 
                  transition-all duration-700 delay-100
                  ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}
                `}
              >
                The AI Assistant That <span className="text-primary">Understands</span> Your Data
              </h1>
              
              <p 
                className={`
                  text-xl md:text-2xl text-muted-foreground max-w-[800px] mx-auto
                  transition-all duration-700 delay-200
                  ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}
                `}
              >
                Insight AI transforms complex data into clear, actionable intelligence. 
                Join our waitlist for early access to the future of data analysis.
              </p>
              
              <div 
                className={`
                  w-full max-w-lg mx-auto pt-6 
                  transition-all duration-700 delay-300
                  ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}
                `}
              >
                <EmailForm />
              </div>
              
              <div 
                className={`
                  flex items-center justify-center space-x-4 mt-4
                  transition-all duration-700 delay-400
                  ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}
                `}
              >
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Watch Demo
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  Read Documentation
                </Button>
              </div>
            </div>
            
            <div 
              className={`
                mt-24 md:mt-32 lg:mt-40 relative max-w-5xl mx-auto
                transition-all duration-1000 delay-500
                ${isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}
              `}
            >
              <div className="relative z-10 bg-white/70 backdrop-blur-md rounded-xl shadow-soft overflow-hidden border border-border/50">
                <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-gray-100 to-gray-50 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                </div>
                <div className="pt-10 pb-6 px-6">
                  <div className="w-full h-[300px] bg-gray-100 rounded-lg animate-pulse-subtle flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -top-8 -left-8 w-28 h-28 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section 
          id="features" 
          className={`
            py-20 md:py-28 relative
            transition-all duration-1000
            ${isSectionVisible('features') ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Insight AI is designed to make complex data analysis simple and accessible for everyone
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Smart Data Analysis",
                  description: "Let our AI analyze your data and provide insights you might have missed.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  title: "Natural Language Queries",
                  description: "Ask questions about your data in plain English and get instant answers.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  title: "Intelligent Predictions",
                  description: "Utilize our advanced predictive models to forecast trends and make better decisions.",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.27 6.96L12 12.01L20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className={`
                    bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-soft border border-border/50
                    flex flex-col items-center text-center
                    transform transition-all duration-500 hover:scale-[1.02]
                    ${isSectionVisible('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section 
          id="about" 
          className={`
            py-20 md:py-28 bg-gray-50/80 relative
            transition-all duration-1000
            ${isSectionVisible('about') ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="space-y-4">
                  <Badge 
                    variant="outline" 
                    className="rounded-full py-1 px-4 text-sm font-medium border-primary/20 text-primary"
                  >
                    About Us
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Transforming Data Into Meaningful Insights
                  </h2>
                  <p className="text-muted-foreground">
                    At Insight AI, we're passionate about making advanced data analysis accessible 
                    to everyone. Our team of data scientists and AI experts have developed a 
                    revolutionary platform that simplifies complex data analysis.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Easily connect to any data source",
                      "Ask questions in natural language",
                      "Get insights without coding knowledge",
                      "Make data-driven decisions faster"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <svg 
                          className="w-5 h-5 mr-2 text-primary" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Button 
                      className="rounded-full px-8"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-white rounded-xl shadow-soft overflow-hidden relative border border-border/50">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <svg
                      className="w-24 h-24 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section 
          className={`
            py-20 md:py-28 relative
            transition-all duration-1000
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="container px-4 md:px-6">
            <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 relative overflow-hidden border border-primary/20">
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Ready to transform your data experience?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Join our waitlist today and be first to experience the next generation 
                  of AI-powered data analysis. Limited spots available for early access.
                </p>
                <EmailForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
