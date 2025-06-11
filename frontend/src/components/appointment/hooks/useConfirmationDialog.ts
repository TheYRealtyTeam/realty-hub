
import { useState } from 'react';

export const useConfirmationDialog = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Handle dialog close and form reset
  const handleConfirmationClose = (resetCallback: () => void) => {
    setShowConfirmation(false);
    
    // Execute the reset callback after the dialog is closed
    setTimeout(() => {
      resetCallback();
    }, 300); // Small delay to ensure dialog animation completes
  };

  return {
    showConfirmation,
    setShowConfirmation,
    handleConfirmationClose
  };
};
