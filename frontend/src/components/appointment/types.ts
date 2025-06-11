
export type AppointmentStep = 'dateSelection' | 'personalInfo' | 'confirmation';

export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  message: string; // Changed from message?: string to make it required
}

export interface FormErrors {
  email: string;
  phone: string;
}

export interface AppointmentDetails {
  date: string;
  time: string;
  callType: string;
  name: string;
}

export interface ToastFunction {
  (props: {
    title?: string;
    description?: string;
    variant?: 'default' | 'destructive';
  }): void;
}
