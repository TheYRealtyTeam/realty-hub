
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FreshAuthProvider } from '@/contexts/FreshAuthContext';
import { Toaster } from 'sonner';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import Index from '@/pages/Index';

console.log('App.tsx: Starting to load App component');

const App = () => {
  console.log('App: Starting to render App component with FreshAuthProvider');
  
  return (
    <FreshAuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Index />} />
      </Routes>
      <Toaster />
    </FreshAuthProvider>
  );
};

export default App;
