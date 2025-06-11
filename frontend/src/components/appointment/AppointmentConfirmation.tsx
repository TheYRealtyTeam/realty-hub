
import React, { useState, useEffect } from 'react';
import { Check, Calendar, Phone, Video, CalendarPlus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { microsoftGraphApi } from '@/integrations/microsoft/graphApiClient';

interface AppointmentConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentDetails: {
    date: string;
    time: string;
    callType: string;
    name: string;
    message?: string;
  };
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  isOpen,
  onClose,
  appointmentDetails: initialAppointmentDetails
}) => {
  // Store appointment details locally to prevent them from disappearing
  const [appointmentDetails, setAppointmentDetails] = useState(initialAppointmentDetails);
  const [isAddingToMSCalendar, setIsAddingToMSCalendar] = useState(false);
  const [msCalendarConnected, setMsCalendarConnected] = useState(false);
  const { toast } = useToast();

  // Update local state when props change and dialog is opened
  useEffect(() => {
    if (isOpen && initialAppointmentDetails.date) {
      setAppointmentDetails(initialAppointmentDetails);
      console.log("Confirmation dialog opened with details:", initialAppointmentDetails);
      
      // Check if Microsoft Graph API is authenticated
      const isAuthenticated = microsoftGraphApi.init();
      setMsCalendarConnected(isAuthenticated);
    }
  }, [isOpen, initialAppointmentDetails]);

  // Function to add event to Microsoft Calendar
  const addToMicrosoftCalendar = async () => {
    setIsAddingToMSCalendar(true);
    
    try {
      // Check if already authenticated
      if (!microsoftGraphApi.init()) {
        // Start the authentication flow
        microsoftGraphApi.startAuth();
        return; // The page will redirect to Microsoft login
      }
      
      // Create the calendar event
      const result = await microsoftGraphApi.createCalendarEvent(appointmentDetails);
      
      if (result.success) {
        toast({
          title: "Added to Calendar",
          description: "Your appointment has been added to your Microsoft calendar.",
        });
      } else {
        if (result.error === 'not_authenticated') {
          // Start the authentication flow
          microsoftGraphApi.startAuth();
          return;
        } else {
          throw new Error(result.error || 'Unknown error');
        }
      }
    } catch (error) {
      console.error("Error adding to Microsoft Calendar:", error);
      toast({
        title: "Calendar Error",
        description: "Could not add to Microsoft Calendar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToMSCalendar(false);
    }
  };

  // Function to create an iCalendar file and download it
  const downloadICalFile = () => {
    try {
      // Check if we have valid date and time
      if (!appointmentDetails.date || !appointmentDetails.time) {
        toast({
          title: "Missing Information",
          description: "Could not create calendar event due to missing date or time",
          variant: "destructive",
        });
        return;
      }

      // Format the date and time for iCalendar
      const dateStr = appointmentDetails.date;
      const timeStr = appointmentDetails.time;
      
      console.log("Parsing date:", dateStr);
      console.log("Parsing time:", timeStr);
      
      // For dates formatted by date-fns or from the Calendar component
      let startDate: Date;
      
      // Try different date formats
      if (dateStr.includes(',')) {
        // Format like "May 18, 2025"
        const dateParts = dateStr.match(/([A-Za-z]+) (\d+), (\d+)/);
        if (!dateParts) {
          console.error("Could not parse date:", dateStr);
          toast({
            title: "Calendar Error",
            description: "Could not process the appointment date. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
        const months: Record<string, number> = {
          'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
          'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
        };
        
        const month = months[dateParts[1] as keyof typeof months];
        const day = parseInt(dateParts[2], 10);
        const year = parseInt(dateParts[3], 10);
        
        // Parse the time (assumes format like "10:00 AM")
        const timeParts = timeStr.match(/(\d+):(\d+) ([AP]M)/);
        if (!timeParts) {
          console.error("Could not parse time:", timeStr);
          toast({
            title: "Calendar Error",
            description: "Could not process the appointment time. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
        let hour = parseInt(timeParts[1], 10);
        const minute = parseInt(timeParts[2], 10);
        const ampm = timeParts[3];
        
        // Convert from 12-hour to 24-hour format
        if (ampm === "PM" && hour < 12) hour += 12;
        if (ampm === "AM" && hour === 12) hour = 0;
        
        startDate = new Date(year, month, day, hour, minute);
      } else {
        // Fallback to current date and approximate time if format is unexpected
        console.log("Using fallback date parsing");
        startDate = new Date();
        
        // Try to extract hours and minutes from timeStr
        const timeMatch = timeStr.match(/(\d+):(\d+)/);
        if (timeMatch) {
          startDate.setHours(parseInt(timeMatch[1], 10));
          startDate.setMinutes(parseInt(timeMatch[2], 10));
        }
      }
      
      console.log("Parsed date object:", startDate);
      
      // Create end time (1 hour after start)
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
      
      // Format dates for iCalendar
      const formatDate = (date: Date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
      };
      
      const start = formatDate(startDate);
      const end = formatDate(endDate);
      
      // Create iCalendar content
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Y Realty Team//Property Management Consultation//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:Y Realty Team ${appointmentDetails.callType.charAt(0).toUpperCase() + appointmentDetails.callType.slice(1)} Call`,
        'DESCRIPTION:Property Management Consultation with Y Realty Team',
        'LOCATION:Online',
        `ORGANIZER;CN=Y Realty Team:mailto:appointments@yrealty.com`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'BEGIN:VALARM',
        'TRIGGER:-PT15M',
        'ACTION:DISPLAY',
        'DESCRIPTION:Reminder',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      
      // Create and download the file
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'y-realty-appointment.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Calendar Event Created",
        description: "Your appointment has been downloaded as an iCalendar file.",
      });
    } catch (error) {
      console.error("Error creating calendar event:", error);
      toast({
        title: "Calendar Error",
        description: "Could not create calendar event. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Appointment Confirmed!</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-center mb-2">
            Thank you, {appointmentDetails.name}!
          </h3>
          
          <p className="text-gray-600 text-center mb-6">
            Your appointment has been successfully scheduled.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 w-full mb-6">
            <div className="flex items-center mb-3">
              <Calendar className="h-5 w-5 text-yrealty-navy mr-2" />
              <span className="font-medium">{appointmentDetails.date}</span>
            </div>
            <div className="flex items-center mb-3">
              <Clock className="h-5 w-5 text-yrealty-navy mr-2" />
              <span className="font-medium">{appointmentDetails.time}</span>
            </div>
            <div className="flex items-center">
              {appointmentDetails.callType === 'phone' ? (
                <Phone className="h-5 w-5 text-yrealty-navy mr-2" />
              ) : (
                <Video className="h-5 w-5 text-yrealty-navy mr-2" />
              )}
              <span className="font-medium capitalize">{appointmentDetails.callType} Call</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 text-center mb-6">
            We've sent the details to your email. Our team will contact you shortly before the scheduled time.
          </p>
          
          <div className="flex flex-col w-full gap-2">
            <Button 
              onClick={addToMicrosoftCalendar} 
              className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isAddingToMSCalendar}
            >
              <CalendarPlus className="h-4 w-4 mr-2" />
              {isAddingToMSCalendar ? 'Connecting...' : msCalendarConnected ? 'Add to Microsoft Calendar' : 'Connect Microsoft Calendar'}
            </Button>
            
            <Button 
              onClick={downloadICalFile} 
              className="w-full flex items-center justify-center bg-yrealty-blue text-yrealty-navy hover:bg-yrealty-blue/90"
            >
              <CalendarPlus className="h-4 w-4 mr-2" />
              Download iCalendar File
            </Button>
            
            <Button onClick={onClose} className="bg-yrealty-navy hover:bg-yrealty-navy/90 w-full">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentConfirmation;
