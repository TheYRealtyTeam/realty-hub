
import React from 'react';

interface BlogPostContentProps {
  content: string;
}

const BlogPostContent = ({ content }: BlogPostContentProps) => {
  return (
    <div className="prose prose-lg max-w-none mb-12">
      {content.split('\n\n').map((paragraph, index) => {
        // Handle headers
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          const headerText = paragraph.slice(2, -2);
          return <h2 key={index} className="text-2xl font-bold text-yrealty-navy mt-8 mb-4">{headerText}</h2>;
        }
        
        // Handle bullet points
        if (paragraph.includes('•')) {
          const items = paragraph.split('\n').filter(line => line.trim().startsWith('•'));
          return (
            <ul key={index} className="list-disc pl-6 space-y-2 mb-6">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-gray-700">{item.replace('•', '').trim()}</li>
              ))}
            </ul>
          );
        }
        
        // Regular paragraphs
        return paragraph.trim() ? (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
        ) : null;
      })}
    </div>
  );
};

export default BlogPostContent;
