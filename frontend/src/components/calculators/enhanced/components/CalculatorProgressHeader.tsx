
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calculator, TrendingUp, DollarSign, PieChart } from 'lucide-react';

const steps = [
  { id: 1, title: 'Property Details', icon: <DollarSign className="h-4 w-4" /> },
  { id: 2, title: 'Financing', icon: <Calculator className="h-4 w-4" /> },
  { id: 3, title: 'Income & Expenses', icon: <TrendingUp className="h-4 w-4" /> },
  { id: 4, title: 'Results', icon: <PieChart className="h-4 w-4" /> }
];

interface CalculatorProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
}

const CalculatorProgressHeader = ({ currentStep, totalSteps }: CalculatorProgressHeaderProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <Card className="mb-6 bg-gradient-to-r from-yrealty-navy to-yrealty-blue text-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-2xl font-bold">Property Investment Calculator</CardTitle>
          <Badge variant="secondary" className="bg-white/20 text-white">
            Step {currentStep} of {totalSteps}
          </Badge>
        </div>
        
        <Progress value={progressPercentage} className="h-2 bg-white/20" />
        
        <div className="flex items-center justify-between mt-4">
          {steps.map((step) => (
            <div 
              key={step.id}
              className={`flex items-center space-x-2 ${
                step.id <= currentStep ? 'text-white' : 'text-white/60'
              }`}
            >
              <div className={`p-2 rounded-full ${
                step.id <= currentStep ? 'bg-yrealty-accent' : 'bg-white/20'
              }`}>
                {step.icon}
              </div>
              <span className="text-sm font-medium hidden md:block">{step.title}</span>
            </div>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
};

export default CalculatorProgressHeader;
