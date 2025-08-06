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
      <Card className="clean-card bg-white/60 backdrop-blur-sm border-2 border-primary/20">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl font-medium text-foreground">
            <Upload className="h-6 w-6 text-primary" />
            Upload SAR Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="group relative border-2 border-dashed border-primary/20 rounded-3xl p-16 text-center hover:border-primary/40 transition-all duration-500 cursor-pointer bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-md hover:from-white/40 hover:via-white/30 hover:to-white/20"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-2xl group-hover:scale-105 transition-transform duration-700"></div>
            </div>
            
            {uploadedImageUrl ? (
              <div className="relative space-y-8">
                <div className="relative inline-block">
                  <img 
                    src={uploadedImageUrl} 
                    alt="Uploaded SAR" 
                    className="max-h-80 mx-auto rounded-2xl border-2 border-primary/30 soft-shadow group-hover:border-primary/50 transition-colors duration-300"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full border-2 border-white shadow-lg animate-soft-pulse"></div>
                </div>
                <div className="space-y-3">
                  <p className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {uploadedFile?.name}
                  </p>
                  <p className="text-accent text-base font-medium">
                    ✓ Image loaded • Click to replace
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="relative mx-auto w-24 h-24">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-white/40 to-white/20 rounded-2xl p-4 backdrop-blur-sm border border-white/30">
                    <Upload className="h-16 w-16 text-primary mx-auto animate-gentle-float group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-3xl font-light text-foreground group-hover:text-primary transition-colors duration-300">
                    Drop Your SAR Image
                  </p>
                  <p className="text-lg text-accent font-medium">
                    or click to browse files
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 border border-white/30 rounded-full text-muted-foreground text-sm backdrop-blur-sm">
                    <div className="w-2 h-2 bg-accent/60 rounded-full animate-soft-pulse"></div>
                    Supports: JPG, PNG, TIFF, GeoTIFF
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
      <Card className="clean-card bg-white/60 backdrop-blur-sm border-2 border-accent/20">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl font-medium text-foreground">
            <Activity className="h-6 w-6 text-accent" />
            Analysis Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="clean-card bg-white/40 p-6 rounded-xl border border-primary/10">
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
                  <Ship className="h-5 w-5 text-primary" />
                  <span className="font-medium">Vessel Count</span>
                </label>
              </div>
              <p className="text-sm text-muted-foreground pl-8">
                Total number of detected maritime vessels
              </p>
            </div>
            
            <div className="clean-card bg-white/40 p-6 rounded-xl border border-accent/10">
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
                  <Activity className="h-5 w-5 text-accent" />
                  <span className="font-medium">Confidence Scores</span>
                </label>
              </div>
              <p className="text-sm text-muted-foreground pl-8">
                AI confidence levels for each detection
              </p>
            </div>
            
            <div className="clean-card bg-white/40 p-6 rounded-xl border border-secondary/20">
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
                  <ImageIcon className="h-5 w-5 text-secondary" />
                  <span className="font-medium">Annotated Image</span>
                </label>
              </div>
              <p className="text-sm text-muted-foreground pl-8">
                Image with detection bounding boxes
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
          className="px-16 py-6 text-xl font-medium interactive-button bg-primary hover:bg-primary/90 text-primary-foreground gentle-glow"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-6 w-6 mr-3 animate-spin" />
              Analyzing Image...
            </>
          ) : (
            <>
              <Zap className="h-6 w-6 mr-3" />
              Start Analysis
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