
import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="bg-yrealty-blue rounded-xl p-8 h-full">
      <h3 className="text-2xl font-bold mb-6 text-yrealty-navy">Get In Touch</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="mt-1 mr-4 bg-white/80 p-2 rounded-full">
            <Phone className="h-5 w-5 text-yrealty-accent" />
          </div>
          <div>
            <h4 className="font-bold text-yrealty-navy">Call Us</h4>
            <p className="text-gray-700">(845) 734-3331</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mt-1 mr-4 bg-white/80 p-2 rounded-full">
            <Mail className="h-5 w-5 text-yrealty-accent" />
          </div>
          <div>
            <h4 className="font-bold text-yrealty-navy">Email Us</h4>
            <p className="text-gray-700">info@theYteam.co</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="mt-1 mr-4 bg-white/80 p-2 rounded-full">
            <Globe className="h-5 w-5 text-yrealty-accent" />
          </div>
          <div>
            <h4 className="font-bold text-yrealty-navy">Website</h4>
            <p className="text-gray-700">theyteam.co</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h4 className="font-bold text-yrealty-navy mb-4">Business Hours</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex justify-between">
            <span>Monday - Friday:</span>
            <span>9:00 AM - 6:00 PM</span>
          </li>
          <li className="flex justify-between">
            <span>Saturday:</span>
            <span>Closed</span>
          </li>
          <li className="flex justify-between">
            <span>Sunday:</span>
            <span>Closed</span>
          </li>
        </ul>
      </div>
      
      <div className="mt-10">
        <h4 className="font-bold text-yrealty-navy mb-4">24/7 Emergency Service</h4>
        <p className="text-gray-700">
          Property emergencies don't wait for business hours. Our clients have access to 24/7 emergency support.
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
