
import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import AppointmentScheduler from '@/components/AppointmentScheduler';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Video, Clock, CheckCircle2 } from 'lucide-react';
import { microsoftGraphApi } from '@/integrations/microsoft/graphApiClient';

const Appointment = () => {
  useEffect(() => {
    document.title = "Schedule an Appointment | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  // Check if Microsoft calendar is connected
  const isMicrosoftConnected = microsoftGraphApi.init();

  return (
    <PageLayout 
      title="Schedule a Consultation" 
      subtitle="Book a time to speak with one of our property management specialists about your needs"
    >
      <section className="bg-white">
        <div className="max-w-3xl mx-auto">
          <AppointmentScheduler />
        </div>
        
        {/* Benefits section */}
        <div className="mt-16 reveal max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <Card>
              <CardHeader className="pb-2">
                <Calendar className="h-6 w-6 text-yrealty-navy mb-2" />
                <CardTitle>Convenient Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Choose from a range of available time slots that work with your schedule. 
                  All appointments can be easily added to your calendar.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <Video className="h-6 w-6 text-yrealty-navy mb-2" />
                <CardTitle>Your Preferred Format</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Select between phone or video consultations based on your comfort and availability.
                  Video calls allow for more detailed discussions about properties.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <Clock className="h-6 w-6 text-yrealty-navy mb-2" />
                <CardTitle>Expert Advice</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive personalized guidance from our team of property management specialists
                  with years of experience in the local market.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          
          {isMicrosoftConnected && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-12 flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
              <p className="text-green-800 text-sm">
                Your Microsoft calendar is connected. Appointments will be automatically synced.
              </p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Appointment;
