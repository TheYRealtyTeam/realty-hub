import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PhoneCall, Video, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
interface DateTimeSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string;
  handleTimeSelect: (time: string) => void;
  callType: string;
  setCallType: (callType: string) => void;
  availableTimes: string[];
  isDateDisabled: (date: Date) => boolean;
  onContinue: () => void;
  isValid: boolean;
}
const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  date,
  setDate,
  selectedTime,
  handleTimeSelect,
  callType,
  setCallType,
  availableTimes,
  isDateDisabled,
  onContinue,
  isValid
}) => {
  const handleCallTypeSelect = (type: string) => {
    setCallType(type);
  };
  return <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-yrealty-navy">Schedule an Appointment</h2>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">1. Choose a Date</h3>
        <div className="border rounded-lg overflow-hidden relative">
          <div className="relative z-40 w-full">
            <Calendar mode="single" selected={date} onSelect={setDate} disabled={isDateDisabled} className={cn("rounded-md border w-full pointer-events-auto")} />
          </div>
        </div>
      </div>
      
      <div className="mb-6 relative z-10">
        <h3 className="text-lg font-medium mb-3 text-gray-700">2. Select a Time</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {availableTimes.map(time => <button key={time} onClick={() => handleTimeSelect(time)} className={`py-2 px-3 rounded-md text-center transition-colors ${selectedTime === time ? 'bg-yrealty-navy text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`} type="button">
              {time}
            </button>)}
        </div>
      </div>
      
      <div className="mb-6 relative z-10">
        <h3 className="text-lg font-medium mb-3 text-gray-700">3. Choose Call Type</h3>
        <RadioGroup value={callType} onValueChange={setCallType} className="flex gap-4">
          <label htmlFor="phone" className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all w-full ${callType === 'phone' ? 'border-yrealty-navy bg-yrealty-blue/20' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => handleCallTypeSelect('phone')}>
            <div className="mb-2 rounded-full bg-gray-100 p-2">
              <PhoneCall className={`h-6 w-6 ${callType === 'phone' ? 'text-yrealty-navy' : 'text-gray-600'}`} />
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="phone" className="sr-only" />
              <span className="font-medium">Phone Call</span>
            </div>
          </label>
          
          <label htmlFor="video" className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all w-full ${callType === 'video' ? 'border-yrealty-navy bg-yrealty-blue/20' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => handleCallTypeSelect('video')}>
            <div className="mb-2 rounded-full bg-gray-100 p-2">
              <Video className={`h-6 w-6 ${callType === 'video' ? 'text-yrealty-navy' : 'text-gray-600'}`} />
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="video" id="video" className="sr-only" />
              <span className="font-medium">Video Call</span>
            </div>
          </label>
        </RadioGroup>
      </div>
      
      {date && selectedTime && callType && <div className="p-4 bg-yrealty-blue rounded-lg mb-6">
          <p className="font-medium text-yrealty-navy">Your Selected Appointment:</p>
          <p className="text-gray-700">
            {date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} at {selectedTime}
          </p>
          <p className="text-gray-700 mt-1">
            Call type: <span className="font-medium capitalize">{callType}</span>
          </p>
        </div>}

      <Button onClick={onContinue} className="w-full bg-yrealty-navy hover:bg-yrealty-navy/90 text-white flex justify-center items-center gap-2 text-center text-xs">
        Continue to Personal Information
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>;
};
export default DateTimeSelector;