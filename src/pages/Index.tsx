import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen space-gradient relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 subtle-grid opacity-20"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full animate-gentle-float"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-accent/80 rounded-full animate-gentle-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-secondary/70 rounded-full animate-gentle-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container mx-auto relative z-10 text-center px-4">
          {/* Centered Header */}
          <div className="max-w-6xl mx-auto">
            <h1 className="text-7xl md:text-9xl font-light text-foreground mb-16 leading-tight">
              Wave<span className="text-primary font-medium">Track</span><span className="text-accent">.AI</span>
            </h1>
            <p className="text-3xl md:text-4xl text-muted-foreground max-w-5xl mx-auto leading-relaxed mb-20">
              Advanced maritime vessel detection powered by deep learning neural networks
            </p>
            
            <div className="flex flex-col items-center gap-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 border border-accent/20 rounded-full text-accent text-lg">
                <div className="w-3 h-3 bg-accent rounded-full animate-soft-pulse"></div>
                Neural Network Online • Ready for Analysis
              </div>
              
              <Link to="/detection">
                <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Try Detection Tool
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
