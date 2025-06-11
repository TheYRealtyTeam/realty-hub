
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home } from 'lucide-react';
import QuickInsightCard from '../../components/QuickInsightCard';
import { MortgageCalculatorState, MortgageResults } from '../../types/mortgageTypes';

interface MortgageAdditionalCostsStepProps {
  state: MortgageCalculatorState;
  updateState: (updates: Partial<MortgageCalculatorState>) => void;
  results: MortgageResults;
}

const MortgageAdditionalCostsStep = ({ state, updateState, results }: MortgageAdditionalCostsStepProps) => {
  const handleChange = (field: keyof MortgageCalculatorState, value: string | number) => {
    updateState({ [field]: typeof value === 'string' ? parseFloat(value) || 0 : value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-yrealty-navy">Additional Monthly Costs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyTax">Annual Property Tax</Label>
                <Input
                  id="propertyTax"
                  type="number"
                  value={state.propertyTax}
                  onChange={(e) => handleChange('propertyTax', e.target.value)}
                  className="text-lg"
                />
                <div className="text-sm text-gray-500">
                  Monthly: ${(state.propertyTax / 12).toFixed(0)}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insurance">Annual Home Insurance</Label>
                <Input
                  id="insurance"
                  type="number"
                  value={state.insurance}
                  onChange={(e) => handleChange('insurance', e.target.value)}
                  className="text-lg"
                />
                <div className="text-sm text-gray-500">
                  Monthly: ${(state.insurance / 12).toFixed(0)}
                </div>
              </div>
            </div>

            {state.downPaymentPercent < 20 && (
              <div className="space-y-2">
                <Label htmlFor="pmi">Monthly PMI (Private Mortgage Insurance)</Label>
                <Input
                  id="pmi"
                  type="number"
                  value={state.pmi}
                  onChange={(e) => handleChange('pmi', e.target.value)}
                  className="text-lg"
                />
                <div className="text-sm text-gray-500">
                  Required when down payment is less than 20%
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="hoaFees">Monthly HOA Fees (if applicable)</Label>
              <Input
                id="hoaFees"
                type="number"
                value={state.hoaFees}
                onChange={(e) => handleChange('hoaFees', e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Cost Estimation Tips</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Property tax rates vary by location (typically 0.5% - 2.5% annually)</li>
                <li>• Home insurance averages $1,200 annually but varies by region</li>
                <li>• PMI typically costs 0.3% - 1.5% of loan amount annually</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <QuickInsightCard
          title="Total Monthly Payment"
          value={`$${results.totalMonthlyPayment.toFixed(0)}`}
          subtitle="PITI + PMI + HOA"
          icon={<Home className="h-4 w-4" />}
          trend="neutral"
        />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Monthly Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Principal & Interest</span>
              <span>${results.monthlyPrincipalInterest.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Property Tax</span>
              <span>${results.monthlyPropertyTax.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Insurance</span>
              <span>${results.monthlyInsurance.toFixed(0)}</span>
            </div>
            {results.monthlyPMI > 0 && (
              <div className="flex justify-between text-sm">
                <span>PMI</span>
                <span>${results.monthlyPMI.toFixed(0)}</span>
              </div>
            )}
            {results.monthlyHOA > 0 && (
              <div className="flex justify-between text-sm">
                <span>HOA Fees</span>
                <span>${results.monthlyHOA.toFixed(0)}</span>
              </div>
            )}
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total Monthly</span>
              <span>${results.totalMonthlyPayment.toFixed(0)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MortgageAdditionalCostsStep;
