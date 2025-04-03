
import React from 'react';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

const VideoPlayerPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient glow text-center">
          Lecteur Vidéo Ultra-Avancé
        </h1>
        <div className="flex-1 flex items-center justify-center">
          <VideoPlayer />
        </div>
      </div>
      
      <footer className="container mx-auto px-4 py-4 border-t border-white/10 mt-auto">
        <div className="text-sm text-gray-400 text-center">
          © 2024 UltraAI Inc. Technologie de visionnage avancée.
        </div>
      </footer>
    </div>
  );
};

export default VideoPlayerPage;
