
import { useState, ChangeEvent } from 'react';
import { AppointmentFormData, FormErrors } from '../types';
import { validateEmail, validatePhone } from '../utils/validationUtils';

export const useAppointmentForm = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: '' // Initialize with empty string instead of undefined
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: '',
    phone: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate email and phone as user types
    if (name === 'email') {
      if (!value) {
        setFormErrors(prev => ({ ...prev, email: '' }));
      } else if (!validateEmail(value)) {
        setFormErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setFormErrors(prev => ({ ...prev, email: '' }));
      }
    }
    
    if (name === 'phone') {
      if (!value) {
        setFormErrors(prev => ({ ...prev, phone: '' }));
      } else if (!validatePhone(value)) {
        setFormErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number' }));
      } else {
        setFormErrors(prev => ({ ...prev, phone: '' }));
      }
    }
  };

  /**
   * Check if form is valid (required fields and format validation)
   */
  const checkFormValidity = (date: Date | undefined, selectedTime: string, callType: string): boolean => {
    const { name, email, phone, propertyType } = formData;
    
    // Basic required field validation
    if (!name || !email || !phone || !propertyType || !date || !selectedTime || !callType) {
      return false;
    }
    
    // Format validation
    if (!validateEmail(email) || !validatePhone(phone)) {
      return false;
    }
    
    return true;
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyType: '',
      message: '' // Make sure to reset with empty string
    });
  };

  return {
    formData,
    formErrors,
    handleChange,
    checkFormValidity,
    resetFormData
  };
};
