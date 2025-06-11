
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { microsoftGraphApi } from '@/integrations/microsoft/graphApiClient';
import { useToast } from '@/hooks/use-toast';

const MicrosoftAuthCallback = () => {
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    async function handleCallback() {
      try {
        // Get the authorization code from URL
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        
        if (!code) {
          setError('No authorization code received');
          toast({
            title: "Authentication Failed",
            description: "No authorization code received from Microsoft.",
            variant: "destructive",
          });
          return;
        }
        
        // Process the auth code
        const success = await microsoftGraphApi.handleAuthCallback(code);
        
        if (success) {
          toast({
            title: "Calendar Connected",
            description: "Your Microsoft calendar has been successfully connected.",
          });
          
          // Redirect back to the original page
          const redirectPath = localStorage.getItem('ms_auth_redirect') || '/appointment';
          navigate(redirectPath);
        } else {
          setError('Failed to authenticate with Microsoft');
          toast({
            title: "Authentication Failed",
            description: "Could not authenticate with Microsoft. Please try again.",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error('Error in auth callback:', err);
        setError('An unexpected error occurred');
        toast({
          title: "Authentication Error",
          description: "An unexpected error occurred during authentication.",
          variant: "destructive",
        });
      } finally {
        setProcessing(false);
      }
    }
    
    handleCallback();
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-yrealty-navy">
          {processing ? 'Connecting Calendar...' : error ? 'Connection Failed' : 'Calendar Connected!'}
        </h1>
        
        {processing ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yrealty-navy mb-4"></div>
            <p className="text-gray-600">Processing your Microsoft authentication...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => navigate('/appointment')}
              className="bg-yrealty-navy text-white px-4 py-2 rounded hover:bg-yrealty-navy/90"
            >
              Back to Appointments
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-green-600 mb-4">Your Microsoft calendar has been successfully connected!</p>
            <p className="text-gray-600 mb-6">You will be redirected back to the appointment page.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MicrosoftAuthCallback;
