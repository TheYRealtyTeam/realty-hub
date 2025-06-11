
import React from 'react';
import { CheckCircle } from 'lucide-react';

const CommitmentSection = () => {
  return (
    <div className="bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-8 rounded-2xl text-white text-center reveal">
      <h3 className="text-3xl font-bold mb-6">Our Nationwide Commitment</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <CheckCircle className="h-12 w-12 mx-auto mb-4" />
          <h4 className="text-xl font-bold mb-2">Same Day Response</h4>
          <p className="opacity-95">Emergency issues addressed within hours, anywhere in the US</p>
        </div>
        <div>
          <CheckCircle className="h-12 w-12 mx-auto mb-4" />
          <h4 className="text-xl font-bold mb-2">Local Expertise</h4>
          <p className="opacity-95">Regional market knowledge and compliance in every state</p>
        </div>
        <div>
          <CheckCircle className="h-12 w-12 mx-auto mb-4" />
          <h4 className="text-xl font-bold mb-2">Consistent Quality</h4>
          <p className="opacity-95">Same high standards and processes nationwide</p>
        </div>
      </div>
      <a href="#contact" className="btn-accent bg-white text-yrealty-navy hover:bg-gray-100 text-lg px-8 py-4 font-bold">
        Discover How We Can Help Your Property
      </a>
    </div>
  );
};

export default CommitmentSection;
