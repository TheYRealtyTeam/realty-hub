
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Phone, Video, User, Mail, Building2, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { AppointmentFormData, AppointmentDetails } from './types';
import { Card, CardContent } from '@/components/ui/card';

interface ConfirmationStepProps {
  formData: AppointmentFormData;
  appointmentDetails: AppointmentDetails;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  formData,
  appointmentDetails,
  onBack,
  onSubmit,
  isSubmitting
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-yrealty-navy">Review & Confirm</h2>
          <div className="text-sm text-gray-500">Step 3 of 3</div>
        </div>
        <Progress value={100} className="mt-2 h-2" />
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">Please review your appointment details</h3>
        
        <Card className="mb-4 bg-yrealty-blue/20 border-yrealty-navy/20">
          <CardContent className="pt-6">
            <h4 className="font-semibold text-yrealty-navy mb-2">Appointment Details</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-yrealty-navy mr-2" />
                <span>{appointmentDetails.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yrealty-navy mr-2" />
                <span>{appointmentDetails.time}</span>
              </div>
              <div className="flex items-center">
                {appointmentDetails.callType === 'phone' ? (
                  <Phone className="h-5 w-5 text-yrealty-navy mr-2" />
                ) : (
                  <Video className="h-5 w-5 text-yrealty-navy mr-2" />
                )}
                <span className="capitalize">{appointmentDetails.callType} Call</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yrealty-blue/10 border-yrealty-navy/10">
          <CardContent className="pt-6">
            <h4 className="font-semibold text-yrealty-navy mb-2">Your Information</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <User className="h-5 w-5 text-yrealty-navy mr-2" />
                <span>{formData.name}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-yrealty-navy mr-2" />
                <span>{formData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-yrealty-navy mr-2" />
                <span>{formData.phone}</span>
              </div>
              <div className="flex items-center">
                <Building2 className="h-5 w-5 text-yrealty-navy mr-2" />
                <span className="capitalize">{formData.propertyType}</span>
              </div>
              {formData.message && (
                <div className="mt-2">
                  <p className="font-medium text-sm text-gray-700">Additional notes:</p>
                  <p className="text-gray-600 text-sm">{formData.message}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <form onSubmit={onSubmit}>
        <div className="flex gap-4">
          <Button 
            type="button" 
            variant="outline"
            className="flex-1"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button 
            type="submit" 
            className="flex-1 bg-yrealty-navy hover:bg-yrealty-navy/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Scheduling...' : 'Confirm Appointment'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmationStep;
