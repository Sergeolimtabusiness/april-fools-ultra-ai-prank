
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Play, Pause, Volume2, Volume1, VolumeX, 
  Maximize, SkipForward, SkipBack, Download 
} from 'lucide-react';

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isLiveStream: boolean;
  onPlayPause: () => void;
  onMute: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
  onSkip: (seconds: number) => void;
  onFullscreen: () => void;
  onDownload: () => void;
}

const VideoControls = ({
  isPlaying,
  isMuted,
  volume,
  currentTime,
  duration,
  isLiveStream,
  onPlayPause,
  onMute,
  onVolumeChange,
  onSeek,
  onSkip,
  onFullscreen,
  onDownload
}: VideoControlsProps) => {
  
  // Format time display (MM:SS)
  const formatTime = (timeInSeconds: number): string => {
    if (isNaN(timeInSeconds)) return '00:00';
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX />;
    if (volume < 0.5) return <Volume1 />;
    return <Volume2 />;
  };
  
  return (
    <div className="w-full">
      {/* Main controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Play/Pause button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onPlayPause}
            className="hover:bg-white/10"
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          
          {/* Skip buttons */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onSkip(-10)}
            disabled={isLiveStream}
            className="hover:bg-white/10"
          >
            <SkipBack />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onSkip(10)}
            disabled={isLiveStream}
            className="hover:bg-white/10"
          >
            <SkipForward />
          </Button>
          
          {/* Volume control */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMute}
            className="hover:bg-white/10"
          >
            <VolumeIcon />
          </Button>
          
          {/* Time display */}
          <div className="text-xs text-gray-300">
            {isLiveStream ? (
              <span className="text-red-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> LIVE
              </span>
            ) : (
              <>
                {formatTime(currentTime)} / {formatTime(duration)}
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Download button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onDownload}
            className="hover:bg-white/10"
          >
            <Download />
          </Button>
          
          {/* Fullscreen button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onFullscreen}
            className="hover:bg-white/10"
          >
            <Maximize />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
