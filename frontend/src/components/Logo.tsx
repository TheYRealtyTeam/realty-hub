
import React from 'react';
import { Globe } from 'lucide-react';

const Logo = ({ className = "", showDomain = true }: { className?: string, showDomain?: boolean }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/lovable-uploads/602cfbe2-3949-47ef-85ba-55108fea7906.png" 
        alt="Y Realty Team Logo" 
        className="h-12 w-auto" 
      />
      <div className="flex flex-col">
        <span className="font-heading font-bold text-xl text-black tracking-wider">Y REALTY TEAM</span>
        {showDomain && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Globe size={12} className="text-yrealty-accent" />
            <span>theyteam.co</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;
