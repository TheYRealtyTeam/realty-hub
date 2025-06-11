import { supabase } from '@/integrations/supabase/client';
import { AppointmentFormData } from '../types';

export const saveAppointmentToDatabase = async (
  formattedDate: string,
  selectedTime: string,
  callType: string,
  formData: AppointmentFormData
) => {
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      date: formattedDate,
      time: selectedTime,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      property_type: formData.propertyType,
      message: formData.message || '',
      call_type: callType
    })
    .select();
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const sendAppointmentNotifications = async (
  date: Date,
  selectedTime: string,
  callType: string,
  formData: AppointmentFormData
) => {
  // Format the date for human-readable display
  const readableDate = date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get environment variables securely
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  // Validate that required environment variables are present
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing required environment variables: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
    throw new Error('Configuration error: Missing Supabase credentials');
  }

  const functionUrl = `${supabaseUrl}/functions/v1/appointment-notification`;
  
  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: readableDate,
      time: selectedTime,
      callType: callType,
      propertyType: formData.propertyType,
      message: formData.message || ''
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error sending appointment notifications:", errorData);
    throw new Error("Failed to send email notifications");
  }
  
  return response.json();
};