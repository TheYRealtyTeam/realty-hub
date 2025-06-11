
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { DollarSign, TrendingUp, BarChart } from 'lucide-react';
import QuickInsightCard from '../../components/QuickInsightCard';
import { ROICalculatorState, ROIResults } from '../../types/roiTypes';

interface ROIIncomeProjectionsStepProps {
  state: ROICalculatorState;
  updateState: (updates: Partial<ROICalculatorState>) => void;
  results: ROIResults;
}

const ROIIncomeProjectionsStep = ({ state, updateState, results }: ROIIncomeProjectionsStepProps) => {
  const handleChange = (field: keyof ROICalculatorState, value: string | number) => {
    updateState({ [field]: typeof value === 'string' ? parseFloat(value) || 0 : value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-yrealty-navy">Income Projections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monthlyRent">Monthly Rental Income ($)</Label>
              <Input
                id="monthlyRent"
                type="number"
                value={state.monthlyRent}
                onChange={(e) => handleChange('monthlyRent', e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-gray-500">Expected monthly rent from tenant</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualAppreciation">Annual Property Appreciation (%)</Label>
              <div className="space-y-2">
                <Input
                  id="annualAppreciation"
                  type="number"
                  step="0.1"
                  min="0"
                  max="15"
                  value={state.annualAppreciation}
                  onChange={(e) => handleChange('annualAppreciation', e.target.value)}
                  className="text-lg"
                />
                <Slider
                  value={[state.annualAppreciation]}
                  onValueChange={(value) => updateState({ annualAppreciation: value[0] })}
                  max={10}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <p className="text-xs text-gray-500">Historical average is 3-4% annually</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rentGrowthRate">Annual Rent Growth Rate (%)</Label>
              <div className="space-y-2">
                <Input
                  id="rentGrowthRate"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={state.rentGrowthRate}
                  onChange={(e) => handleChange('rentGrowthRate', e.target.value)}
                  className="text-lg"
                />
                <Slider
                  value={[state.rentGrowthRate]}
                  onValueChange={(value) => updateState({ rentGrowthRate: value[0] })}
                  max={8}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <p className="text-xs text-gray-500">Typical range is 2-3% annually</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Income Optimization Tips</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Research comparable rents in the area</li>
                <li>• Consider value-add improvements for higher rent</li>
                <li>• Plan for regular rent increases</li>
                <li>• Factor in local market growth trends</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <QuickInsightCard
          title="Monthly Income"
          value={`$${state.monthlyRent.toLocaleString()}`}
          subtitle="Current rental income"
          icon={<DollarSign className="h-4 w-4" />}
          trend="positive"
        />
        
        <QuickInsightCard
          title="Annual Income"
          value={`$${(state.monthlyRent * 12).toLocaleString()}`}
          subtitle="Gross rental income"
          icon={<BarChart className="h-4 w-4" />}
          trend="positive"
        />
        
        <QuickInsightCard
          title="Property Value Growth"
          value={`$${results.propertyValueAtSale.toLocaleString()}`}
          subtitle={`After ${state.holdingPeriod} years`}
          icon={<TrendingUp className="h-4 w-4" />}
          trend="positive"
        />
        
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-4">
            <div className="text-sm text-blue-800">
              <strong>Income Projections:</strong>
              <div className="mt-2 space-y-1">
                <div>Current Value: ${state.propertyValue.toLocaleString()}</div>
                <div>Future Value: ${results.propertyValueAtSale.toLocaleString()}</div>
                <div>Total Appreciation: ${(results.propertyValueAtSale - state.propertyValue).toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ROIIncomeProjectionsStep;
