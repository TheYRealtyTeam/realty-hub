
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart } from 'lucide-react';
import { CalculatorState, CalculatorResults } from '../types';

interface InvestmentInsightsProps {
  state: CalculatorState;
  results: CalculatorResults;
}

const InvestmentInsights = ({ state, results }: InvestmentInsightsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <PieChart className="h-5 w-5 text-yrealty-accent" />
          <span>Key Investment Metrics</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Cash-on-Cash Return</span>
          <span className="font-bold text-yrealty-navy">{results.cashOnCashReturn.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Cap Rate</span>
          <span className="font-bold text-yrealty-navy">{results.capRate.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Expense Ratio</span>
          <span className="font-bold text-yrealty-navy">
            {((results.monthlyExpenses / results.monthlyIncome) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Monthly ROI</span>
          <span className="font-bold text-yrealty-navy">
            {((results.monthlyCashFlow / (state.downPaymentAmount + (state.propertyValue * 0.03))) * 100).toFixed(2)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentInsights;
