
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import PageLayout from '@/components/layout/PageLayout';

const BlogPostLoading = () => {
  return (
    <PageLayout title="Loading...">
      <article className="max-w-4xl mx-auto">
        <Skeleton className="w-full h-[400px] md:h-[500px] rounded-xl mb-8" />
        <div className="space-y-4 mb-8">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-3">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogPostLoading;
