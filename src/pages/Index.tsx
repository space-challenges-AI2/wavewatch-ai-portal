import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Github } from "lucide-react";
import heroImage from "@/assets/hero-background.jpg";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const canonical = typeof window !== "undefined" ? window.location.href : "";
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WaveTrack.AI",
    url: canonical,
    sameAs: ["https://github.com/your-org/wavetrack-ai"],
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>WaveTrack.AI — Maritime AI Vessel Detection</title>
        <meta
          name="description"
          content="WaveTrack.AI provides cutting-edge AI for maritime vessel detection with real-time analysis and global coverage."
        />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      </Helmet>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden min-h-[90vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
          <div className="absolute inset-0 subtle-grid opacity-20" />
          <img
            src={heroImage}
            alt="SAR ocean background for maritime AI detection"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="relative z-10 container mx-auto px-4 py-24">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-6">
                AI that sees every vessel. Everywhere.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10">
                WaveTrack.AI delivers reliable maritime domain awareness with deep learning optimized for SAR imagery—fast, accurate, and built for scale.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/detection">
                  <Button size="lg" className="rounded-full">
                    Try Detection Tool
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/docs">
                  <Button size="lg" variant="outline" className="rounded-full">
                    Read Documentation
                    <FileText className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Company Description + Features */}
        <section className="container mx-auto px-4 py-16">
          <article className="grid md:grid-cols-2 gap-10 items-start">
            <div className="p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-sm shadow-sm">
              <h2 className="text-3xl font-semibold mb-4 text-foreground">About WaveTrack.AI</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We specialize in maritime surveillance, using advanced neural networks to detect and track vessels in challenging conditions. Our platform powers analysts and operators with trustworthy insights, accelerating decision-making from port security to open-sea monitoring.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-primary/30 bg-white/10 clean-card">
                <h3 className="text-xl font-semibold mb-2 text-foreground">High Precision</h3>
                <p className="text-muted-foreground">State-of-the-art models fine-tuned for SAR increase detection precision while minimizing false alarms.</p>
              </div>
              <div className="p-6 rounded-2xl border border-accent/30 bg-white/10 clean-card">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Real-time Ready</h3>
                <p className="text-muted-foreground">Built for speed with scalable inference to keep up with continuous maritime operations.</p>
              </div>
              <div className="p-6 rounded-2xl border border-secondary/30 bg-white/10 clean-card">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Global Coverage</h3>
                <p className="text-muted-foreground">Designed for worldwide SAR sources and diverse oceanic environments.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Open Collaboration</h3>
                <p className="text-muted-foreground">We document our research and provide guidance to help integrate with your workflows.</p>
              </div>
            </div>
          </article>
        </section>

        {/* Quick Links */}
        <aside className="container mx-auto px-4 pb-20">
          <div className="flex flex-wrap gap-4">
            <a
              href="/docs/wavetrack-whitepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-full border border-primary/40 hover:shadow-md transition-shadow"
            >
              <FileText className="h-5 w-5 mr-2 text-primary" />
              View PDF Whitepaper
            </a>
            <a
              href="https://github.com/your-org/wavetrack-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-full border border-accent/40 hover:shadow-md transition-shadow"
            >
              <Github className="h-5 w-5 mr-2 text-accent" />
              Visit GitHub
            </a>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Index;
