import { Satellite, Waves } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Satellite className="h-6 w-6 text-accent animate-satellite" />
              <span className="text-lg font-bold text-foreground">WaveTrack.AI</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Maritime intelligence from space. Advanced AI-powered ship detection 
              using satellite imagery for global maritime monitoring.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Waves className="h-4 w-4 text-primary" />
              <span>Powered by Sentinel SAR satellites</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#tool" className="hover:text-primary transition-colors">
                  Detection Tool
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Technology</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>SAR Imagery</li>
              <li>YOLO AI Model</li>
              <li>Sentinel Satellites</li>
              <li>Real-time Processing</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 WaveTrack.AI. All rights reserved. Maritime intelligence redefined.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;