
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingUp, Calendar, Target } from 'lucide-react';
import { CalculatorState, CalculatorResults } from '../types';

interface MetricsGridProps {
  state: CalculatorState;
  results: CalculatorResults;
}

const MetricsGrid = ({ state, results }: MetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Monthly Income</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${results.monthlyIncome.toLocaleString()}
          </div>
          <p className="text-xs text-gray-500 mt-1">Gross rental income</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-gray-600">Monthly Expenses</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${results.monthlyExpenses.toLocaleString()}
          </div>
          <p className="text-xs text-gray-500 mt-1">Total operating costs</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Annual Cash Flow</span>
          </div>
          <div className={`text-2xl font-bold ${
            results.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            ${results.annualCashFlow.toLocaleString()}
          </div>
          <p className="text-xs text-gray-500 mt-1">Yearly profit/loss</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Initial Investment</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${(state.downPaymentAmount + (state.propertyValue * 0.03)).toLocaleString()}
          </div>
          <p className="text-xs text-gray-500 mt-1">Down payment + closing costs</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsGrid;
