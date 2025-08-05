import { Button } from "@/components/ui/button";
import { ArrowDown, Satellite, Waves } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-gradient floating-elements"
    >
      {/* Dynamic neon grid overlay */}
      <div className="absolute inset-0 neon-grid opacity-50" />
      
      {/* Hologram scanning effect */}
      <div className="absolute inset-0 hologram-effect" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="space-y-8">
          {/* Glitching logo with neon glow */}
          <div className="flex justify-center mb-12">
            <div className="relative animate-neon-pulse">
              <div className="absolute inset-0 neon-glow blur-xl"></div>
              <Satellite className="h-20 w-20 text-primary relative z-10" />
              <Waves className="h-10 w-10 text-accent absolute -bottom-3 -right-3 lime-glow" />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
              <span 
                className="glitch-text text-primary block mb-4" 
                data-text="WaveTrack.AI"
              >
                WaveTrack.AI
              </span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-light text-accent block">
                Next-Gen Maritime Intelligence
              </span>
            </h1>

            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                Revolutionary AI-powered ship detection using advanced YOLO algorithms. 
                Transform satellite imagery into real-time maritime intelligence.
              </p>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <div className="cyber-card bg-card/50 backdrop-blur-sm p-4 rounded-2xl">
                  <div className="text-accent font-bold text-lg">99.9%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="cyber-card bg-card/50 backdrop-blur-sm p-4 rounded-2xl">
                  <div className="text-primary font-bold text-lg">&lt;2s</div>
                  <div className="text-sm text-muted-foreground">Processing Time</div>
                </div>
                <div className="cyber-card bg-card/50 backdrop-blur-sm p-4 rounded-2xl">
                  <div className="text-secondary font-bold text-lg">24/7</div>
                  <div className="text-sm text-muted-foreground">Real-time</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="px-12 py-6 text-xl font-bold neon-glow hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90"
                onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Launch Detection
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-12 py-6 text-xl border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Tech
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-secondary animate-pulse" />
    </section>
  );
};

export default HeroSection;