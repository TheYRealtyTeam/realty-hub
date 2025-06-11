
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DollarSign, TrendingDown, Home, Wrench } from 'lucide-react';
import { CalculatorState, CalculatorResults } from '../types';
import QuickInsightCard from '../components/QuickInsightCard';

interface IncomeExpensesStepProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
  results: CalculatorResults;
}

const IncomeExpensesStep = ({ state, updateState, results }: IncomeExpensesStepProps) => {
  const handleChange = (field: keyof CalculatorState, value: string | number | boolean) => {
    updateState({ [field]: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="space-y-6">
          {/* Income Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>Rental Income</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-gray-700">
                    {state.isYearly ? 'Annual' : 'Monthly'} Rent
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Monthly</span>
                    <Switch 
                      checked={state.isYearly}
                      onCheckedChange={(checked) => handleChange('isYearly', checked)}
                      className="data-[state=checked]:bg-yrealty-navy"
                    />
                    <span className="text-xs text-gray-500">Annual</span>
                  </div>
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    value={state.monthlyRent}
                    onChange={(e) => handleChange('monthlyRent', parseFloat(e.target.value) || 0)}
                    className="pl-10"
                    placeholder={state.isYearly ? "24,000" : "2,000"}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expenses Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <span>Operating Expenses</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Annual Property Tax</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      value={state.propertyTax}
                      onChange={(e) => handleChange('propertyTax', parseFloat(e.target.value) || 0)}
                      className="pl-10"
                      placeholder="3,000"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Annual Insurance</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      value={state.insurance}
                      onChange={(e) => handleChange('insurance', parseFloat(e.target.value) || 0)}
                      className="pl-10"
                      placeholder="1,200"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Monthly Maintenance</Label>
                  <div className="relative mt-1">
                    <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      value={state.maintenanceCost}
                      onChange={(e) => handleChange('maintenanceCost', parseFloat(e.target.value) || 0)}
                      className="pl-10"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Vacancy Rate (%)</Label>
                  <div className="relative mt-1">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      value={state.vacancyRate}
                      onChange={(e) => handleChange('vacancyRate', parseFloat(e.target.value) || 0)}
                      className="pl-10"
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Management Fee {state.isFlatFee ? '(Monthly $)' : '(% of Rent)'}
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Percentage</span>
                    <Switch 
                      checked={state.isFlatFee}
                      onCheckedChange={(checked) => handleChange('isFlatFee', checked)}
                      className="data-[state=checked]:bg-yrealty-navy"
                    />
                    <span className="text-xs text-gray-500">Flat Fee</span>
                  </div>
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    value={state.managementFee}
                    onChange={(e) => handleChange('managementFee', parseFloat(e.target.value) || 0)}
                    className="pl-10"
                    placeholder={state.isFlatFee ? "200" : "8"}
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Other Monthly Expenses</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    value={state.otherExpenses}
                    onChange={(e) => handleChange('otherExpenses', parseFloat(e.target.value) || 0)}
                    className="pl-10"
                    placeholder="100"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  HOA fees, utilities, landscaping, etc.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <QuickInsightCard
          title="Monthly Income"
          value={`$${results.monthlyIncome.toLocaleString()}`}
          subtitle="Gross rental income"
          icon={<DollarSign className="h-4 w-4" />}
          trend="positive"
        />
        
        <QuickInsightCard
          title="Monthly Expenses"
          value={`$${results.monthlyExpenses.toLocaleString()}`}
          subtitle="Total operating costs"
          icon={<TrendingDown className="h-4 w-4" />}
          trend="negative"
        />

        <QuickInsightCard
          title="Net Cash Flow"
          value={`$${results.monthlyCashFlow.toLocaleString()}`}
          subtitle="Monthly profit/loss"
          icon={<DollarSign className="h-4 w-4" />}
          trend={results.monthlyCashFlow > 0 ? "positive" : "negative"}
        />

        <Card className="bg-gradient-to-br from-yrealty-navy to-yrealty-blue text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <h4 className="font-bold text-lg mb-2">Expense Ratio</h4>
              <div className="text-2xl font-bold mb-1">
                {((results.monthlyExpenses / results.monthlyIncome) * 100).toFixed(1)}%
              </div>
              <p className="text-sm opacity-90">
                {((results.monthlyExpenses / results.monthlyIncome) * 100) < 50 
                  ? 'Excellent expense management'
                  : ((results.monthlyExpenses / results.monthlyIncome) * 100) < 70
                  ? 'Good expense control'
                  : 'Consider optimizing expenses'
                }
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-3">Expense Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Property Tax:</span>
                <span className="font-medium">${(state.propertyTax / 12).toFixed(0)}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance:</span>
                <span className="font-medium">${(state.insurance / 12).toFixed(0)}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Maintenance:</span>
                <span className="font-medium">${state.maintenanceCost}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mortgage:</span>
                <span className="font-medium">${results.mortgagePayment.toFixed(0)}/mo</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IncomeExpensesStep;
