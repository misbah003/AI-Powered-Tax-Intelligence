import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VATRefundPredictor = () => {
  const [formData, setFormData] = useState({
    businessType: "",
    annualTurnover: "",
    vatPaid: "",
    inputVAT: ""
  });
  const [prediction, setPrediction] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    setIsCalculating(true);
    
    // Simulate ML prediction calculation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const vatPaid = parseFloat(formData.vatPaid) || 0;
    const inputVAT = parseFloat(formData.inputVAT) || 0;
    const refundAmount = Math.max(0, inputVAT - vatPaid);
    const approvalProbability = Math.min(95, 65 + Math.random() * 30);
    const processingDays = Math.floor(12 + Math.random() * 8);
    
    setPrediction({
      refundAmount,
      approvalProbability,
      processingDays,
      riskFactors: [
        "Business registered for 2+ years ✓",
        "Consistent filing history ✓", 
        "Valid supporting documents required",
        "Input VAT verification needed"
      ]
    });
    
    setIsCalculating(false);
  };

  return (
    <Card className="shadow-card border-border/50 bg-card/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center">
          <Calculator className="h-5 w-5 mr-2 text-intelligence-emerald" />
          VAT Refund Predictor
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          ML-powered refund estimation for SMEs
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <Select onValueChange={(value) => setFormData({...formData, businessType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="trading">Trading</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="turnover">Annual Turnover (₹)</Label>
            <Input
              id="turnover"
              placeholder="e.g., 50,00,000"
              value={formData.annualTurnover}
              onChange={(e) => setFormData({...formData, annualTurnover: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vatPaid">Output VAT Paid (₹)</Label>
            <Input
              id="vatPaid"
              placeholder="e.g., 2,00,000"
              value={formData.vatPaid}
              onChange={(e) => setFormData({...formData, vatPaid: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="inputVAT">Input VAT Claimed (₹)</Label>
            <Input
              id="inputVAT"
              placeholder="e.g., 2,50,000"
              value={formData.inputVAT}
              onChange={(e) => setFormData({...formData, inputVAT: e.target.value})}
            />
          </div>
        </div>

        <Button 
          variant="intelligence" 
          className="w-full"
          onClick={handleCalculate}
          disabled={isCalculating}
        >
          {isCalculating ? "Calculating..." : "Predict Refund"}
        </Button>

        {prediction && (
          <div className="space-y-4 pt-4 border-t border-border/50">
            <h4 className="font-medium text-foreground">Prediction Results</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-success rounded-lg p-4 text-center">
                <DollarSign className="h-6 w-6 text-white mx-auto mb-2" />
                <p className="text-xs text-white/80">Estimated Refund</p>
                <p className="text-lg font-bold text-white">
                  ₹{prediction.refundAmount.toLocaleString()}
                </p>
              </div>
              
              <div className="bg-gradient-primary rounded-lg p-4 text-center">
                <TrendingUp className="h-6 w-6 text-white mx-auto mb-2" />
                <p className="text-xs text-white/80">Approval Probability</p>
                <p className="text-lg font-bold text-white">
                  {prediction.approvalProbability.toFixed(1)}%
                </p>
              </div>
              
              <div className="bg-gradient-warning rounded-lg p-4 text-center">
                <Clock className="h-6 w-6 text-white mx-auto mb-2" />
                <p className="text-xs text-white/80">Processing Time</p>
                <p className="text-lg font-bold text-white">
                  {prediction.processingDays} days
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Risk Assessment:</p>
              <ul className="space-y-1">
                {prediction.riskFactors.map((factor: string, index: number) => (
                  <li key={index} className="text-xs text-muted-foreground">
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="success" size="sm" className="flex-1">
                Start Application
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Save Report
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VATRefundPredictor;