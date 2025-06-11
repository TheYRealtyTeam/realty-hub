
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AppointmentFormData } from '../types';
import { submitAppointmentData } from '../services/submissionService';
import { useConfirmationDialog } from './useConfirmationDialog';

export const useAppointmentSubmission = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { 
    showConfirmation, 
    setShowConfirmation, 
    handleConfirmationClose 
  } = useConfirmationDialog();

  const submitAppointment = async (
    date: Date | undefined, 
    selectedTime: string, 
    callType: string, 
    formData: AppointmentFormData,
    onSuccess: () => void
  ) => {
    await submitAppointmentData(
      date,
      selectedTime,
      callType,
      formData,
      toast,
      setIsSubmitting,
      setShowConfirmation
    );
  };

  return {
    isSubmitting,
    showConfirmation,
    setShowConfirmation,
    submitAppointment,
    handleConfirmationClose
  };
};
