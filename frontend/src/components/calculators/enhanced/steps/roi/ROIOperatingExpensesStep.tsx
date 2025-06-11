
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { TrendingDown, Home, Wrench, Users } from 'lucide-react';
import QuickInsightCard from '../../components/QuickInsightCard';
import { ROICalculatorState, ROIResults } from '../../types/roiTypes';

interface ROIOperatingExpensesStepProps {
  state: ROICalculatorState;
  updateState: (updates: Partial<ROICalculatorState>) => void;
  results: ROIResults;
}

const ROIOperatingExpensesStep = ({ state, updateState, results }: ROIOperatingExpensesStepProps) => {
  const handleChange = (field: keyof ROICalculatorState, value: string | number | boolean) => {
    updateState({ [field]: typeof value === 'string' ? parseFloat(value) || 0 : value });
  };

  const totalMonthlyExpenses = (state.propertyTax / 12) + 
                              (state.insurance / 12) + 
                              state.maintenanceCost + 
                              ((state.monthlyRent * state.vacancyRate) / 100) +
                              (state.isFlatFee ? state.managementFee : (state.monthlyRent * state.managementFee) / 100) +
                              results.mortgagePayment +
                              state.otherExpenses;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-yrealty-navy">Operating Expenses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyTax">Annual Property Tax ($)</Label>
                <Input
                  id="propertyTax"
                  type="number"
                  value={state.propertyTax}
                  onChange={(e) => handleChange('propertyTax', e.target.value)}
                  className="text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insurance">Annual Insurance ($)</Label>
                <Input
                  id="insurance"
                  type="number"
                  value={state.insurance}
                  onChange={(e) => handleChange('insurance', e.target.value)}
                  className="text-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maintenanceCost">Monthly Maintenance ($)</Label>
                <Input
                  id="maintenanceCost"
                  type="number"
                  value={state.maintenanceCost}
                  onChange={(e) => handleChange('maintenanceCost', e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">Repairs, landscaping, etc.</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vacancyRate">Vacancy Rate (%)</Label>
                <Input
                  id="vacancyRate"
                  type="number"
                  step="0.5"
                  min="0"
                  max="50"
                  value={state.vacancyRate}
                  onChange={(e) => handleChange('vacancyRate', e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">Expected vacancy percentage</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isFlatFee"
                  checked={state.isFlatFee}
                  onCheckedChange={(checked) => handleChange('isFlatFee', checked)}
                />
                <Label htmlFor="isFlatFee">Management fee is a flat amount (not percentage)</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="managementFee">
                  Management Fee ({state.isFlatFee ? '$' : '%'})
                </Label>
                <Input
                  id="managementFee"
                  type="number"
                  step={state.isFlatFee ? "1" : "0.1"}
                  value={state.managementFee}
                  onChange={(e) => handleChange('managementFee', e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">
                  {state.isFlatFee ? 'Monthly flat fee' : 'Percentage of monthly rent'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherExpenses">Other Monthly Expenses ($)</Label>
              <Input
                id="otherExpenses"
                type="number"
                value={state.otherExpenses}
                onChange={(e) => handleChange('otherExpenses', e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-gray-500">HOA fees, utilities, etc.</p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Expense Management Tips</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Budget 1-2% of property value for annual maintenance</li>
                <li>• Consider self-management vs. professional management</li>
                <li>• Factor in periodic capital improvements</li>
                <li>• Review insurance coverage annually</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <QuickInsightCard
          title="Total Monthly Expenses"
          value={`$${totalMonthlyExpenses.toFixed(0)}`}
          subtitle="All operating costs"
          icon={<TrendingDown className="h-4 w-4" />}
          trend="negative"
        />
        
        <QuickInsightCard
          title="Monthly Cash Flow"
          value={`$${results.monthlyCashFlow.toFixed(0)}`}
          subtitle="Income minus expenses"
          icon={<Home className="h-4 w-4" />}
          trend={results.monthlyCashFlow >= 0 ? "positive" : "negative"}
        />
        
        <QuickInsightCard
          title="Expense Ratio"
          value={`${((totalMonthlyExpenses / state.monthlyRent) * 100).toFixed(1)}%`}
          subtitle="Expenses vs. income"
          icon={<Wrench className="h-4 w-4" />}
          trend={((totalMonthlyExpenses / state.monthlyRent) * 100) < 70 ? "positive" : "negative"}
        />
        
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-4">
            <div className="text-sm text-red-800">
              <strong>Monthly Breakdown:</strong>
              <div className="mt-2 space-y-1">
                <div>Mortgage: ${results.mortgagePayment.toFixed(0)}</div>
                <div>Taxes: ${(state.propertyTax / 12).toFixed(0)}</div>
                <div>Insurance: ${(state.insurance / 12).toFixed(0)}</div>
                <div>Maintenance: ${state.maintenanceCost}</div>
                <div>Management: ${state.isFlatFee ? state.managementFee : ((state.monthlyRent * state.managementFee) / 100).toFixed(0)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ROIOperatingExpensesStep;
