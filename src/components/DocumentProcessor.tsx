import { useState } from "react";
import { Upload, FileText, Scan, Brain, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const DocumentProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const { toast } = useToast();

  const handleFileUpload = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate document processing
    const steps = [
      { step: "OCR Processing", progress: 25 },
      { step: "NLP Analysis", progress: 50 },
      { step: "Entity Recognition", progress: 75 },
      { step: "Classification", progress: 100 }
    ];

    for (const { step, progress: stepProgress } of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(stepProgress);
      
      if (stepProgress === 100) {
        setResults([
          {
            filename: "invoice_2024_001.pdf",
            type: "Tax Invoice",
            entities: ["PAN: ABCDE1234F", "GST: 27ABCDE1234F1Z5", "Amount: ₹1,25,000"],
            classification: "Compliant",
            confidence: 0.94
          },
          {
            filename: "receipt_vendor_002.pdf", 
            type: "Purchase Receipt",
            entities: ["Vendor: Tech Solutions Ltd", "Date: 2024-01-15", "Amount: ₹45,000"],
            classification: "Missing GST Number",
            confidence: 0.87
          }
        ]);
        
        toast({
          title: "Documents Processed",
          description: "AI analysis completed successfully"
        });
      }
    }
    
    setIsProcessing(false);
  };

  return (
    <Card className="shadow-card border-border/50 bg-card/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center">
          <Brain className="h-5 w-5 mr-2 text-intelligence-blue" />
          AI Document Processing
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          OCR + NLP for intelligent tax document analysis
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isProcessing && results.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Drop tax documents here or click to upload
            </p>
            <Button variant="intelligence" onClick={handleFileUpload}>
              <FileText className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
          </div>
        )}

        {isProcessing && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Scan className="h-5 w-5 text-intelligence-blue animate-pulse" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Processing documents...</p>
                <p className="text-xs text-muted-foreground">AI models analyzing content</p>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-center text-muted-foreground">
              {progress}% complete
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Processing Results</h4>
            {results.map((result, index) => (
              <div key={index} className="border border-border/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-intelligence-blue" />
                    <span className="text-sm font-medium text-foreground">
                      {result.filename}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {result.classification === "Compliant" ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-intelligence-amber" />
                    )}
                    <span className={`text-xs ${
                      result.classification === "Compliant" ? "text-success" : "text-intelligence-amber"
                    }`}>
                      {result.classification}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Type: <span className="text-foreground">{result.type}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Confidence: <span className="text-foreground">{(result.confidence * 100).toFixed(1)}%</span>
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <p>Extracted Entities:</p>
                    <ul className="mt-1 space-y-1">
                      {result.entities.map((entity: string, i: number) => (
                        <li key={i} className="text-foreground">• {entity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex space-x-2">
              <Button variant="intelligence" size="sm" className="flex-1">
                Process More
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Export Results
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentProcessor;