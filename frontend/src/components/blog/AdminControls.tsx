
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { addRandomBlogPosts } from '@/utils/blogUtils';
import { PlusIcon, Loader2, CheckCircle, Clock, Lock } from 'lucide-react';

interface AdminControlsProps {
  onBlogPostsAdded: () => void;
}

const AdminControls: React.FC<AdminControlsProps> = ({ onBlogPostsAdded }) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(20);
  const [justAdded, setJustAdded] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(5 * 60); // 5 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);

  // Automatically add 20 posts when component mounts (one time only)
  useEffect(() => {
    const hasAutoAdded = localStorage.getItem('blog-auto-added');
    if (!hasAutoAdded) {
      handleAddPosts(20); // Force 20 posts
      localStorage.setItem('blog-auto-added', 'true');
    }
  }, []);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddPosts = async (customCount?: number) => {
    if (isExpired) return;
    
    setLoading(true);
    setJustAdded(false);
    const postsToAdd = customCount || count;
    try {
      const success = await addRandomBlogPosts(postsToAdd);
      if (success) {
        onBlogPostsAdded();
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isExpired) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 shadow-sm">
        <div className="text-center">
          <Lock className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2 text-red-700">Admin Access Expired</h3>
          <p className="text-red-600">
            The 5-minute admin access window has expired. Admin functionality has been disabled for security.
          </p>
          <p className="text-sm text-red-500 mt-2">
            Please refresh the page if you need to access admin features again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-yrealty-navy">Admin Controls</h3>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-orange-500" />
          <span className={`font-mono ${timeRemaining < 60 ? 'text-red-600 font-bold' : 'text-orange-600'}`}>
            {formatTime(timeRemaining)}
          </span>
          <span className="text-gray-500">remaining</span>
        </div>
      </div>
      
      {timeRemaining < 60 && (
        <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          ⚠️ Admin access will expire in less than 1 minute!
        </div>
      )}
      
      <div className="flex items-end gap-4">
        <div>
          <label htmlFor="post-count" className="block text-sm font-medium text-gray-700 mb-1">
            Number of posts to add:
          </label>
          <select 
            id="post-count"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            disabled={isExpired}
          >
            {[5, 10, 15, 20, 25, 30].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <Button 
          onClick={() => handleAddPosts()} 
          className="bg-yrealty-navy hover:bg-yrealty-navy/80"
          disabled={loading || isExpired}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : justAdded ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              Added!
            </>
          ) : (
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Blog Posts
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        This will add randomly generated blog posts to the database.
      </p>
      {justAdded && (
        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
          Successfully added {count} new blog posts!
        </div>
      )}
    </div>
  );
};

export default AdminControls;
