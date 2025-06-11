
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Calculator, Percent, Calendar, DollarSign } from 'lucide-react';
import { CalculatorState, CalculatorResults } from '../types';
import QuickInsightCard from '../components/QuickInsightCard';

interface FinancingStepProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
  results: CalculatorResults;
}

const FinancingStep = ({ state, updateState, results }: FinancingStepProps) => {
  const handleChange = (field: keyof CalculatorState, value: string | number) => {
    updateState({ [field]: value });
  };

  const loanAmount = state.propertyValue - state.downPaymentAmount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-yrealty-accent" />
              <span>Financing Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-gray-700">
                  Down Payment: {state.downPaymentPercent}%
                </Label>
                <span className="text-sm font-bold text-yrealty-navy">
                  ${state.downPaymentAmount.toLocaleString()}
                </span>
              </div>
              <Slider
                value={[state.downPaymentPercent]}
                onValueChange={(value) => handleChange('downPaymentPercent', value[0])}
                max={50}
                min={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5% (High leverage)</span>
                <span>25% (Optimal)</span>
                <span>50% (Conservative)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="interestRate" className="text-sm font-medium text-gray-700">
                  Interest Rate (%)
                </Label>
                <div className="relative mt-1">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={state.interestRate}
                    onChange={(e) => handleChange('interestRate', parseFloat(e.target.value) || 0)}
                    className="pl-10"
                    placeholder="4.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="loanTerm" className="text-sm font-medium text-gray-700">
                  Loan Term (Years)
                </Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="loanTerm"
                    type="number"
                    value={state.loanTerm}
                    onChange={(e) => handleChange('loanTerm', parseFloat(e.target.value) || 0)}
                    className="pl-10"
                    placeholder="30"
                  />
                </div>
              </div>
            </div>

            <div className="bg-yrealty-blue/10 p-4 rounded-lg">
              <h4 className="font-medium text-yrealty-navy mb-3">Loan Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Loan Amount:</span>
                  <p className="font-bold text-yrealty-navy">${loanAmount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Monthly Payment:</span>
                  <p className="font-bold text-yrealty-navy">${results.mortgagePayment.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <h4 className="font-medium text-amber-800 mb-2">💰 Financing Tips</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• 20-25% down payment often gets better rates</li>
                <li>• Shop around with multiple lenders</li>
                <li>• Consider investment property loan requirements</li>
                <li>• Factor in closing costs (typically 2-5%)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <QuickInsightCard
          title="Loan to Value"
          value={`${((loanAmount / state.propertyValue) * 100).toFixed(1)}%`}
          subtitle="Financing ratio"
          icon={<Percent className="h-4 w-4" />}
          trend="neutral"
        />
        
        <QuickInsightCard
          title="Monthly Payment"
          value={`$${results.mortgagePayment.toLocaleString()}`}
          subtitle="Principal & Interest"
          icon={<DollarSign className="h-4 w-4" />}
          trend="neutral"
        />

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <h4 className="font-bold text-lg mb-2">Leverage Impact</h4>
              <p className="text-sm opacity-90">
                Your {state.downPaymentPercent}% down payment provides 
                {state.downPaymentPercent < 20 ? ' high leverage for maximum returns, but higher risk.' :
                 state.downPaymentPercent > 30 ? ' conservative financing with lower risk.' :
                 ' balanced leverage and manageable risk.'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-3">Rate Comparison</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Rate:</span>
                <span className="font-medium">{state.interestRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Market Average:</span>
                <span className="font-medium">4.2%-5.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Your Position:</span>
                <span className={`font-medium ${
                  state.interestRate < 5 ? 'text-green-600' : 
                  state.interestRate > 6 ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {state.interestRate < 5 ? 'Excellent' : 
                   state.interestRate > 6 ? 'Consider Shopping' : 'Good'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancingStep;
