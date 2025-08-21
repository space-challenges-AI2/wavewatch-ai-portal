import { Button } from "@/components/ui/button";
import { ArrowDown, Satellite, Waves } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden ocean-gradient"
    >
      {/* Subtle pattern overlays */}
      <div className="absolute inset-0 subtle-grid opacity-30" />
      <div className="absolute inset-0 floating-dots opacity-40" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className="space-y-12">
          {/* Clean logo design */}
          <div className="flex justify-center mb-16">
            <div className="relative animate-gentle-float">
              <div className="bg-white/80 backdrop-blur-sm rounded-full p-6 gentle-glow">
                <Satellite className="h-16 w-16 text-primary" />
                <Waves className="h-8 w-8 text-accent absolute -bottom-1 -right-1 opacity-80" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
              <span className="text-primary font-medium block mb-2">
                WaveTrack.AI
              </span>
              <span className="text-2xl md:text-3xl lg:text-4xl text-accent font-light">
                Maritime Intelligence from Space
              </span>
            </h1>

            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
                Advanced AI-powered ship detection using cutting-edge satellite imagery analysis. 
                Transform remote sensing data into actionable maritime intelligence with precision and speed.
              </p>
              
              {/* Clean feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="clean-card bg-white/50 backdrop-blur-sm p-6 text-center">
                  <div className="text-3xl font-light text-primary mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Detection Accuracy</div>
                </div>
                <div className="clean-card bg-white/50 backdrop-blur-sm p-6 text-center">
                  <div className="text-3xl font-light text-accent mb-2">&lt;2s</div>
                  <div className="text-sm text-muted-foreground">Processing Speed</div>
                </div>
                <div className="clean-card bg-white/50 backdrop-blur-sm p-6 text-center">
                  <div className="text-3xl font-light text-primary mb-2">Fast</div>
                  <div className="text-sm text-muted-foreground">Inference Speed</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="px-12 py-6 text-lg font-medium interactive-button bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Detection
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-12 py-6 text-lg interactive-button border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 animate-soft-pulse" />
    </section>
  );
};

export default HeroSection;