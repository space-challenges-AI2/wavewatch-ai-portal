import Navigation from "@/components/Navigation";
import DetectionTool from "@/components/DetectionTool";

const DetectionPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Detection Tool Section */}
      <section className="min-h-screen space-gradient relative overflow-hidden pt-20">
        <div className="absolute inset-0 subtle-grid opacity-20"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full animate-gentle-float"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-accent/80 rounded-full animate-gentle-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-secondary/70 rounded-full animate-gentle-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container mx-auto relative z-10 px-4 py-12">
          <DetectionTool />
        </div>
      </section>
    </div>
  );
};

export default DetectionPage;