import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";

const PredictiveChart = () => {
  const data = [
    { month: 'Jan', actual: 1800000, predicted: 1850000, confidence: 0.95 },
    { month: 'Feb', actual: 2100000, predicted: 2080000, confidence: 0.92 },
    { month: 'Mar', actual: 2300000, predicted: 2350000, confidence: 0.94 },
    { month: 'Apr', actual: 2000000, predicted: 2100000, confidence: 0.91 },
    { month: 'May', actual: 2400000, predicted: 2450000, confidence: 0.93 },
    { month: 'Jun', actual: null, predicted: 2600000, confidence: 0.89 },
    { month: 'Jul', actual: null, predicted: 2750000, confidence: 0.87 },
    { month: 'Aug', actual: null, predicted: 2650000, confidence: 0.85 }
  ];

  return (
    <Card className="shadow-card border-border/50 bg-card/60 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">
            VAT Collection Forecast
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            ML-powered predictions with confidence intervals
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            6M
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--intelligence-blue))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--intelligence-blue))" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--intelligence-emerald))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--intelligence-emerald))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
                formatter={(value, name) => [
                  `$${(value as number / 1000000).toFixed(2)}M`,
                  name === 'actual' ? 'Actual' : 'Predicted'
                ]}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--intelligence-emerald))"
                strokeWidth={3}
                fill="url(#actualGradient)"
                name="actual"
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--intelligence-blue))"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#predictedGradient)"
                name="predicted"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-intelligence-emerald rounded-full mr-2"></div>
              <span>Actual Collections</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-intelligence-blue rounded-full mr-2"></div>
              <span>ML Predictions</span>
            </div>
          </div>
          <div className="text-xs">
            Model Accuracy: <span className="text-success font-medium">94.2%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictiveChart;