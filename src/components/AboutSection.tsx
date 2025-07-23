import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Satellite, Brain, Radar, Globe } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 space-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            About <span className="text-primary">WaveTrack.AI</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're pioneering the future of maritime intelligence by combining cutting-edge satellite 
            technology with advanced artificial intelligence to monitor and analyze global shipping traffic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
            <CardHeader className="text-center">
              <Satellite className="h-12 w-12 text-accent mx-auto mb-4 animate-satellite" />
              <CardTitle className="text-lg">Sentinel Satellites</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Leveraging European Space Agency's Sentinel-1 satellites for comprehensive SAR imagery coverage
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
            <CardHeader className="text-center">
              <Radar className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-lg">SAR Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Synthetic Aperture Radar provides all-weather, day-night imaging capabilities for precise detection
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle className="text-lg">YOLO AI Model</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Our advanced YOLO neural network provides real-time object detection with exceptional accuracy
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
            <CardHeader className="text-center">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-lg">Global Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Monitor maritime activity across all major shipping lanes and coastal regions worldwide
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              WaveTrack.AI was founded with the vision of democratizing maritime intelligence. 
              By making advanced satellite-based ship detection accessible through our intuitive platform, 
              we empower researchers, maritime authorities, and organizations to gain unprecedented 
              insights into global shipping patterns.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our technology combines the power of space-based observation with state-of-the-art 
              machine learning to deliver accurate, real-time maritime intelligence that was previously 
              only available to major institutions with significant resources.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">The Technology</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-accent">Sentinel Satellites</h4>
                <p className="text-sm text-muted-foreground">
                  High-resolution SAR imagery from ESA's constellation provides comprehensive maritime coverage
                </p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold text-primary">Advanced AI Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Our custom-trained YOLO model delivers precision ship detection with confidence scoring
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-accent">Real-time Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Cloud-based processing enables rapid analysis and delivery of results
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;