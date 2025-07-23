import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Zap, Loader2, Ship, Activity, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DetectionResults {
  shipCount?: number;
  detectionProbabilities?: Array<{ id: number; confidence: number }>;
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
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock results
    const mockResults: DetectionResults = {};
    if (outputOptions.shipCount) {
      mockResults.shipCount = Math.floor(Math.random() * 15) + 1;
    }
    if (outputOptions.detectionProbability) {
      mockResults.detectionProbabilities = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        confidence: Math.round((Math.random() * 0.4 + 0.6) * 100) / 100
      }));
    }
    if (outputOptions.processedImage) {
      mockResults.processedImageUrl = uploadedImageUrl; // In real app, this would be the processed image
    }

    setResults(mockResults);
    setIsProcessing(false);
    
    toast({
      title: "Analysis complete",
      description: "Ship detection analysis finished successfully",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Upload Section */}
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload SAR Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {uploadedImageUrl ? (
              <div className="space-y-4">
                <img 
                  src={uploadedImageUrl} 
                  alt="Uploaded SAR" 
                  className="max-h-48 mx-auto rounded-lg border border-border"
                />
                <p className="text-sm text-muted-foreground">
                  {uploadedFile?.name} - Click to replace
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="text-lg font-medium">Drop your SAR image here</p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse files
                  </p>
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
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Select Output Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ship-count"
                checked={outputOptions.shipCount}
                onCheckedChange={(checked) =>
                  setOutputOptions(prev => ({ ...prev, shipCount: checked as boolean }))
                }
              />
              <label htmlFor="ship-count" className="flex items-center gap-2 cursor-pointer">
                <Ship className="h-4 w-4 text-primary" />
                Number of Ships
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="detection-prob"
                checked={outputOptions.detectionProbability}
                onCheckedChange={(checked) =>
                  setOutputOptions(prev => ({ ...prev, detectionProbability: checked as boolean }))
                }
              />
              <label htmlFor="detection-prob" className="flex items-center gap-2 cursor-pointer">
                <Activity className="h-4 w-4 text-primary" />
                Detection Probability
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="processed-image"
                checked={outputOptions.processedImage}
                onCheckedChange={(checked) =>
                  setOutputOptions(prev => ({ ...prev, processedImage: checked as boolean }))
                }
              />
              <label htmlFor="processed-image" className="flex items-center gap-2 cursor-pointer">
                <ImageIcon className="h-4 w-4 text-primary" />
                Processed Image
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analyze Button */}
      <div className="text-center">
        <Button
          onClick={handleAnalyze}
          disabled={isProcessing || !uploadedFile}
          size="lg"
          className="px-8 py-4 text-lg satellite-glow"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="h-5 w-5 mr-2" />
              Run Detection
            </>
          )}
        </Button>
      </div>

      {/* Results Display */}
      {(isProcessing || results) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Input</CardTitle>
            </CardHeader>
            <CardContent>
              {uploadedImageUrl && (
                <img 
                  src={uploadedImageUrl} 
                  alt="Original SAR" 
                  className="w-full rounded-lg border border-border"
                />
              )}
            </CardContent>
          </Card>

          {/* Processing Panel */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Processing</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-48">
              {isProcessing ? (
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/30 rounded-full animate-radar"></div>
                    <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Feature Analysis...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Activity className="h-8 w-8 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Analysis Complete</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Output</CardTitle>
            </CardHeader>
            <CardContent>
              {isProcessing ? (
                <div className="flex items-center justify-center h-48">
                  <p className="text-muted-foreground">Processing results...</p>
                </div>
              ) : results ? (
                <div className="space-y-4">
                  {results.processedImageUrl && (
                    <img 
                      src={results.processedImageUrl} 
                      alt="Processed" 
                      className="w-full rounded-lg border border-border"
                    />
                  )}
                  {results.shipCount && (
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <p className="font-medium text-accent">Total Ships Detected: {results.shipCount}</p>
                    </div>
                  )}
                  {results.detectionProbabilities && (
                    <div className="space-y-2">
                      <p className="font-medium text-accent">Detection Probabilities:</p>
                      {results.detectionProbabilities.map((detection) => (
                        <div key={detection.id} className="bg-secondary/50 p-2 rounded text-sm">
                          Ship {detection.id}: {(detection.confidence * 100).toFixed(1)}%
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DetectionTool;