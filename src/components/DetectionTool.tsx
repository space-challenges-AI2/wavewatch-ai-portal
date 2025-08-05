import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Zap, Loader2, Ship, Activity, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DetectionResults {
  shipCount?: number;
  detectionProbabilities?: number[];
  processedImageUrl?: string;
}

const DetectionTool = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [outputOptions, setOutputOptions] = useState({
    shipCount: false,
    detectionProbability: false,
    processedImage: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<DetectionResults | null>(null);
  const { toast } = useToast();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        const url = URL.createObjectURL(file);
        setUploadedImageUrl(url);
        toast({
          title: "Image uploaded successfully",
          description: "SAR image ready for analysis",
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setUploadedImageUrl(url);
      toast({
        title: "Image uploaded successfully",
        description: "SAR image ready for analysis",
      });
    }
  }, [toast]);

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      toast({
        title: "No image uploaded",
        description: "Please upload a SAR image first",
        variant: "destructive",
      });
      return;
    }

    if (!outputOptions.shipCount && !outputOptions.detectionProbability && !outputOptions.processedImage) {
      toast({
        title: "No output selected",
        description: "Please select at least one output option",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setResults(null);
    
    try {
      // Prepare form data for FastAPI
      const formData = new FormData();
      formData.append('file', uploadedFile);
      
      // Map frontend options to backend Spanish option names
      const backendOptions: string[] = [];
      if (outputOptions.shipCount) {
        backendOptions.push('Número de Barcos');
      }
      if (outputOptions.detectionProbability) {
        backendOptions.push('Probabilidades de Detección');
      }
      if (outputOptions.processedImage) {
        backendOptions.push('Imagen con Detecciones');
      }
      
      // Add each option as a separate form field (FastAPI expects List[str])
      backendOptions.forEach(option => {
        formData.append('options', option);
      });
      
      // Make API call to Python backend
      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Handle error response from backend
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Map backend response to frontend format
      const apiResults: DetectionResults = {};
      
      if (data.count_result !== undefined) {
        apiResults.shipCount = data.count_result;
      }
      
      if (data.probabilities_result) {
        apiResults.detectionProbabilities = data.probabilities_result;
      }
      
      if (data.image_result) {
        apiResults.processedImageUrl = `data:image/jpeg;base64,${data.image_result}`;
      }
      
      setResults(apiResults);
      
      toast({
        title: "Analysis complete",
        description: "Ship detection analysis finished successfully",
      });
      
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Upload Section */}
      <Card className="cyber-card bg-card/30 backdrop-blur-md border-2 border-primary/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold">
            <div className="relative">
              <Upload className="h-6 w-6 text-primary animate-neon-pulse" />
              <div className="absolute inset-0 neon-glow blur-sm"></div>
            </div>
            <span className="glitch-text" data-text="Upload SAR Image">Upload SAR Image</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="relative border-2 border-dashed border-primary/50 rounded-2xl p-12 text-center hover:border-accent transition-all duration-300 cursor-pointer cyber-card group"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <div className="absolute inset-0 hologram-effect opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-2xl"></div>
            {uploadedImageUrl ? (
              <div className="space-y-6 relative z-10">
                <img 
                  src={uploadedImageUrl} 
                  alt="Uploaded SAR" 
                  className="max-h-64 mx-auto rounded-xl border-2 border-accent neon-glow"
                />
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-foreground">
                    {uploadedFile?.name}
                  </p>
                  <p className="text-accent font-mono text-sm">
                    FILE.LOADED → READY.FOR.ANALYSIS
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 relative z-10">
                <div className="relative mx-auto w-20 h-20">
                  <Upload className="h-20 w-20 text-primary/60 mx-auto animate-neon-pulse" />
                  <div className="absolute inset-0 neon-glow blur-lg opacity-50"></div>
                </div>
                <div className="space-y-3">
                  <p className="text-2xl font-bold text-foreground">
                    DROP SAR IMAGE HERE
                  </p>
                  <p className="text-accent font-mono uppercase tracking-wider">
                    // DRAG.DROP || CLICK.BROWSE
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Supported formats: JPG, PNG, TIFF
                  </div>
                </div>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Output Options */}
      <Card className="cyber-card bg-card/30 backdrop-blur-md border-2 border-secondary/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold">
            <Activity className="h-6 w-6 text-secondary animate-neon-pulse" />
            <span className="text-secondary">Neural Network Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="cyber-card bg-background/20 p-4 rounded-xl border border-primary/20">
              <div className="flex items-center space-x-3 mb-2">
                <Checkbox
                  id="ship-count"
                  checked={outputOptions.shipCount}
                  onCheckedChange={(checked) =>
                    setOutputOptions(prev => ({ ...prev, shipCount: checked as boolean }))
                  }
                  className="border-primary data-[state=checked]:bg-primary"
                />
                <label htmlFor="ship-count" className="flex items-center gap-3 cursor-pointer">
                  <Ship className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Ship Count</span>
                </label>
              </div>
              <p className="text-xs text-muted-foreground font-mono pl-6">
                COUNT.VESSELS → MARITIME.TRAFFIC
              </p>
            </div>
            
            <div className="cyber-card bg-background/20 p-4 rounded-xl border border-accent/20">
              <div className="flex items-center space-x-3 mb-2">
                <Checkbox
                  id="detection-prob"
                  checked={outputOptions.detectionProbability}
                  onCheckedChange={(checked) =>
                    setOutputOptions(prev => ({ ...prev, detectionProbability: checked as boolean }))
                  }
                  className="border-accent data-[state=checked]:bg-accent"
                />
                <label htmlFor="detection-prob" className="flex items-center gap-3 cursor-pointer">
                  <Activity className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Confidence Score</span>
                </label>
              </div>
              <p className="text-xs text-muted-foreground font-mono pl-6">
                PROBABILITY.MATRIX → AI.CERTAINTY
              </p>
            </div>
            
            <div className="cyber-card bg-background/20 p-4 rounded-xl border border-secondary/20">
              <div className="flex items-center space-x-3 mb-2">
                <Checkbox
                  id="processed-image"
                  checked={outputOptions.processedImage}
                  onCheckedChange={(checked) =>
                    setOutputOptions(prev => ({ ...prev, processedImage: checked as boolean }))
                  }
                  className="border-secondary data-[state=checked]:bg-secondary"
                />
                <label htmlFor="processed-image" className="flex items-center gap-3 cursor-pointer">
                  <ImageIcon className="h-5 w-5 text-secondary" />
                  <span className="font-semibold">Visual Output</span>
                </label>
              </div>
              <p className="text-xs text-muted-foreground font-mono pl-6">
                PROCESSED.IMAGE → DETECTION.OVERLAY
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analyze Button */}
      <div className="text-center py-8">
        <Button
          onClick={handleAnalyze}
          disabled={isProcessing || !uploadedFile}
          size="lg"
          className="px-16 py-6 text-xl font-bold neon-glow hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-6 w-6 mr-3 animate-spin" />
              <span className="font-mono">ANALYZING...</span>
            </>
          ) : (
            <>
              <Zap className="h-6 w-6 mr-3 lime-glow" />
              <span className="font-mono">INITIATE.SCAN</span>
            </>
          )}
        </Button>
      </div>

      {/* Results Display */}
      {(isProcessing || results) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <Card className="cyber-card bg-card/30 backdrop-blur-md border-2 border-primary/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-primary">
                <span className="font-mono">INPUT.DATA</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {uploadedImageUrl && (
                <div className="relative">
                  <img 
                    src={uploadedImageUrl} 
                    alt="Original SAR" 
                    className="w-full rounded-xl border-2 border-primary/50"
                  />
                  <div className="absolute inset-0 bg-primary/10 rounded-xl"></div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Processing Panel */}
          <Card className="cyber-card bg-card/30 backdrop-blur-md border-2 border-accent/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-accent">
                <span className="font-mono">PROCESSING.CORE</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
              {isProcessing ? (
                <div className="text-center space-y-6">
                  <div className="relative mx-auto w-20 h-20">
                    <div className="absolute inset-0 border-4 border-accent/30 rounded-full"></div>
                    <div className="absolute inset-0 border-t-4 border-accent rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-2 border-primary/50 rounded-full animate-ping"></div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-accent font-mono font-bold">NEURAL.ANALYSIS</p>
                    <p className="text-xs text-muted-foreground font-mono">YOLO.ENGINE.ACTIVE</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="relative mx-auto w-16 h-16">
                    <Activity className="h-16 w-16 text-accent lime-glow" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-accent font-mono font-bold">COMPLETE</p>
                    <p className="text-xs text-muted-foreground font-mono">READY.OUTPUT</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card className="cyber-card bg-card/30 backdrop-blur-md border-2 border-secondary/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-secondary">
                <span className="font-mono">OUTPUT.RESULTS</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isProcessing ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-2 border-secondary/50 rounded border-dashed animate-spin mx-auto"></div>
                    <p className="text-muted-foreground font-mono text-sm">COMPILING.DATA</p>
                  </div>
                </div>
              ) : results ? (
                <div className="space-y-6">
                  {results.processedImageUrl && (
                    <div className="relative">
                      <img 
                        src={results.processedImageUrl} 
                        alt="Processed" 
                        className="w-full rounded-xl border-2 border-secondary/50 neon-glow"
                      />
                      <div className="absolute top-2 right-2 bg-secondary/80 text-secondary-foreground px-2 py-1 rounded text-xs font-mono">
                        DETECTION.OVERLAY
                      </div>
                    </div>
                  )}
                  {results.shipCount !== undefined && (
                    <div className="cyber-card bg-primary/10 border border-primary/30 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-muted-foreground">VESSEL.COUNT</span>
                        <span className="text-2xl font-bold text-primary">{results.shipCount}</span>
                      </div>
                    </div>
                  )}
                  {results.detectionProbabilities && results.detectionProbabilities.length > 0 && (
                    <div className="space-y-3">
                      <p className="font-mono text-sm text-accent">CONFIDENCE.MATRIX</p>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {results.detectionProbabilities.map((confidence, index) => (
                          <div key={index} className="cyber-card bg-accent/10 border border-accent/20 p-3 rounded-lg">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-mono text-muted-foreground">VESSEL.{String(index + 1).padStart(2, '0')}</span>
                              <span className="font-bold text-accent">{(confidence * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground font-mono text-sm">AWAITING.DATA</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DetectionTool;