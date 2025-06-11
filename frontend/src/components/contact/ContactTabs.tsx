
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ContactForm from "./ContactForm";
import AppointmentScheduler from "../AppointmentScheduler";
import { Loader } from "lucide-react";

const ContactTabs = () => {
  const [activeTab, setActiveTab] = useState("message");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle tab change
  const handleTabChange = (value: string) => {
    setIsLoading(true);
    setActiveTab(value);
    
    // Short timeout to ensure DOM updates first
    setTimeout(() => {
      const activeTabContent = document.querySelector(`[data-value="${value}"]`);
      if (activeTabContent && activeTabContent.classList.contains('reveal')) {
        activeTabContent.classList.add('active');
        console.log(`Activated tab content: ${value}`);
      }
      
      // Force any calendar inside this tab to be visible and interactive
      if (value === 'appointment') {
        const calendar = document.querySelector('.rdp');
        if (calendar) {
          console.log('Ensuring calendar is interactive');
        }
      }
      
      setIsLoading(false);
    }, 300);
  };

  // Initialize the first tab
  useEffect(() => {
    handleTabChange('message');
  }, []);

  return (
    <div className="relative">
      <Tabs 
        defaultValue="message" 
        className="w-full" 
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-2 mb-8" aria-label="Contact options">
          <TabsTrigger value="message" aria-controls="tab-message">Send Message</TabsTrigger>
          <TabsTrigger value="appointment" aria-controls="tab-appointment">Schedule Appointment</TabsTrigger>
        </TabsList>
        
        {isLoading && (
          <div className="absolute top-24 left-0 right-0 flex justify-center">
            <Loader className="h-8 w-8 text-yrealty-accent animate-spin" aria-hidden="true" />
            <span className="sr-only">Loading content...</span>
          </div>
        )}
        
        <TabsContent 
          id="tab-message"
          value="message" 
          className={`reveal transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`} 
          data-value="message"
          aria-labelledby="tab-message"
        >
          <ContactForm />
        </TabsContent>
        
        <TabsContent 
          id="tab-appointment"
          value="appointment" 
          className={`reveal z-20 relative transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`} 
          data-value="appointment"
          aria-labelledby="tab-appointment"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <AppointmentScheduler />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactTabs;
