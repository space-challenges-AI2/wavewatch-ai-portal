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
          <div className="max-w-7xl mx-auto">
            <h1 className="text-8xl md:text-[12rem] font-light text-foreground mb-12 leading-tight tracking-tight">
              Wave<span className="text-primary font-medium">Track</span><span className="text-accent">.AI</span>
            </h1>
            
            {/* Company Description */}
            <div className="max-w-4xl mx-auto mb-16 space-y-8">
              <p className="text-3xl md:text-5xl text-muted-foreground leading-relaxed font-light">
                Advanced maritime vessel detection powered by deep learning neural networks
              </p>
              
              <div className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground/80 leading-relaxed space-y-4">
                <p>
                  WaveTrack.AI revolutionizes maritime surveillance through cutting-edge artificial intelligence. 
                  Our advanced deep learning algorithms analyze SAR (Synthetic Aperture Radar) imagery to detect 
                  and track vessels across vast ocean territories with unprecedented accuracy.
                </p>
                <p>
                  Trusted by maritime authorities, port operators, and defense agencies worldwide, 
                  we provide real-time vessel detection capabilities that enhance maritime security, 
                  environmental monitoring, and operational efficiency.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-10">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-accent/10 border border-accent/20 rounded-full text-accent text-xl backdrop-blur-sm">
                <div className="w-4 h-4 bg-accent rounded-full animate-soft-pulse"></div>
                Neural Network Online • Ready for Analysis
              </div>
              
              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
                <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-primary rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-2">99.2% Accuracy</h3>
                  <p className="text-muted-foreground text-center">Precise vessel detection with minimal false positives</p>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-accent rounded-full animate-soft-pulse"></div>
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-2">Real-Time Processing</h3>
                  <p className="text-muted-foreground text-center">Instant analysis of large SAR image datasets</p>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-secondary rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-2">Global Coverage</h3>
                  <p className="text-muted-foreground text-center">Comprehensive maritime surveillance worldwide</p>
                </div>
              </div>
              
              <Link to="/detection">
                <Button size="lg" className="text-xl px-12 py-8 bg-primary hover:bg-primary/90 text-primary-foreground interactive-button">
                  Try Detection Tool
                  <ArrowRight className="ml-3 h-6 w-6" />
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
