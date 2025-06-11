
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Handle CORS preflight requests
function handleCors(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }
}

// Initialize Supabase client with Deno environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://axgepdguspqqxudqnobz.supabase.co";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Function to send an email notification
async function sendEmailNotification(submissionData: any) {
  const recipientEmail = "info@theYteam.co";
  const subject = `New Contact Form Submission from ${submissionData.name}`;
  
  // Create HTML email body with submission details
  const htmlBody = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${submissionData.name}</p>
    <p><strong>Email:</strong> ${submissionData.email}</p>
    <p><strong>Phone:</strong> ${submissionData.phone || "Not provided"}</p>
    <p><strong>Property Type:</strong> ${submissionData.property_type}</p>
    <p><strong>Message:</strong></p>
    <p>${submissionData.message}</p>
    <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
  `;
  
  try {
    // Send email using Supabase edge function
    const { error } = await supabase.auth.admin.createUser({
      email: recipientEmail,
      email_confirm: true,
      user_metadata: {
        subject,
        content: htmlBody,
        forceEmailNotification: true
      }
    });
    
    if (error) {
      console.error("Error sending email notification:", error);
      return false;
    }
    
    console.log("Email notification sent successfully to:", recipientEmail);
    return true;
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return false;
  }
}

serve(async (req) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Get the form data from the request
    const formData = await req.json();

    // Create a contact_submissions record
    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      property_type: formData.property_type,
      message: formData.message,
      created_at: new Date().toISOString(),
    };

    console.log("Contact form submission received:", submissionData);

    // Store the submission in Supabase
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([submissionData])
      .select();

    if (error) {
      console.error("Error storing contact submission:", error);
      throw new Error("Failed to store contact submission");
    }

    // Send email notification
    const emailSent = await sendEmailNotification(submissionData);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact message received and stored",
        emailSent: emailSent,
        data: data,
        recipientEmail: "info@theYteam.co" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
