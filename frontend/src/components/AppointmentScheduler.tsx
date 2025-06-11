
import React, { useEffect } from 'react';
import DateTimeSelector from './appointment/DateTimeSelector';
import AppointmentForm from './appointment/AppointmentForm';
import ConfirmationStep from './appointment/ConfirmationStep';
import AppointmentConfirmation from './appointment/AppointmentConfirmation';
import useAppointment from './appointment/useAppointment';

const AppointmentScheduler = () => {
  const {
    date,
    setDate,
    selectedTime,
    callType,
    setCallType,
    formData,
    formErrors,
    isSubmitting,
    availableTimes,
    handleChange,
    handleTimeSelect,
    isDateDisabled,
    handleSubmit,
    isFormValid,
    showConfirmation,
    setShowConfirmation,
    formattedDate,
    currentStep,
    goToNextStep,
    goToPreviousStep,
    isFirstStepValid
  } = useAppointment();

  useEffect(() => {
    console.log("AppointmentScheduler mounted with date:", date);
    // Force active class on parent if it has reveal class
    const parent = document.querySelector('.reveal[data-value="appointment"]');
    if (parent && !parent.classList.contains('active')) {
      console.log("Forcing active class on appointment tab");
      parent.classList.add('active');
    }
  }, []);

  // Log the appointment details to debug
  useEffect(() => {
    if (showConfirmation) {
      console.log("Showing confirmation with details:", {
        date: formattedDate,
        time: selectedTime,
        callType,
        name: formData.name
      });
    }
  }, [showConfirmation, formattedDate, selectedTime, callType, formData.name]);

  return (
    <div className="w-full">
      {currentStep === 'dateSelection' ? (
        <DateTimeSelector
          date={date}
          setDate={setDate}
          selectedTime={selectedTime}
          handleTimeSelect={handleTimeSelect}
          callType={callType}
          setCallType={setCallType}
          availableTimes={availableTimes}
          isDateDisabled={isDateDisabled}
          onContinue={goToNextStep}
          isValid={isFirstStepValid}
        />
      ) : currentStep === 'personalInfo' ? (
        <AppointmentForm
          formData={formData}
          formErrors={formErrors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onBack={goToPreviousStep}
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
          appointmentDetails={{
            date: formattedDate,
            time: selectedTime,
            callType: callType
          }}
        />
      ) : (
        <ConfirmationStep
          formData={formData}
          appointmentDetails={{
            date: formattedDate,
            time: selectedTime,
            callType: callType,
            name: formData.name
          }}
          onBack={goToPreviousStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
      
      {/* Confirmation Dialog */}
      <AppointmentConfirmation
        isOpen={showConfirmation}
        onClose={setShowConfirmation} // Now correctly passes the function without arguments
        appointmentDetails={{
          date: formattedDate,
          time: selectedTime,
          callType: callType,
          name: formData.name
        }}
      />
    </div>
  );
};

export default AppointmentScheduler;
