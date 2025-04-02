
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Share2, ArrowLeft } from 'lucide-react';

const RevealPage = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  
  useEffect(() => {
    // Show the reveal animation after a delay
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleShare = () => {
    // Prepare sharing message
    const shareText = "J'ai découvert 'UltraAI', l'IA la plus puissante au monde... mais c'était un #PoissonDAvril ! Essaie de voir si tu tombes aussi dans le panneau : [URL]";
    
    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'Poisson d\'Avril: UltraAI',
        text: shareText,
      }).catch(err => {
        console.error('Erreur de partage:', err);
        // Fallback to opening a new email
        window.open(`mailto:?subject=Poisson d'Avril: UltraAI&body=${encodeURIComponent(shareText)}`);
      });
    } else {
      // Fallback to opening a new email
      window.open(`mailto:?subject=Poisson d'Avril: UltraAI&body=${encodeURIComponent(shareText)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Retour à l'accueil</span>
        </Link>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-16 max-w-3xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <Logo />
          </div>
          
          <div className="glass p-8 md:p-12 rounded-xl mb-8">
            <div className="text-6xl mb-6">🎣 😄</div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Poisson d'Avril 2024 !</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl mb-4">
                Bravo ! Vous venez de tomber dans le piège du <strong>Poisson d'Avril 2024</strong> !
              </p>
              
              <p className="text-lg mb-6 text-gray-300">
                UltraAI n'existe pas (enfin... pas encore). Passez une excellente journée et méfiez-vous des offres trop belles pour être vraies !
              </p>
              
              <div className="bg-white/5 p-4 rounded-lg mb-8">
                <p className="italic text-gray-300">
                  "Les IA actuelles sont impressionnantes, mais elles ne peuvent pas prédire le futur à 99,8% de précision, ni produire du code parfait à 100%. Soyez toujours critiques face aux annonces révolutionnaires."
                </p>
              </div>
              
              <Button onClick={handleShare} size="lg" className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700">
                <Share2 className="mr-2 h-4 w-4" /> Partager cette blague à un ami
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-gray-400">
            Created with ❤️ for April Fools' Day 2024
          </p>
        </div>
      </main>
    </div>
  );
};

export default RevealPage;
