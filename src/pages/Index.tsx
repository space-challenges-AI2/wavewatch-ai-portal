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
      <section id="tool" className="py-24 space-gradient">
        <div className="absolute inset-0 subtle-grid opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              AI Detection <span className="text-primary font-medium">Laboratory</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              Upload your Synthetic Aperture Radar imagery and experience our advanced 
              neural network analyze maritime vessels with unparalleled precision.
            </p>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm">
                <div className="w-2 h-2 bg-accent rounded-full animate-soft-pulse"></div>
                System Online • Neural Network Active
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
