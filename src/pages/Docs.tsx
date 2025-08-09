import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { FileText, Github } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Docs = () => {
  const canonical = typeof window !== "undefined" ? window.location.href : "";
  const docsJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "WaveTrack.AI Documentation",
    url: canonical,
    description:
      "Documentation and resources for WaveTrack.AI, including a PDF whitepaper and GitHub repository.",
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Documentation | WaveTrack.AI</title>
        <meta
          name="description"
          content="Access the WaveTrack.AI PDF whitepaper and visit our GitHub repository."
        />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(docsJsonLd)}</script>
      </Helmet>
      <Navigation />
      <main className="pt-24">
        <header className="container mx-auto px-4 mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Documentation
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Find implementation guides, a downloadable whitepaper, and links to our codebase. These resources help you integrate WaveTrack.AI with your maritime workflows.
          </p>
        </header>

        <section className="container mx-auto px-4 grid gap-6 md:grid-cols-2">
          <article className="p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-foreground">PDF Whitepaper</h2>
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <p className="text-muted-foreground mb-6">
              Read our overview of the architecture, models, and recommended deployment patterns.
            </p>
            <a
              href="/docs/wavetrack-whitepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="rounded-full">
                View PDF
              </Button>
            </a>
          </article>

          <article className="p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-foreground">GitHub Repository</h2>
              <Github className="h-6 w-6 text-accent" />
            </div>
            <p className="text-muted-foreground mb-6">
              Explore the codebase, open issues, and contribute improvements to the project.
            </p>
            <a
              href="https://github.com/your-org/wavetrack-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="rounded-full">
                Visit GitHub
              </Button>
            </a>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Docs;
