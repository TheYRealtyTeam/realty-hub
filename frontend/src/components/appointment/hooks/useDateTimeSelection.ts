
import { useState, useEffect } from 'react';
import { isToday, filterAvailableTimes } from '../utils/validationUtils';

export const useDateTimeSelection = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [callType, setCallType] = useState('');

  // Base available appointment times including 12:00 PM
  const baseAvailableTimes = [
    '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];
  
  // Filtered available times based on current time if date is today
  const [availableTimes, setAvailableTimes] = useState(baseAvailableTimes);

  // Update available times when date changes
  useEffect(() => {
    if (date) {
      const filteredTimes = filterAvailableTimes(baseAvailableTimes, date);
      setAvailableTimes(filteredTimes);
      
      // If the previously selected time is no longer available, clear it
      if (selectedTime && !filteredTimes.includes(selectedTime)) {
        setSelectedTime('');
      }
    } else {
      setAvailableTimes(baseAvailableTimes);
    }
  }, [date, selectedTime]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  /**
   * Check if first step is valid (date, time and call type are selected)
   */
  const isFirstStepValid = (): boolean => {
    return !!date && !!selectedTime && !!callType;
  };

  const resetDateTimeSelection = () => {
    setDate(undefined);
    setSelectedTime('');
    setCallType('');
  };

  return {
    date,
    setDate,
    selectedTime,
    callType,
    setCallType,
    availableTimes,
    handleTimeSelect,
    isFirstStepValid,
    resetDateTimeSelection
  };
};
