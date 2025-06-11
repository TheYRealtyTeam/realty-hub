
import React from 'react';
import PropertyDetailsStep from './steps/PropertyDetailsStep';
import FinancingStep from './steps/FinancingStep';
import IncomeExpensesStep from './steps/IncomeExpensesStep';
import ResultsDashboard from './ResultsDashboard';
import CalculatorProgressHeader from './components/CalculatorProgressHeader';
import CalculatorNavigation from './components/CalculatorNavigation';
import { useRentalCalculator } from './hooks/useRentalCalculator';
import { useStepNavigation } from './hooks/useStepNavigation';

interface EnhancedRentalCalculatorProps {
  sharedState: any;
  updateSharedState: (updates: any) => void;
}

const TOTAL_STEPS = 4;

const EnhancedRentalCalculator = ({ sharedState, updateSharedState }: EnhancedRentalCalculatorProps) => {
  const { currentStep, nextStep, prevStep } = useStepNavigation(TOTAL_STEPS);
  const { calculatorState, results, updateCalculatorState } = useRentalCalculator(sharedState, updateSharedState);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PropertyDetailsStep 
            state={calculatorState} 
            updateState={updateCalculatorState}
            results={results}
          />
        );
      case 2:
        return (
          <FinancingStep 
            state={calculatorState} 
            updateState={updateCalculatorState}
            results={results}
          />
        );
      case 3:
        return (
          <IncomeExpensesStep 
            state={calculatorState} 
            updateState={updateCalculatorState}
            results={results}
          />
        );
      case 4:
        return (
          <ResultsDashboard 
            state={calculatorState} 
            results={results}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <CalculatorProgressHeader 
        currentStep={currentStep} 
        totalSteps={TOTAL_STEPS} 
      />

      <div className="animate-fade-in">
        {renderStep()}
      </div>

      <CalculatorNavigation
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onPrevious={prevStep}
        onNext={nextStep}
      />
    </div>
  );
};

export default EnhancedRentalCalculator;
