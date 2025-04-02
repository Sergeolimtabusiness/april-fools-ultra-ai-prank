
import React from 'react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title?: string;
  className?: string;
}

const TestimonialCard = ({ quote, author, title, className }: TestimonialCardProps) => {
  return (
    <div className={cn(
      "glass p-6 rounded-xl transition-all duration-300",
      className
    )}>
      <div className="mb-4 text-2xl text-primary">"</div>
      <p className="italic text-gray-300 mb-4">{quote}</p>
      <div className="flex items-center">
        <div className="text-right">
          <p className="font-medium">{author}</p>
          {title && <p className="text-sm text-gray-400">{title}</p>}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
