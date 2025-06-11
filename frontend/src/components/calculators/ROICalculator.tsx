
import React from 'react';
import { Button } from '@/components/ui/button';
import ROIInputForm from './roi/components/ROIInputForm';
import ROIResultsDisplay from './roi/components/ROIResultsDisplay';
import { useROICalculations } from './roi/hooks/useROICalculations';

interface ROICalculatorProps {
  sharedState: {
    propertyValue: number;
    downPaymentAmount: number;
    downPaymentPercent: number;
    closingCosts: number;
    renovationCosts: number;
    monthlyRent: number;
    mortgagePayment: number;
    propertyTax: number;
    insurance: number;
    maintenanceCost: number;
    vacancyRate: number;
    managementFee: number;
    isFlatFee: boolean;
    otherExpenses: number;
    interestRate: number;
    annualAppreciation: number;
    holdingPeriod: number;
  };
  updateSharedState: (updates: Partial<ROICalculatorProps['sharedState']>) => void;
}

const ROICalculator = ({ sharedState, updateSharedState }: ROICalculatorProps) => {
  const { results, showResults, calculateResults } = useROICalculations(sharedState);
  
  return (
    <div>
      <ROIInputForm 
        sharedState={sharedState}
        updateSharedState={updateSharedState}
      />
      
      <div className="mt-6">
        <Button 
          onClick={calculateResults}
          className="w-full bg-yrealty-navy hover:bg-yrealty-navy/90"
        >
          Calculate
        </Button>
      </div>
      
      <ROIResultsDisplay 
        results={results}
        showResults={showResults}
      />
    </div>
  );
};

export default ROICalculator;
