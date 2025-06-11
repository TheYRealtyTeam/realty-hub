
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { DollarSign, TrendingDown, Calculator } from 'lucide-react';
import QuickInsightCard from '../../components/QuickInsightCard';
import { MortgageCalculatorState, MortgageResults } from '../../types/mortgageTypes';

interface MortgageLoanTermsStepProps {
  state: MortgageCalculatorState;
  updateState: (updates: Partial<MortgageCalculatorState>) => void;
  results: MortgageResults;
}

const MortgageLoanTermsStep = ({ state, updateState, results }: MortgageLoanTermsStepProps) => {
  const handleChange = (field: keyof MortgageCalculatorState, value: string | number) => {
    updateState({ [field]: typeof value === 'string' ? parseFloat(value) || 0 : value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-yrealty-navy">Loan Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <div className="space-y-2">
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="15"
                    value={state.interestRate}
                    onChange={(e) => handleChange('interestRate', e.target.value)}
                    className="text-lg"
                  />
                  <Slider
                    value={[state.interestRate]}
                    onValueChange={(value) => updateState({ interestRate: value[0] })}
                    max={15}
                    min={1}
                    step={0.01}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term</Label>
                <Select value={state.loanTerm.toString()} onValueChange={(value) => updateState({ loanTerm: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="25">25 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Interest Rate Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Current rates vary by credit score and loan type</li>
                <li>• Fixed rates provide payment stability</li>
                <li>• Consider points to buy down your rate</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <QuickInsightCard
          title="Principal & Interest"
          value={`$${results.monthlyPrincipalInterest.toFixed(0)}`}
          subtitle="Monthly payment"
          icon={<DollarSign className="h-4 w-4" />}
          trend="neutral"
        />
        
        <QuickInsightCard
          title="Total Interest"
          value={`$${results.totalInterestPaid.toLocaleString()}`}
          subtitle="Over loan lifetime"
          icon={<TrendingDown className="h-4 w-4" />}
          trend="negative"
        />
        
        <QuickInsightCard
          title="Total of Payments"
          value={`$${results.totalPaymentLifetime.toLocaleString()}`}
          subtitle="Principal + Interest"
          icon={<Calculator className="h-4 w-4" />}
          trend="neutral"
        />
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="text-sm text-green-800">
              <strong>Payment Breakdown:</strong>
              <div className="mt-2 space-y-1">
                <div>Principal: ${results.monthlyPaymentBreakdown.principal.toFixed(0)}</div>
                <div>Interest: ${results.monthlyPaymentBreakdown.interest.toFixed(0)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MortgageLoanTermsStep;
