
import { AppointmentFormData } from '../types';
import { validateEmail, validatePhone } from '../utils/validationUtils';
import { ToastFunction } from '../types/toastTypes';

export const validateAppointmentData = (
  date: Date | undefined,
  selectedTime: string,
  callType: string,
  formData: AppointmentFormData,
  toast: ToastFunction
): boolean => {
  // Validate date
  if (!date) {
    toast({
      title: "Missing Information",
      description: "Please select a date for your appointment.",
      variant: "destructive",
    });
    return false;
  }
  
  // Validate time
  if (!selectedTime) {
    toast({
      title: "Missing Information",
      description: "Please select a time for your appointment.",
      variant: "destructive",
    });
    return false;
  }
  
  // Validate call type
  if (!callType) {
    toast({
      title: "Missing Information",
      description: "Please select either phone or video call.",
      variant: "destructive",
    });
    return false;
  }
  
  // Validate name
  if (!formData.name || formData.name.trim() === '') {
    toast({
      title: "Missing Information",
      description: "Please enter your full name.",
      variant: "destructive",
    });
    return false;
  }
  
  // Validate property type
  if (!formData.propertyType) {
    toast({
      title: "Missing Information",
      description: "Please select a property type.",
      variant: "destructive",
    });
    return false;
  }
  
  // Validate email format
  if (!validateEmail(formData.email)) {
    toast({
      title: "Invalid Email",
      description: "The email address you entered is not valid. Please check and try again.",
      variant: "destructive",
    });
    return false;
  }
  
  // Validate phone format
  if (!validatePhone(formData.phone)) {
    toast({
      title: "Invalid Phone Number",
      description: "The phone number you entered is not valid. Please use format (XXX) XXX-XXXX.",
      variant: "destructive",
    });
    return false;
  }
  
  return true;
};
