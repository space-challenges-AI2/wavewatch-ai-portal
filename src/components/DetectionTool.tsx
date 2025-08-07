import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Zap, Loader2, Ship, Activity, Image as ImageIcon, Mic, Waves } from "lucide-react";
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Centered Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight tracking-wide">
          Upload your SAR image for <span className="text-primary font-medium">detection</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
          Detect maritime vessels with advanced AI neural networks
        </p>
      </div>

      {/* Central Upload Icon */}
      <div className="relative mb-16">
        {uploadedImageUrl ? (
          <div 
            className="group cursor-pointer"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <div className="relative">
              <img 
                src={uploadedImageUrl} 
                alt="Uploaded SAR image" 
                className="w-32 h-32 rounded-3xl object-cover border-4 border-primary/30 group-hover:border-primary/60 transition-all duration-500 shadow-2xl group-hover:shadow-primary/20"
              />
              <div className="absolute inset-0 bg-primary/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full border-4 border-white shadow-lg animate-soft-pulse"></div>
            </div>
          </div>
        ) : (
          <div
            className="group cursor-pointer relative"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl scale-150 opacity-50 group-hover:opacity-80 group-hover:scale-175 transition-all duration-700"></div>
            
            {/* Main icon container */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-white/40 to-white/20 rounded-full border-4 border-white/30 backdrop-blur-lg shadow-2xl group-hover:shadow-primary/30 group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
              <ImageIcon className="h-16 w-16 text-primary group-hover:text-accent transition-colors duration-300 animate-gentle-float group-hover:scale-110" />
              
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-ping" style={{animationDelay: '1s'}}></div>
            </div>
            
            {/* Floating particles */}
            <div className="absolute -top-4 -left-4 w-3 h-3 bg-primary/60 rounded-full animate-gentle-float"></div>
            <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-accent/60 rounded-full animate-gentle-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-2 -right-6 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-gentle-float" style={{animationDelay: '1.5s'}}></div>
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

      {/* Status text */}
      <div className="text-center mb-12">
        {uploadedImageUrl ? (
          <div className="space-y-2">
            <p className="text-xl font-medium text-foreground">
              {uploadedFile?.name}
            </p>
            <p className="text-accent font-medium">
              ✓ SAR image loaded • Click to replace
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-lg text-muted-foreground font-light">
              Click the icon or drag your SAR image here
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 border border-white/30 rounded-full text-muted-foreground text-sm backdrop-blur-sm">
              <div className="w-2 h-2 bg-accent/60 rounded-full animate-soft-pulse"></div>
              Formats: JPG, PNG, TIFF, GIF
            </div>
          </div>
        )}
      </div>

      {/* Output Options */}
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-foreground mb-2">
            Detection <span className="text-accent font-medium">options</span>
          </h2>
          <p className="text-muted-foreground">Customize the analysis output for your needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="group cursor-pointer">
            <div className="clean-card bg-white/40 p-6 rounded-2xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:bg-white/50">
              <div className="flex items-center space-x-3 mb-3">
                <Checkbox
                  id="ship-count"
                  checked={outputOptions.shipCount}
                  onCheckedChange={(checked) =>
                    setOutputOptions(prev => ({ ...prev, shipCount: checked as boolean }))
                  }
                  className="border-primary data-[state=checked]:bg-primary"
                />
                <label htmlFor="ship-count" className="flex items-center gap-3 cursor-pointer">
                  <Ship className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Ship count</span>
                </label>
              </div>
              <p className="text-sm text-muted-foreground pl-8">
                Total number of vessels detected in the image
              </p>
            </div>
          </div>
          
          <div className="group cursor-pointer">
            <div className="clean-card bg-white/40 p-6 rounded-2xl border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:bg-white/50">
              <div className="flex items-center space-x-3 mb-3">
                <Checkbox
                  id="detection-prob"
                  checked={outputOptions.detectionProbability}
                  onCheckedChange={(checked) =>
                    setOutputOptions(prev => ({ ...prev, detectionProbability: checked as boolean }))
                  }
                  className="border-accent data-[state=checked]:bg-accent"
                />
                <label htmlFor="detection-prob" className="flex items-center gap-3 cursor-pointer">
                  <Activity className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Detection probabilities</span>
                </label>
              </div>
              <p className="text-sm text-muted-foreground pl-8">
                Confidence scores for each detected vessel
              </p>
            </div>
          </div>
          
          <div className="group cursor-pointer">
            <div className="clean-card bg-white/40 p-6 rounded-2xl border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:bg-white/50">
              <div className="flex items-center space-x-3 mb-3">
                <Checkbox
                  id="processed-image"
                  checked={outputOptions.processedImage}
                  onCheckedChange={(checked) =>
                    setOutputOptions(prev => ({ ...prev, processedImage: checked as boolean }))
                  }
                  className="border-secondary data-[state=checked]:bg-secondary"
                />
                <label htmlFor="processed-image" className="flex items-center gap-3 cursor-pointer">
                  <ImageIcon className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Processed image</span>
                </label>
              </div>
              <p className="text-sm text-muted-foreground pl-8">
                SAR image with detection overlay and annotations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transcribe Button */}
      <div className="text-center">
        <Button
          onClick={handleAnalyze}
          disabled={isProcessing || !uploadedFile}
          size="lg"
          className="px-20 py-6 text-xl font-light interactive-button bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-full shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-6 w-6 mr-3 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="h-6 w-6 mr-3" />
              Start detection
            </>
          )}
        </Button>
      </div>

      {/* Results Display */}
      {(isProcessing || results) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <Card className="clean-card bg-white/60 backdrop-blur-sm border-2 border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-medium text-primary">
                Original Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              {uploadedImageUrl && (
                <img 
                  src={uploadedImageUrl} 
                  alt="Original SAR" 
                  className="w-full rounded-xl border border-primary/20 soft-shadow"
                />
              )}
            </CardContent>
          </Card>

          {/* Processing Panel */}
          <Card className="clean-card bg-white/60 backdrop-blur-sm border-2 border-accent/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-medium text-accent">
                Processing Status
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
              {isProcessing ? (
                <div className="text-center space-y-6">
                  <div className="relative mx-auto w-16 h-16">
                    <div className="absolute inset-0 border-4 border-accent/20 rounded-full"></div>
                    <div className="absolute inset-0 border-t-4 border-accent rounded-full animate-spin"></div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-accent font-medium">Analyzing Image</p>
                    <p className="text-sm text-muted-foreground">YOLO Neural Network Active</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <Activity className="h-8 w-8 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-accent font-medium">Analysis Complete</p>
                    <p className="text-sm text-muted-foreground">Results Ready</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card className="clean-card bg-white/60 backdrop-blur-sm border-2 border-secondary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-medium text-secondary">
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isProcessing ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-2 border-secondary/30 rounded-full border-dashed animate-spin mx-auto"></div>
                    <p className="text-muted-foreground text-sm">Compiling Results...</p>
                  </div>
                </div>
              ) : results ? (
                <div className="space-y-6">
                  {results.processedImageUrl && (
                    <div className="relative">
                      <img 
                        src={results.processedImageUrl} 
                        alt="Processed" 
                        className="w-full rounded-xl border border-secondary/20 soft-shadow"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-secondary px-3 py-1 rounded-full text-xs font-medium">
                        Detection Overlay
                      </div>
                    </div>
                  )}
                  {results.shipCount !== undefined && (
                    <div className="clean-card bg-primary/5 border border-primary/20 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Vessels Detected</span>
                        <span className="text-2xl font-medium text-primary">{results.shipCount}</span>
                      </div>
                    </div>
                  )}
                  {results.detectionProbabilities && results.detectionProbabilities.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-accent">Confidence Scores</p>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {results.detectionProbabilities.map((confidence, index) => (
                          <div key={index} className="clean-card bg-accent/5 border border-accent/20 p-3 rounded-lg">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Vessel {index + 1}</span>
                              <span className="font-medium text-accent">{(confidence * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground text-sm">Awaiting Analysis</p>
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