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
        <section className="relative min-h-[92vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 space-gradient" />
          <div className="absolute inset-0 subtle-grid opacity-20" />
          <img
            src={heroImage}
            alt="Satellite SAR ocean background used by WaveTrack.AI detection"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            loading="eager"
          />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />

          <div className="relative z-10 container mx-auto px-4 py-28">
            <div className="max-w-5xl">
              <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground/80">Maritime AI Platform</p>
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Detect every vessel. From space.
                </span>
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground mb-10">
                Real-time vessel detection and analytics for SAR imagery—precise, reliable, and built to scale.
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

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Optimized for SAR</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-secondary" />
                  <span>Global coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span>Analyst-ready outputs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About + Features */}
        <section className="container mx-auto px-4 py-20">
          <article className="grid gap-6">
            <div className="p-8 rounded-3xl border border-border bg-card/70 backdrop-blur-md gentle-glow">
              <h2 className="text-3xl font-semibold mb-4 text-foreground">About WaveTrack.AI</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We build maritime domain awareness with advanced neural networks tailored for SAR. Analysts and operators rely on WaveTrack.AI for trustworthy detections and streamlined decisions—from port security to open-sea monitoring.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-md clean-card">
                <h3 className="text-xl font-semibold mb-2 text-foreground">High Precision</h3>
                <p className="text-muted-foreground">State-of-the-art models fine-tuned for SAR minimize false alarms while maintaining recall.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-md clean-card">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Real-time Ready</h3>
                <p className="text-muted-foreground">Low-latency inference designed to scale with continuous maritime operations.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-md clean-card">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Global Coverage</h3>
                <p className="text-muted-foreground">Works across diverse oceanic environments and multi-source SAR providers.</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-md clean-card">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Open Collaboration</h3>
                <p className="text-muted-foreground">Clear documentation and guidance to integrate with your workflows.</p>
              </div>
            </div>
          </article>
        </section>

        {/* Quick Links */}
        <aside className="container mx-auto px-4 pb-24">
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="outline" className="rounded-full">
              <a
                href="/docs/wavetrack-whitepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open PDF Whitepaper (new tab)"
              >
                <FileText className="h-5 w-5" />
                View PDF Whitepaper
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a
                href="https://github.com/your-org/wavetrack-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit WaveTrack.AI on GitHub (new tab)"
              >
                <Github className="h-5 w-5" />
                Visit GitHub
              </a>
            </Button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Index;
