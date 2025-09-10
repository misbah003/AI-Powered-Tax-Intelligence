import { AlertTriangle, Shield, FileX, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const ComplianceRisk = () => {
  const riskFactors = [
    {
      title: "Late Filing Risk",
      score: 15,
      status: "low",
      icon: Clock,
      description: "Based on historical filing patterns"
    },
    {
      title: "Documentation Gap",
      score: 45,
      status: "medium",
      icon: FileX,
      description: "Missing supporting documents detected"
    },
    {
      title: "Audit Probability",
      score: 25,
      status: "low",
      icon: Shield,
      description: "Statistical model prediction"
    },
    {
      title: "Penalty Risk",
      score: 65,
      status: "high",
      icon: AlertTriangle,
      description: "Non-compliance indicators found"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-success';
      case 'medium': return 'text-intelligence-amber';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-success';
      case 'medium': return 'bg-intelligence-amber';
      case 'high': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="shadow-card border-border/50 bg-card/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-intelligence-amber" />
          Compliance Risk Assessment
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI-powered risk scoring and recommendations
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {riskFactors.map((factor, index) => {
          const Icon = factor.icon;
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className={`h-4 w-4 ${getStatusColor(factor.status)}`} />
                  <div>
                    <p className="font-medium text-foreground">{factor.title}</p>
                    <p className="text-xs text-muted-foreground">{factor.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${getStatusColor(factor.status)}`}>
                    {factor.score}%
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {factor.status} risk
                  </p>
                </div>
              </div>
              <Progress 
                value={factor.score} 
                className="h-2"
                // Note: Progress component would need custom styling for colors
              />
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Overall Risk Score</p>
              <p className="text-xs text-muted-foreground">Weighted average assessment</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-intelligence-amber">37%</p>
              <p className="text-xs text-muted-foreground">Medium Risk</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <Button variant="intelligence" size="sm" className="flex-1">
              Generate Report
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceRisk;