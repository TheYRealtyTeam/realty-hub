
import { useEffect } from 'react';
import { useAppointmentForm } from './hooks/useAppointmentForm';
import { useDateTimeSelection } from './hooks/useDateTimeSelection';
import { useStepNavigation } from './hooks/useStepNavigation';
import { useAppointmentSubmission } from './hooks/useAppointmentSubmission';
import { isDateDisabled, formatDate } from './utils/validationUtils';
import { toast } from '@/components/ui/use-toast';

const useAppointment = () => {
  // Combine the smaller hooks
  const {
    formData,
    formErrors,
    handleChange,
    checkFormValidity,
    resetFormData
  } = useAppointmentForm();

  const {
    date,
    setDate,
    selectedTime,
    callType,
    setCallType,
    availableTimes,
    handleTimeSelect,
    isFirstStepValid,
    resetDateTimeSelection
  } = useDateTimeSelection();

  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep
  } = useStepNavigation();

  const {
    isSubmitting,
    showConfirmation,
    setShowConfirmation,
    submitAppointment,
    handleConfirmationClose
  } = useAppointmentSubmission();

  // Format the date for display
  const formattedDate = formatDate(date);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 'personalInfo') {
      // Move to confirmation step instead of submitting directly
      goToNextStep(true);
    } else if (currentStep === 'confirmation') {
      // Only submit when on confirmation step
      await submitAppointment(date, selectedTime, callType, formData, () => {
        // This success callback will now be called in handleConfirmationClose
      });
    }
  };

  // New function to reset form after confirmation is closed
  const handleConfirmationAndReset = () => {
    handleConfirmationClose(() => {
      // Reset form after dialog is closed
      resetFormData();
      resetDateTimeSelection();
      setCurrentStep('dateSelection');
    });
  };

  // Check if the form is valid to enable "Review" button
  const isFormValid = checkFormValidity(date, selectedTime, callType);

  // Check if the first step is valid to enable "Continue" button
  useEffect(() => {
    console.log("Date selection state:", { date, selectedTime, callType });
  }, [date, selectedTime, callType]);

  return {
    // Date and Time Selection
    date,
    setDate,
    selectedTime,
    callType,
    setCallType,
    availableTimes,
    handleTimeSelect,
    isDateDisabled,
    
    // Form data and handling
    formData,
    formErrors,
    handleChange,
    
    // Submission state
    isSubmitting,
    handleSubmit,
    isFormValid: isFormValid,
    
    // Confirmation dialog
    showConfirmation,
    // Update this line to call handleConfirmationAndReset directly without arguments
    setShowConfirmation: () => handleConfirmationAndReset(),
    
    // Formatted date for display
    formattedDate,
    
    // Step navigation
    currentStep,
    goToNextStep: () => goToNextStep(isFirstStepValid()),
    goToPreviousStep,
    isFirstStepValid: isFirstStepValid()
  };
};

export default useAppointment;
