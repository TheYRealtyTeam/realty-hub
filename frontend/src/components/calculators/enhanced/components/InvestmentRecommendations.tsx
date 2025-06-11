
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { CalculatorResults } from '../types';

interface InvestmentRecommendationsProps {
  results: CalculatorResults;
}

const InvestmentRecommendations = ({ results }: InvestmentRecommendationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.cashOnCashReturn < 6 && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Consider Optimization</h4>
                  <p className="text-sm text-yellow-700">
                    Your return is below market average. Consider increasing rent, reducing expenses, or exploring better financing options.
                  </p>
                </div>
              </div>
            </div>
          )}

          {results.monthlyCashFlow < 0 && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">Negative Cash Flow</h4>
                  <p className="text-sm text-red-700">
                    This property requires monthly contributions. Review rental rates and expenses before proceeding.
                  </p>
                </div>
              </div>
            </div>
          )}

          {results.cashOnCashReturn >= 8 && results.monthlyCashFlow > 0 && (
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Strong Investment</h4>
                  <p className="text-sm text-green-700">
                    This property shows excellent potential with strong cash flow and returns above market average.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentRecommendations;
