import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MetricsCards = () => {
  const metrics = [
    {
      title: "Tax Compliance Score",
      value: "94.2%",
      change: "+2.4%",
      trend: "up",
      icon: CheckCircle,
      gradient: "gradient-success"
    },
    {
      title: "Predicted VAT Collection",
      value: "$2.4M",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      gradient: "gradient-primary"
    },
    {
      title: "Anomaly Detection",
      value: "3 alerts",
      change: "-1 from last week",
      trend: "down",
      icon: AlertTriangle,
      gradient: "gradient-warning"
    },
    {
      title: "Processing Efficiency",
      value: "98.7%",
      change: "+1.2%",
      trend: "up",
      icon: TrendingUp,
      gradient: "gradient-success"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth border-border/50 bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-${metric.gradient}`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {metric.value}
              </div>
              <p className={`text-xs flex items-center ${
                metric.trend === 'up' ? 'text-success' : 'text-intelligence-amber'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {metric.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsCards;