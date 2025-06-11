
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AppointmentStep } from '../types';

export const useStepNavigation = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<AppointmentStep>('dateSelection');

  // Step navigation functions
  const goToNextStep = (isValid: boolean) => {
    if (currentStep === 'dateSelection') {
      if (!isValid) {
        toast({
          title: "Incomplete Selection",
          description: "Please select a date, time, and call type before continuing.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep('personalInfo');
    } else if (currentStep === 'personalInfo') {
      setCurrentStep('confirmation');
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === 'personalInfo') {
      setCurrentStep('dateSelection');
    } else if (currentStep === 'confirmation') {
      setCurrentStep('personalInfo');
    }
  };

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep
  };
};
