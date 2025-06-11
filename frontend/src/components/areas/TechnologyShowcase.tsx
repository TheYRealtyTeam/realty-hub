
import React from 'react';
import { Monitor, Smartphone, Globe } from 'lucide-react';

const TechnologyShowcase = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-20 reveal">
      <h3 className="text-3xl font-bold text-center mb-12 text-yrealty-navy">
        Powered by Industry-Leading Technology
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-gradient-to-br from-yrealty-accent to-yrealty-navy rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Monitor className="h-12 w-12 text-white" />
          </div>
          <h4 className="text-2xl font-bold mb-4 text-yrealty-navy">AppFolio Platform</h4>
          <p className="text-gray-600 mb-4">Industry-leading property management software providing comprehensive operational management, financial reporting, and tenant communication tools.</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Automated rent collection</li>
            <li>• Maintenance request management</li>
            <li>• Financial reporting & analytics</li>
            <li>• Tenant screening & communication</li>
          </ul>
        </div>
        
        <div className="text-center">
          <div className="bg-gradient-to-br from-yrealty-accent to-yrealty-navy rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Smartphone className="h-12 w-12 text-white" />
          </div>
          <h4 className="text-2xl font-bold mb-4 text-yrealty-navy">Site Audit Pro</h4>
          <p className="text-gray-600 mb-4">Advanced property inspection technology with detailed photo documentation, condition reports, and preventive maintenance alerts.</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Digital inspection reports</li>
            <li>• Photo documentation</li>
            <li>• Maintenance scheduling</li>
            <li>• Compliance monitoring</li>
          </ul>
        </div>
        
        <div className="text-center">
          <div className="bg-gradient-to-br from-yrealty-accent to-yrealty-navy rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Globe className="h-12 w-12 text-white" />
          </div>
          <h4 className="text-2xl font-bold mb-4 text-yrealty-navy">Proprietary Platform</h4>
          <p className="text-gray-600 mb-4">Our custom-built state-of-the-art software platform designed specifically for enhanced client experience and operational efficiency.</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Real-time dashboard</li>
            <li>• Custom reporting</li>
            <li>• Enhanced communication</li>
            <li>• Advanced analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechnologyShowcase;
