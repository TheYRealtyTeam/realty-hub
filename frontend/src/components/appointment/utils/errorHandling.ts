
import { ToastFunction } from '../types/toastTypes';

export const handleAppointmentError = (error: any, toast: ToastFunction) => {
  console.error('Error scheduling appointment:', error);
  
  // More specific error messages based on error type
  if (error.code === '23505') {
    toast({
      title: "Duplicate Appointment",
      description: "You already have an appointment scheduled at this time. Please choose a different time.",
      variant: "destructive",
    });
  } else if (error.code === '23502') {
    toast({
      title: "Missing Information",
      description: "Some required information is missing. Please check all fields and try again.",
      variant: "destructive",
    });
  } else if (error.message?.includes('network')) {
    toast({
      title: "Network Error",
      description: "Unable to connect to our servers. Please check your internet connection and try again.",
      variant: "destructive",
    });
  } else {
    toast({
      title: "Submission Error",
      description: "There was a problem scheduling your appointment. Please try again or contact us directly.",
      variant: "destructive",
    });
  }
};
