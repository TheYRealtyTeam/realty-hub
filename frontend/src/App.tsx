import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FreshAuthProvider } from '@/contexts/FreshAuthContext';
import { Toaster } from 'sonner';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import Index from '@/pages/Index';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import BlogAdmin from '@/pages/BlogAdmin';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import Tools from '@/pages/Tools';
import Appointment from '@/pages/Appointment';
import NotFound from '@/pages/NotFound';

console.log('App.tsx: Starting to load App component');

const App = () => {
  console.log('App: Starting to render App component with FreshAuthProvider');
  
  return (
    <FreshAuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog-admin" element={<BlogAdmin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/home" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </FreshAuthProvider>
  );
};

export default App;