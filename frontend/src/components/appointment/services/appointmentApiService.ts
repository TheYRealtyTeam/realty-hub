
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

  // Use the correct way to construct the URL for the Edge Function
  const functionUrl = `${import.meta.env.VITE_SUPABASE_URL || 'https://axgepdguspqqxudqnobz.supabase.co'}/functions/v1/appointment-notification`;
  
  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4Z2VwZGd1c3BxcXh1ZHFub2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjE0MjIsImV4cCI6MjA1OTc5NzQyMn0.GFk04igJ-d6iEB_Da8et-ZVG_eRi9u9xbCbRLnGKdEY'}`
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
