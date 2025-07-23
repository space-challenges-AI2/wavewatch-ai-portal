import { Button } from "@/components/ui/button";
import { ArrowDown, Satellite, Waves } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px]" />
      
      {/* Animated radar grid overlay */}
      <div className="absolute inset-0 radar-grid opacity-30" />
      
      {/* Constellation dots */}
      <div className="absolute inset-0 constellation-dots" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="space-y-6">
          {/* Animated satellite icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Satellite className="h-16 w-16 text-accent animate-satellite" />
              <Waves className="h-8 w-8 text-primary absolute -bottom-2 -right-2 opacity-70" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            <span className="text-primary">WaveTrack.AI</span>
            <br />
            <span className="text-xl md:text-2xl lg:text-3xl font-normal text-accent">
              Maritime Intelligence from Space
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload your SAR image to detect and analyze maritime traffic with unparalleled accuracy. 
            Our advanced YOLO AI model transforms satellite data into actionable intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg satellite-glow"
              onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Try Detection Tool
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-primary/50 hover:border-primary"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>

      </div>

      {/* Wave animation sweep */}
      <div className="absolute bottom-0 left-0 w-full h-1 wave-animation" />
    </section>
  );
};

export default HeroSection;