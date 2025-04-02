
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "glass p-6 rounded-xl transition-all duration-300 hover:shadow-lg border border-white/10 hover:border-primary/50",
      className
    )}>
      <div className="mb-4 text-primary text-2xl">{icon}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
