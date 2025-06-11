
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalculatorNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

const CalculatorNavigation = ({ currentStep, totalSteps, onPrevious, onNext }: CalculatorNavigationProps) => {
  if (currentStep >= totalSteps) return null;

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Real-time calculations update as you type
            </p>
          </div>
          
          <Button 
            onClick={onNext}
            className="bg-yrealty-navy hover:bg-yrealty-navy/90 flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalculatorNavigation;
