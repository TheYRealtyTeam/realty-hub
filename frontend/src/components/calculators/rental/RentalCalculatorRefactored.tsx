
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import PropertyInputForm from './components/PropertyInputForm';
import ResultsDisplay from './components/ResultsDisplay';
import { useRentalCalculations } from './hooks/useRentalCalculations';

interface RentalCalculatorRefactoredProps {
  sharedState: {
    propertyValue: number;
    downPaymentPercent: number;
    downPaymentAmount: number;
    monthlyRent: number;
    propertyTax: number;
    insurance: number;
    maintenanceCost: number;
    vacancyRate: number;
    managementFee: number;
    mortgagePayment: number;
    otherExpenses: number;
    isFlatFee: boolean;
    isYearly: boolean;
  };
  updateSharedState: (updates: Partial<RentalCalculatorRefactoredProps['sharedState']>) => void;
}

const RentalCalculatorRefactored = ({ sharedState, updateSharedState }: RentalCalculatorRefactoredProps) => {
  const [showResults, setShowResults] = useState(false);
  const results = useRentalCalculations(sharedState);
  
  const handleCalculate = () => {
    setShowResults(true);
  };
  
  return (
    <div>
      <PropertyInputForm 
        sharedState={sharedState}
        updateSharedState={updateSharedState}
      />
      
      <div className="mt-6">
        <Button 
          onClick={handleCalculate}
          className="w-full bg-yrealty-navy hover:bg-yrealty-navy/90"
        >
          Calculate
        </Button>
      </div>
      
      {showResults && (
        <ResultsDisplay 
          results={results}
          downPaymentPercent={sharedState.downPaymentPercent}
          downPaymentAmount={sharedState.downPaymentAmount}
        />
      )}
    </div>
  );
};

export default RentalCalculatorRefactored;
