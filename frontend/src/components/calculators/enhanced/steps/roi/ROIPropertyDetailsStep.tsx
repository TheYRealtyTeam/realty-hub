
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { DollarSign, Home, TrendingUp } from 'lucide-react';
import QuickInsightCard from '../../components/QuickInsightCard';
import { ROICalculatorState, ROIResults } from '../../types/roiTypes';

interface ROIPropertyDetailsStepProps {
  state: ROICalculatorState;
  updateState: (updates: Partial<ROICalculatorState>) => void;
  results: ROIResults;
}

const ROIPropertyDetailsStep = ({ state, updateState, results }: ROIPropertyDetailsStepProps) => {
  const handleChange = (field: keyof ROICalculatorState, value: string | number) => {
    updateState({ [field]: typeof value === 'string' ? parseFloat(value) || 0 : value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-yrealty-navy">Property Investment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyValue">Property Value ($)</Label>
                <Input
                  id="propertyValue"
                  type="number"
                  value={state.propertyValue}
                  onChange={(e) => handleChange('propertyValue', e.target.value)}
                  className="text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="downPaymentPercent">Down Payment (%)</Label>
                <div className="space-y-2">
                  <Input
                    id="downPaymentPercent"
                    type="number"
                    step="0.5"
                    min="0"
                    max="100"
                    value={state.downPaymentPercent}
                    onChange={(e) => handleChange('downPaymentPercent', e.target.value)}
                    className="text-lg"
                  />
                  <Slider
                    value={[state.downPaymentPercent]}
                    onValueChange={(value) => updateState({ downPaymentPercent: value[0] })}
                    max={50}
                    min={5}
                    step={0.5}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="closingCosts">Closing Costs ($)</Label>
                <Input
                  id="closingCosts"
                  type="number"
                  value={state.closingCosts}
                  onChange={(e) => handleChange('closingCosts', e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">Typically 2-5% of purchase price</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="renovationCosts">Renovation Costs ($)</Label>
                <Input
                  id="renovationCosts"
                  type="number"
                  value={state.renovationCosts}
                  onChange={(e) => handleChange('renovationCosts', e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">Initial repairs and improvements</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Investment Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Higher down payments reduce financing costs</li>
                <li>• Factor in all upfront costs for accurate ROI</li>
                <li>• Consider reserves for unexpected repairs</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <QuickInsightCard
          title="Total Investment"
          value={`$${results.totalInvestment.toLocaleString()}`}
          subtitle="Initial capital required"
          icon={<DollarSign className="h-4 w-4" />}
          trend="neutral"
        />
        
        <QuickInsightCard
          title="Loan Amount"
          value={`$${(state.propertyValue - state.downPaymentAmount).toLocaleString()}`}
          subtitle="Amount to finance"
          icon={<Home className="h-4 w-4" />}
          trend="neutral"
        />
        
        <QuickInsightCard
          title="Down Payment"
          value={`$${state.downPaymentAmount.toLocaleString()}`}
          subtitle={`${state.downPaymentPercent}% of property value`}
          icon={<TrendingUp className="h-4 w-4" />}
          trend="neutral"
        />
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="text-sm text-green-800">
              <strong>Investment Breakdown:</strong>
              <div className="mt-2 space-y-1">
                <div>Down Payment: ${state.downPaymentAmount.toLocaleString()}</div>
                <div>Closing Costs: ${state.closingCosts.toLocaleString()}</div>
                <div>Renovations: ${state.renovationCosts.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ROIPropertyDetailsStep;
