
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calendar, Target, TrendingUp } from 'lucide-react';
import QuickInsightCard from '../../components/QuickInsightCard';
import { ROICalculatorState, ROIResults } from '../../types/roiTypes';

interface ROIInvestmentTimelineStepProps {
  state: ROICalculatorState;
  updateState: (updates: Partial<ROICalculatorState>) => void;
  results: ROIResults;
}

const ROIInvestmentTimelineStep = ({ state, updateState, results }: ROIInvestmentTimelineStepProps) => {
  const handleChange = (field: keyof ROICalculatorState, value: string | number) => {
    updateState({ [field]: typeof value === 'string' ? parseFloat(value) || 0 : value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-yrealty-navy">Investment Timeline & Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="holdingPeriod">Holding Period (years)</Label>
              <Select 
                value={state.holdingPeriod.toString()} 
                onValueChange={(value) => updateState({ holdingPeriod: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 year</SelectItem>
                  <SelectItem value="3">3 years</SelectItem>
                  <SelectItem value="5">5 years</SelectItem>
                  <SelectItem value="7">7 years</SelectItem>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">How long you plan to hold the property</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetReturn">Target Annual Return (%)</Label>
              <div className="space-y-2">
                <Input
                  id="targetReturn"
                  type="number"
                  step="0.1"
                  min="0"
                  max="30"
                  value={state.targetReturn}
                  onChange={(e) => handleChange('targetReturn', e.target.value)}
                  className="text-lg"
                />
                <Slider
                  value={[state.targetReturn]}
                  onValueChange={(value) => updateState({ targetReturn: value[0] })}
                  max={20}
                  min={5}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <p className="text-xs text-gray-500">Your desired annual return on investment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interestRate">Mortgage Interest Rate (%)</Label>
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
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Select 
                  value={state.loanTerm.toString()} 
                  onValueChange={(value) => updateState({ loanTerm: parseInt(value) })}
                >
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

            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Investment Strategy Tips</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Longer holding periods typically provide better returns</li>
                <li>• Consider tax implications of your timeline</li>
                <li>• Factor in refinancing opportunities</li>
                <li>• Plan exit strategy from the beginning</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <QuickInsightCard
          title="Projected ROI"
          value={`${results.annualizedROI.toFixed(1)}%`}
          subtitle="Annualized return"
          icon={<Target className="h-4 w-4" />}
          trend={results.annualizedROI >= state.targetReturn ? "positive" : "negative"}
        />
        
        <QuickInsightCard
          title="Total Cash Flow"
          value={`$${results.totalCashFlow.toLocaleString()}`}
          subtitle={`Over ${state.holdingPeriod} years`}
          icon={<Calendar className="h-4 w-4" />}
          trend={results.totalCashFlow >= 0 ? "positive" : "negative"}
        />
        
        <QuickInsightCard
          title="Projected Net Worth"
          value={`$${results.projectedNetWorth.toLocaleString()}`}
          subtitle="Investment + profits"
          icon={<TrendingUp className="h-4 w-4" />}
          trend="positive"
        />
        
        <Card className={`border-2 ${results.annualizedROI >= state.targetReturn ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
          <CardContent className="pt-4">
            <div className={`text-sm ${results.annualizedROI >= state.targetReturn ? 'text-green-800' : 'text-yellow-800'}`}>
              <strong>Goal Assessment:</strong>
              <div className="mt-2 space-y-1">
                <div>Target: {state.targetReturn}% annually</div>
                <div>Projected: {results.annualizedROI.toFixed(1)}% annually</div>
                <div className="font-medium">
                  {results.annualizedROI >= state.targetReturn ? '✓ Goal Met!' : '⚠ Below Target'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ROIInvestmentTimelineStep;
