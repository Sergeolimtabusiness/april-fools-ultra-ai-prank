
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VideoQualitySelectorProps {
  qualities: string[];
  selectedQuality: string;
  onSelectQuality: (quality: string) => void;
}

const VideoQualitySelector = ({
  qualities,
  selectedQuality,
  onSelectQuality
}: VideoQualitySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleQualitySelect = (quality: string) => {
    onSelectQuality(quality);
    setIsOpen(false);
  };
  
  return (
    <div ref={menuRef} className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs flex items-center gap-1 hover:bg-white/10"
      >
        {selectedQuality}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={cn(
            "transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-full mb-2 right-0 w-24 glass rounded-md overflow-hidden backdrop-blur-xl z-50 animate-fadeIn">
          <div className="py-1">
            {qualities.map((quality) => (
              <button
                key={quality}
                onClick={() => handleQualitySelect(quality)}
                className={cn(
                  "w-full text-left px-3 py-1.5 text-xs transition-colors",
                  quality === selectedQuality 
                    ? "bg-primary/20 text-white" 
                    : "hover:bg-white/10"
                )}
              >
                {quality}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoQualitySelector;
