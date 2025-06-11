
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Home, TrendingUp } from 'lucide-react';
import QuickInsightCard from '../../components/QuickInsightCard';
import { MortgageCalculatorState, MortgageResults } from '../../types/mortgageTypes';

interface MortgageLoanDetailsStepProps {
  state: MortgageCalculatorState;
  updateState: (updates: Partial<MortgageCalculatorState>) => void;
  results: MortgageResults;
}

const MortgageLoanDetailsStep = ({ state, updateState, results }: MortgageLoanDetailsStepProps) => {
  const handleChange = (field: keyof MortgageCalculatorState, value: string | number) => {
    updateState({ [field]: typeof value === 'string' ? parseFloat(value) || 0 : value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-yrealty-navy">Property & Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyValue">Home Price</Label>
                <Input
                  id="propertyValue"
                  type="number"
                  value={state.propertyValue}
                  onChange={(e) => handleChange('propertyValue', e.target.value)}
                  className="text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type</Label>
                <Select value={state.propertyType} onValueChange={(value) => updateState({ propertyType: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-family">Single Family Home</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="multi-family">Multi-Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="downPaymentPercent">Down Payment (%)</Label>
                <Input
                  id="downPaymentPercent"
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={state.downPaymentPercent}
                  onChange={(e) => handleChange('downPaymentPercent', e.target.value)}
                  className="text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="downPaymentAmount">Down Payment Amount</Label>
                <Input
                  id="downPaymentAmount"
                  type="number"
                  value={state.downPaymentAmount}
                  onChange={(e) => handleChange('downPaymentAmount', e.target.value)}
                  className="text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                type="text"
                value={state.location}
                onChange={(e) => updateState({ location: e.target.value })}
                placeholder="City, State"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <QuickInsightCard
          title="Loan Amount"
          value={`$${results.loanAmount.toLocaleString()}`}
          subtitle="Principal to finance"
          icon={<DollarSign className="h-4 w-4" />}
          trend="neutral"
        />
        
        <QuickInsightCard
          title="Est. Monthly Payment"
          value={`$${results.totalMonthlyPayment.toFixed(0)}`}
          subtitle="Principal, Interest, Taxes, Insurance"
          icon={<Home className="h-4 w-4" />}
          trend={results.totalMonthlyPayment < state.propertyValue * 0.005 ? "positive" : "negative"}
        />
        
        {state.downPaymentPercent < 20 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-4">
              <div className="text-sm text-orange-800">
                <strong>PMI Required:</strong> Your down payment is less than 20%, so you'll need Private Mortgage Insurance.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MortgageLoanDetailsStep;
