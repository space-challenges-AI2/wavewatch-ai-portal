import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10"></div>
        <div className="absolute inset-0 subtle-grid opacity-20"></div>
        <div className="absolute inset-0 floating-dots opacity-30"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full animate-gentle-float"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-accent/80 rounded-full animate-gentle-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-secondary/70 rounded-full animate-gentle-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary/40 rounded-full animate-gentle-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent/50 rounded-full animate-gentle-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Centered Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="container mx-auto text-center px-4">
            {/* Main Title with Enhanced Design */}
            <div className="mb-20">
              <div className="relative inline-block">
                <h1 className="text-9xl md:text-[14rem] font-light text-foreground mb-6 leading-tight tracking-tight">
                  Wave<span className="text-primary font-medium">Track</span><span className="text-accent">.AI</span>
                </h1>
                
                {/* Glowing effects around title */}
                <div className="absolute -inset-10 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 blur-3xl opacity-60 animate-subtle-scale"></div>
              </div>
              
              {/* Subtitle with animation */}
              <div className="max-w-5xl mx-auto space-y-6">
                <p className="text-4xl md:text-6xl text-muted-foreground leading-relaxed font-light animate-fade-in">
                  Advanced maritime vessel detection powered by 
                  <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-medium"> deep learning</span>
                </p>
                
                <div className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full opacity-60"></div>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="mb-16">
              <div className="inline-flex items-center gap-4 px-10 py-5 bg-white/20 border border-accent/30 rounded-full text-accent text-2xl backdrop-blur-md gentle-glow">
                <div className="relative">
                  <div className="w-6 h-6 bg-accent rounded-full animate-soft-pulse"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-accent rounded-full animate-ping opacity-30"></div>
                </div>
                Neural Network Online • Ready for Analysis
              </div>
            </div>
            
            {/* Enhanced Description */}
            <div className="max-w-4xl mx-auto mb-20 space-y-8">              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg md:text-xl text-muted-foreground/90 leading-relaxed">
                <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 clean-card">
                  <h3 className="text-2xl font-medium text-primary mb-4">Cutting-Edge Technology</h3>
                  <p>
                    WaveTrack.AI revolutionizes maritime surveillance through advanced artificial intelligence. 
                    Our deep learning algorithms analyze SAR imagery to detect vessels with unprecedented accuracy.
                  </p>
                </div>
                
                <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 clean-card">
                  <h3 className="text-2xl font-medium text-accent mb-4">Global Trust</h3>
                  <p>
                    Trusted by maritime authorities, port operators, and defense agencies worldwide, 
                    we provide real-time capabilities that enhance security and operational efficiency.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Enhanced Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
              <div className="group">
                <div className="flex flex-col items-center p-8 bg-gradient-to-br from-white/20 to-white/10 rounded-3xl backdrop-blur-sm border border-primary/30 clean-card">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-10 h-10 bg-primary rounded-full shadow-lg"></div>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">99.2% Accuracy</h3>
                  <p className="text-muted-foreground text-center text-lg">Precise vessel detection with minimal false positives across all weather conditions</p>
                </div>
              </div>
              
              <div className="group">
                <div className="flex flex-col items-center p-8 bg-gradient-to-br from-white/20 to-white/10 rounded-3xl backdrop-blur-sm border border-accent/30 clean-card">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-10 h-10 bg-accent rounded-full animate-soft-pulse shadow-lg"></div>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Real-Time Processing</h3>
                  <p className="text-muted-foreground text-center text-lg">Instant analysis of large SAR image datasets with lightning-fast response times</p>
                </div>
              </div>
              
              <div className="group">
                <div className="flex flex-col items-center p-8 bg-gradient-to-br from-white/20 to-white/10 rounded-3xl backdrop-blur-sm border border-secondary/30 clean-card">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-10 h-10 bg-secondary rounded-full shadow-lg"></div>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Global Coverage</h3>
                  <p className="text-muted-foreground text-center text-lg">Comprehensive maritime surveillance worldwide with 24/7 monitoring capabilities</p>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="space-y-8">
              <Link to="/detection">
                <Button size="lg" className="text-2xl px-16 py-10 bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-full shadow-2xl hover:shadow-primary/40 interactive-button transform hover:scale-105 transition-all duration-300">
                  <span className="flex items-center gap-4">
                    Try Detection Tool
                    <ArrowRight className="h-8 w-8" />
                  </span>
                </Button>
              </Link>
              
              <p className="text-muted-foreground/80 text-lg">
                Experience the future of maritime surveillance technology
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
