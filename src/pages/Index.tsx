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
      <section id="tool" className="py-20 space-gradient">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ship Detection <span className="text-primary">Tool</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your Synthetic Aperture Radar (SAR) image and let our advanced AI model 
              identify and analyze maritime vessels with precision.
            </p>
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
