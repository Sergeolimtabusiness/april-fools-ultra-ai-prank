
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import VideoControls from './VideoControls';
import VideoQualitySelector from './VideoQualitySelector';
import { 
  Play, Pause, Volume2, Volume1, VolumeX, 
  Maximize, SkipForward, SkipBack, Download, 
  Loader
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type VideoQuality = {
  label: string;
  url: string;
};

const VideoPlayer = () => {
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // State
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isLiveStream, setIsLiveStream] = useState<boolean>(false);
  const [qualityOptions, setQualityOptions] = useState<VideoQuality[]>([]);
  const [selectedQuality, setSelectedQuality] = useState<string>('');
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [autoHideTimeout, setAutoHideTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Load video with given URL
  const loadVideo = () => {
    if (!videoUrl) {
      toast({
        title: "URL requise",
        description: "Veuillez entrer une URL vidéo valide",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate generating quality options for the demo
    const fakeQualityOptions = [
      { label: "1080p", url: videoUrl },
      { label: "720p", url: videoUrl },
      { label: "480p", url: videoUrl },
      { label: "360p", url: videoUrl }
    ];
    
    // Reset player state
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    
    // Set the new video URL and quality options
    setQualityOptions(fakeQualityOptions);
    setSelectedQuality("1080p");
    
    // After a brief delay to show loading animation
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.src = videoUrl;
        videoRef.current.load();
        setIsLoading(false);
      }
    }, 1500);
  };
  
  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          toast({
            title: "Erreur de lecture",
            description: "Impossible de lire cette vidéo. Vérifiez l'URL ou le format.",
            variant: "destructive",
          });
        });
      }
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Handle seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current && !isLiveStream) {
      const progressRect = progressBarRef.current.getBoundingClientRect();
      const seekPosition = (e.clientX - progressRect.left) / progressRect.width;
      const seekTime = duration * seekPosition;
      
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (videoContainerRef.current) {
      if (!document.fullscreenElement) {
        videoContainerRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch(err => {
          toast({
            title: "Erreur",
            description: "Impossible d'activer le mode plein écran: " + err.message,
            variant: "destructive",
          });
        });
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  // Handle quality change
  const changeQuality = (qualityLabel: string) => {
    const quality = qualityOptions.find(q => q.label === qualityLabel);
    if (quality && videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const wasPlaying = !videoRef.current.paused;
      
      videoRef.current.src = quality.url;
      videoRef.current.load();
      videoRef.current.currentTime = currentTime;
      
      setSelectedQuality(qualityLabel);
      
      if (wasPlaying) {
        videoRef.current.play();
      }
      
      toast({
        title: "Qualité modifiée",
        description: `Lecture en ${qualityLabel}`,
      });
    }
  };
  
  // Handle download
  const handleDownload = () => {
    if (videoUrl) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `video-${selectedQuality}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Téléchargement démarré",
        description: `Téléchargement de la vidéo en ${selectedQuality}`,
      });
    }
  };
  
  // Skip forward/backward
  const skipTime = (seconds: number) => {
    if (videoRef.current && !isLiveStream) {
      const newTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  // Format time display (MM:SS)
  const formatTime = (timeInSeconds: number): string => {
    if (isNaN(timeInSeconds)) return '00:00';
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Add event listeners to video element
  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      const onVolumeChange = () => {
        setVolume(video.volume);
        setIsMuted(video.muted);
      };
      const onTimeUpdate = () => setCurrentTime(video.currentTime);
      const onDurationChange = () => {
        setDuration(video.duration);
        setIsLiveStream(isNaN(video.duration) || video.duration === Infinity);
      };
      const onLoadStart = () => setIsLoading(true);
      const onLoadedData = () => setIsLoading(false);
      const onError = () => {
        setIsLoading(false);
        toast({
          title: "Erreur",
          description: "Impossible de charger la vidéo. Vérifiez l'URL ou le format.",
          variant: "destructive",
        });
      };
      
      // Add event listeners
      video.addEventListener('play', onPlay);
      video.addEventListener('pause', onPause);
      video.addEventListener('volumechange', onVolumeChange);
      video.addEventListener('timeupdate', onTimeUpdate);
      video.addEventListener('durationchange', onDurationChange);
      video.addEventListener('loadstart', onLoadStart);
      video.addEventListener('loadeddata', onLoadedData);
      video.addEventListener('error', onError);
      
      // Cleanup
      return () => {
        video.removeEventListener('play', onPlay);
        video.removeEventListener('pause', onPause);
        video.removeEventListener('volumechange', onVolumeChange);
        video.removeEventListener('timeupdate', onTimeUpdate);
        video.removeEventListener('durationchange', onDurationChange);
        video.removeEventListener('loadstart', onLoadStart);
        video.removeEventListener('loadeddata', onLoadedData);
        video.removeEventListener('error', onError);
      };
    }
  }, []);
  
  // Auto-hide controls after inactivity
  useEffect(() => {
    if (isHovering && autoHideTimeout) {
      clearTimeout(autoHideTimeout);
      setShowControls(true);
      
      const timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
      
      setAutoHideTimeout(timeout);
    }
    
    return () => {
      if (autoHideTimeout) {
        clearTimeout(autoHideTimeout);
      }
    };
  }, [isHovering, isPlaying]);
  
  // Handle mouse movement to show controls
  const handleMouseMove = () => {
    setIsHovering(true);
    setShowControls(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (isPlaying) {
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 2000);
      
      setAutoHideTimeout(timeout);
    }
  };
  
  // Placeholder for video source
  const placeholderUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  
  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX />;
    if (volume < 0.5) return <Volume1 />;
    return <Volume2 />;
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="glass rounded-lg p-6 mb-8">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Entrez l'URL de la vidéo ou du flux en direct..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="flex-1 bg-background/50 border-white/10 focus:border-primary/70"
          />
          <Button
            onClick={loadVideo}
            className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700"
          >
            Charger la vidéo
            <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Button>
        </div>
        
        <div 
          ref={videoContainerRef}
          className="relative w-full overflow-hidden rounded-lg aspect-video bg-black/70 border border-white/10 shadow-[0_0_15px_rgba(120,41,200,0.3)]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background hexagons animation */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="hexagons-container"></div>
          </div>
          
          {/* Glowing border */}
          <div className="absolute inset-0 z-0 border-4 border-transparent rounded-lg glow-border"></div>
          
          {/* Video element */}
          <video 
            ref={videoRef}
            className={cn(
              "w-full h-full object-contain z-10 transition-opacity",
              isLoading ? "opacity-40" : "opacity-100"
            )}
            onClick={togglePlay}
            playsInline
          >
            <source src={placeholderUrl} type="video/mp4" />
            Votre navigateur ne prend pas en charge la lecture de vidéos.
          </video>
          
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-sm">
              <div className="relative">
                <Loader className="w-16 h-16 text-primary animate-spin" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-t-2 border-primary blur-md animate-ping"></div>
              </div>
              <p className="absolute bottom-10 text-center text-primary animate-pulse">Chargement...</p>
            </div>
          )}
          
          {/* Centered play/pause button */}
          {!isPlaying && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer" onClick={togglePlay}>
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 transition-transform hover:scale-110">
                <Play className="w-10 h-10 text-white" />
                <div className="absolute w-24 h-24 rounded-full border-2 border-primary/50 animate-pulse"></div>
              </div>
            </div>
          )}
          
          {/* Video controls overlay */}
          <div 
            className={cn(
              "absolute bottom-0 left-0 right-0 p-4 z-30 transition-all duration-300 ease-in-out bg-gradient-to-t from-black/80 to-transparent",
              showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            )}
          >
            {/* Progress bar */}
            <div 
              ref={progressBarRef}
              className={cn(
                "w-full h-2 mb-4 bg-white/10 rounded-full overflow-hidden relative cursor-pointer group",
                isLiveStream ? "opacity-50 cursor-not-allowed" : ""
              )}
              onClick={handleSeek}
            >
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-violet-600 rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              ></div>
              
              {/* Glow effect on progress */}
              <div 
                className="absolute top-0 left-0 h-full bg-primary/30 blur-sm rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              ></div>
              
              {/* Seeker thumb */}
              <div 
                className="absolute top-1/2 -mt-1.5 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${(currentTime / duration) * 100 || 0}% - 6px)` }}
              ></div>
            </div>
            
            {/* Main controls */}
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                {/* Play/Pause button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={togglePlay}
                  className="hover:bg-white/10"
                >
                  {isPlaying ? <Pause /> : <Play />}
                </Button>
                
                {/* Skip buttons */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => skipTime(-10)}
                  disabled={isLiveStream}
                  className="hover:bg-white/10"
                >
                  <SkipBack />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => skipTime(10)}
                  disabled={isLiveStream}
                  className="hover:bg-white/10"
                >
                  <SkipForward />
                </Button>
                
                {/* Volume control */}
                <div className="hidden md:flex items-center gap-2 group relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleMute}
                    className="hover:bg-white/10"
                  >
                    <VolumeIcon />
                  </Button>
                  
                  <div className="w-0 overflow-hidden group-hover:w-20 transition-all duration-300">
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleVolumeChange(value[0] / 100)}
                      className="w-20"
                    />
                  </div>
                </div>
                
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
                {/* Quality selector */}
                {qualityOptions.length > 0 && (
                  <VideoQualitySelector 
                    qualities={qualityOptions.map(q => q.label)}
                    selectedQuality={selectedQuality}
                    onSelectQuality={changeQuality}
                  />
                )}
                
                {/* Download button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleDownload}
                  disabled={!videoUrl}
                  className="hover:bg-white/10"
                >
                  <Download />
                </Button>
                
                {/* Fullscreen button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleFullscreen}
                  className="hover:bg-white/10"
                >
                  <Maximize />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video info and extra controls */}
      <div className="glass rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div>
            <h3 className="text-xl font-medium mb-2">Configuration avancée</h3>
            <p className="text-gray-400 text-sm">
              Options supplémentaires pour une expérience de visionnage optimale
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Switch id="auto-play" />
              <label htmlFor="auto-play" className="text-sm">Lecture automatique</label>
            </div>
            
            <div className="flex items-center gap-2">
              <Switch id="auto-quality" />
              <label htmlFor="auto-quality" className="text-sm">Qualité automatique</label>
            </div>
            
            <div className="flex items-center gap-2">
              <Switch id="secure-mode" />
              <label htmlFor="secure-mode" className="text-sm">Mode sécurisé avancé</label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom CSS for animations */}
      <style jsx global>{`
        .glow-border {
          box-shadow: 0 0 15px rgba(120, 41, 200, 0.5), 
                     inset 0 0 15px rgba(120, 41, 200, 0.3);
          animation: borderPulse 3s infinite alternate;
        }
        
        @keyframes borderPulse {
          0% { box-shadow: 0 0 15px rgba(120, 41, 200, 0.5), 
                          inset 0 0 15px rgba(120, 41, 200, 0.3); }
          100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.6), 
                           inset 0 0 20px rgba(34, 211, 238, 0.4); }
        }
        
        .hexagons-container {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          z-index: 0;
          background-image: 
            repeating-linear-gradient(0deg, transparent, transparent 50px, 
                                     rgba(120, 41, 200, 0.05) 50px, 
                                     rgba(120, 41, 200, 0.05) 51px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, 
                                     rgba(34, 211, 238, 0.05) 50px, 
                                     rgba(34, 211, 238, 0.05) 51px),
            radial-gradient(rgba(0, 0, 0, 0.1) 2px, transparent 3px);
          background-size: 50px 50px, 50px 50px, 25px 25px;
          animation: hexagonMove 120s linear infinite;
          opacity: 0.3;
        }
        
        @keyframes hexagonMove {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.5); }
          100% { transform: rotate(360deg) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
