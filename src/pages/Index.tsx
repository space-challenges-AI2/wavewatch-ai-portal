import DetectionTool from "@/components/DetectionTool";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with integrated tool */}
      <section className="min-h-screen space-gradient relative overflow-hidden">
        <div className="absolute inset-0 subtle-grid opacity-20"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full animate-gentle-float"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-accent/80 rounded-full animate-gentle-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-secondary/70 rounded-full animate-gentle-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container mx-auto relative z-10 pt-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-light text-foreground mb-8 leading-tight">
              Wave<span className="text-primary font-medium">Track</span><span className="text-accent">.AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Advanced maritime vessel detection powered by deep learning neural networks
            </p>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm">
                <div className="w-2 h-2 bg-accent rounded-full animate-soft-pulse"></div>
                Neural Network Online • Ready for Analysis
              </div>
            </div>
          </div>
          
          <DetectionTool />
        </div>
      </section>
    </div>
  );
};

export default Index;
