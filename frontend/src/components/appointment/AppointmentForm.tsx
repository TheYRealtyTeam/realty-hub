
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface AppointmentFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    propertyType: string;
    message: string;
  };
  formErrors?: {
    email: string;
    phone: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isSubmitting: boolean;
  isFormValid: boolean;
  appointmentDetails: {
    date: string;
    time: string;
    callType: string;
  }
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  formData,
  formErrors = { email: '', phone: '' },
  handleChange,
  handleSubmit,
  onBack,
  isSubmitting,
  isFormValid,
  appointmentDetails
}) => {
  // Handle select change separately since the shadcn Select component
  // doesn't work with the standard onChange handler
  const handlePropertyTypeChange = (value: string) => {
    // Create a synthetic event object that matches the expected interface
    const syntheticEvent = {
      target: {
        name: 'propertyType',
        value
      }
    } as React.ChangeEvent<HTMLSelectElement>;
    
    handleChange(syntheticEvent);
  };

  return (
    <div className="reveal">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-yrealty-navy">Your Information</h2>
            <div className="text-sm text-gray-500">Step 2 of 3</div>
          </div>
          <Progress value={66} className="mt-2 h-2" />
        </div>
        
        <div className="mb-6 p-4 bg-yrealty-blue rounded-lg">
          <p className="font-medium text-yrealty-navy">Selected Appointment:</p>
          <p className="text-gray-700">
            {appointmentDetails.date} at {appointmentDetails.time}
          </p>
          <p className="text-gray-700 mt-1">
            Call type: <span className="font-medium capitalize">{appointmentDetails.callType}</span>
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field w-full rounded-md border border-gray-300 px-4 py-3"
              placeholder="Your name"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`input-field w-full rounded-md border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} px-4 py-3`}
                placeholder="Your email"
                disabled={isSubmitting}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`input-field w-full rounded-md border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} px-4 py-3`}
                placeholder="Your phone"
                disabled={isSubmitting}
              />
              {formErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <Select
              name="propertyType"
              value={formData.propertyType}
              onValueChange={handlePropertyTypeChange}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="multi-family">Multi-Family</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="input-field resize-none w-full rounded-md border border-gray-300 px-4 py-3"
              placeholder="Tell us about your property management needs or any questions you have"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex gap-4 pt-2">
            <Button 
              type="button" 
              variant="outline"
              className="flex-1"
              onClick={onBack}
              disabled={isSubmitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-yrealty-navy hover:bg-yrealty-navy/90"
              disabled={isSubmitting || !isFormValid}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
