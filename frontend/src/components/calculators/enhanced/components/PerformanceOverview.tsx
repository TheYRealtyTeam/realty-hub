
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { CalculatorResults } from '../types';

interface PerformanceOverviewProps {
  results: CalculatorResults;
}

const PerformanceOverview = ({ results }: PerformanceOverviewProps) => {
  const getPerformanceRating = () => {
    if (results.cashOnCashReturn >= 10) return { rating: 'Excellent', color: 'bg-green-500', icon: CheckCircle };
    if (results.cashOnCashReturn >= 6) return { rating: 'Good', color: 'bg-blue-500', icon: CheckCircle };
    if (results.cashOnCashReturn >= 3) return { rating: 'Fair', color: 'bg-yellow-500', icon: AlertTriangle };
    return { rating: 'Poor', color: 'bg-red-500', icon: AlertTriangle };
  };

  const performance = getPerformanceRating();

  return (
    <Card className="bg-gradient-to-r from-yrealty-navy to-yrealty-blue text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl">Investment Analysis</span>
          <Badge className={`${performance.color} text-white`}>
            <performance.icon className="h-4 w-4 mr-1" />
            {performance.rating}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {results.cashOnCashReturn.toFixed(1)}%
            </div>
            <p className="text-sm opacity-90">Cash-on-Cash Return</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {results.capRate.toFixed(1)}%
            </div>
            <p className="text-sm opacity-90">Cap Rate</p>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold mb-1 ${
              results.monthlyCashFlow >= 0 ? 'text-green-200' : 'text-red-200'
            }`}>
              ${results.monthlyCashFlow.toLocaleString()}
            </div>
            <p className="text-sm opacity-90">Monthly Cash Flow</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
