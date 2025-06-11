
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFreshAuth } from '@/contexts/FreshAuthContext';
import { supabase } from '@/integrations/supabase/client';
import PageLayout from '@/components/layout/PageLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface ProfileData {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { user, signOut } = useFreshAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        // Using type assertion to bypass TypeScript type checks since we know the structure
        const response = await fetch(`https://axgepdguspqqxudqnobz.supabase.co/rest/v1/profiles?id=eq.${user.id}`, {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4Z2VwZGd1c3BxcXh1ZHFub2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjE0MjIsImV4cCI6MjA1OTc5NzQyMn0.GFk04igJ-d6iEB_Da8et-ZVG_eRi9u9xbCbRLnGKdEY',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        
        if (data && data.length > 0) {
          const profileData: ProfileData = {
            id: data[0].id,
            username: data[0].username,
            full_name: data[0].full_name,
            avatar_url: data[0].avatar_url
          };
          
          setProfile(profileData);
          setUsername(profileData.username || '');
          setFullName(profileData.full_name || '');
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);
    try {
      // Using fetch API with type assertion to bypass TypeScript errors
      const response = await fetch(`https://axgepdguspqqxudqnobz.supabase.co/rest/v1/profiles?id=eq.${user.id}`, {
        method: 'PATCH',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4Z2VwZGd1c3BxcXh1ZHFub2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjE0MjIsImV4cCI6MjA1OTc5NzQyMn0.GFk04igJ-d6iEB_Da8et-ZVG_eRi9u9xbCbRLnGKdEY',
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          username,
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      toast.success('Profile updated successfully');
      
      // Update local profile state
      setProfile(prev => prev ? {
        ...prev,
        username,
        full_name: fullName
      } : null);
      
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <PageLayout title="Profile" metaDescription="Manage your Y Realty Team profile settings">
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-yrealty-accent" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Your Profile" 
      subtitle="Manage your account information and settings"
      metaDescription="Manage your Y Realty Team profile settings and account information"
    >
      <div className="max-w-xl mx-auto py-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-yrealty-accent">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback className="bg-yrealty-navy text-white text-xl">
                  {fullName ? fullName.substring(0, 2).toUpperCase() : user?.email?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{fullName || 'Account User'}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <form onSubmit={handleUpdateProfile}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button type="submit" disabled={updating}>
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
              
              <Button variant="outline" type="button" onClick={handleSignOut}>
                Sign Out
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Profile;
