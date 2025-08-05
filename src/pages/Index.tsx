import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import DetectionTool from "@/components/DetectionTool";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      {/* Detection Tool Section */}
      <section id="tool" className="py-20 cyber-gradient floating-elements">
        <div className="absolute inset-0 neon-grid opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              <span className="glitch-text text-primary" data-text="AI Detection">AI Detection</span>
              <span className="text-accent"> Lab</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Upload SAR imagery and witness our next-generation YOLO AI analyze maritime vessels 
              with unprecedented precision and speed.
            </p>
            <div className="flex justify-center mt-8">
              <div className="px-6 py-2 bg-accent/20 border border-accent rounded-full text-accent font-mono text-sm">
                STATUS: ONLINE • NEURAL NETWORK ACTIVE
              </div>
            </div>
          </div>
          <DetectionTool />
        </div>
      </section>

      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
