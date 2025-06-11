
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AppointmentDetails {
  date: string;
  time: string;
  callType: string;
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const appointmentDetails: AppointmentDetails = await req.json();
    const { name, email, date, time, callType, propertyType, message, phone } = appointmentDetails;

    console.log("Received appointment details:", appointmentDetails);

    // Generate iCal content
    const icalContent = generateICalContent(appointmentDetails);

    // Send confirmation email to client
    const clientEmailResponse = await resend.emails.send({
      from: "Y Realty Team <appointments@theyteam.co>",
      to: [email],
      subject: "Your Appointment Confirmation with Y Realty Team",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Appointment Confirmed!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for scheduling a consultation with Y Realty Team. Your appointment has been confirmed:</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Format:</strong> ${callType.charAt(0).toUpperCase() + callType.slice(1)} Call</p>
            <p><strong>Property Type:</strong> ${propertyType}</p>
          </div>
          <p>Our team will contact you shortly before the scheduled time. If you need to reschedule, please contact us at appointments@theyteam.co or call (555) 123-4567.</p>
          <p>We look forward to helping you with your property management needs!</p>
          <p>Best regards,<br>Y Realty Team</p>
        </div>
      `,
      attachments: [
        {
          filename: "appointment.ics",
          content: icalContent,
        },
      ],
    });

    // Send notification email to business
    const businessEmailResponse = await resend.emails.send({
      from: "Y Realty Team <appointments@theyteam.co>",
      to: ["appointments@theyteam.co"], // Replace with your actual business email
      subject: `New Appointment: ${name} on ${date} at ${time}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">New Appointment Scheduled</h2>
          <p>A new appointment has been scheduled:</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Client Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Format:</strong> ${callType.charAt(0).toUpperCase() + callType.slice(1)} Call</p>
            <p><strong>Property Type:</strong> ${propertyType}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          </div>
          <p>Remember to prepare for this appointment and contact the client to confirm.</p>
        </div>
      `,
      attachments: [
        {
          filename: "appointment.ics",
          content: icalContent,
        },
      ],
    });

    console.log("Client email sent:", clientEmailResponse);
    console.log("Business email sent:", businessEmailResponse);

    return new Response(
      JSON.stringify({ 
        clientEmail: clientEmailResponse, 
        businessEmail: businessEmailResponse 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in appointment-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

// Function to generate iCal content
function generateICalContent(appointment: AppointmentDetails): string {
  const { date, time, callType, name } = appointment;
  
  // Parse date and time
  let startDate: Date;
  
  try {
    // For dates formatted by date-fns or from the Calendar component
    // Try to parse different date formats
    if (date.includes(',')) {
      // Format like "May 18, 2025"
      const dateParts = date.match(/([A-Za-z]+) (\d+), (\d+)/);
      if (!dateParts) {
        throw new Error("Could not parse date format");
      }
      
      const months: Record<string, number> = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
      };
      
      const month = months[dateParts[1] as keyof typeof months];
      const day = parseInt(dateParts[2], 10);
      const year = parseInt(dateParts[3], 10);
      
      // Parse the time (assumes format like "10:00 AM")
      const timeParts = time.match(/(\d+):(\d+) ([AP]M)/);
      if (!timeParts) {
        throw new Error("Could not parse time format");
      }
      
      let hour = parseInt(timeParts[1], 10);
      const minute = parseInt(timeParts[2], 10);
      const ampm = timeParts[3];
      
      // Convert from 12-hour to 24-hour format
      if (ampm === "PM" && hour < 12) hour += 12;
      if (ampm === "AM" && hour === 12) hour = 0;
      
      startDate = new Date(year, month, day, hour, minute);
    } else {
      // Try ISO format or other formats
      startDate = new Date(`${date}T${time}`);
    }
    
    // If date is invalid, throw an error
    if (isNaN(startDate.getTime())) {
      throw new Error("Invalid date");
    }
  } catch (error) {
    console.error("Error parsing date:", error);
    // Fallback to current date as a last resort
    startDate = new Date();
    startDate.setHours(startDate.getHours() + 1); // Set to 1 hour from now
  }
  
  // Create end time (1 hour after start)
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  
  // Format dates for iCalendar
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };
  
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  const now = formatDate(new Date());
  
  // Create iCalendar content
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Y Realty Team//Property Management Consultation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `DTSTAMP:${now}`,
    `SUMMARY:Y Realty Team ${callType.charAt(0).toUpperCase() + callType.slice(1)} Call with ${name}`,
    'DESCRIPTION:Property Management Consultation with Y Realty Team',
    `ORGANIZER;CN=Y Realty Team:mailto:appointments@yrealty.com`,
    'LOCATION:Online',
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
  
  return icsContent;
}

serve(handler);
