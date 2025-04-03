import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import FakeNotification from '@/components/FakeNotification';
import { Brain, Code, Image, Sparkles, Lock, Gauge, Zap, ChevronRight, Star, Play } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FakeNotification />
      
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <Logo />
        <div className="flex gap-4">
          <Button variant="ghost" className="hidden md:flex">Comment ça marche</Button>
          <Button variant="ghost" className="hidden md:flex">Capacités</Button>
          <Link to="/player" className="hidden md:flex">
            <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-950/30">
              <Play className="mr-2 h-4 w-4" /> Lecteur Vidéo
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700">
              Accéder Gratuitement
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block glass px-4 py-2 rounded-full text-sm font-medium text-cyan-300 mb-4">
            <span className="mr-2">🚀</span> Première mondiale : IA accessible à tous
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-gradient glow">L'IA la plus puissante au monde,</span> 
            <br className="hidden sm:block" /> maintenant <span className="text-gradient glow">GRATUITE !</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Déverrouillez un accès illimité à une intelligence artificielle 10x plus performante que ChatGPT. 
            Génération de texte, code, images 8K, et même prédictions du futur !
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700">
                Accéder à UltraAI <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/player">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-cyan-500/50 text-cyan-400 hover:bg-cyan-950/30">
                <Play className="mr-2 h-4 w-4" /> Essayer le Lecteur Vidéo
              </Button>
            </Link>
          </div>
          
          <div className="pt-8 text-sm text-gray-400">
            <p>Offre limitée • Annulation à tout moment • Sans carte bancaire</p>
          </div>
        </div>
        
        {/* Abstract UI element */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 h-64 border border-white/10 overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-40 blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-30 blur-xl"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-center items-center gap-4">
              <div className="h-6 w-6 rounded-full bg-cyan-400 animate-pulse"></div>
              <p className="text-xl font-medium">
                <span className="typing-text">Découvrez ce que l'IA peut réellement faire</span>
                <span className="typing-cursor"></span>
              </p>
              <div className="text-sm text-gray-400 italic">* UltraAI n'a pas de limite de jetons comme les autres IA *</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Des capacités révolutionnaires</h2>
          <p className="text-xl text-gray-300">
            UltraAI redéfinit ce qu'une intelligence artificielle peut faire, avec une puissance inégalée.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Brain />} 
            title="Raisonnement avancé" 
            description="Résout des problèmes complexes et produit des analyses de niveau expert."
          />
          <FeatureCard 
            icon={<Code />} 
            title="Code parfait" 
            description="Génère du code sans erreur dans plus de 50 langages de programmation."
          />
          <FeatureCard 
            icon={<Image />} 
            title="Images 8K" 
            description="Crée des images photoréalistes et des rendus artistiques en haute définition."
          />
          <FeatureCard 
            icon={<Gauge />} 
            title="Ultra rapide" 
            description="Réponses instantanées et génération 100x plus rapide que les IA concurrentes."
          />
          <FeatureCard 
            icon={<Sparkles />} 
            title="Prédiction du futur" 
            description="Analyse des tendances avec une précision de 99,8% pour anticiper les événements."
          />
          <FeatureCard 
            icon={<Lock />} 
            title="Confidentialité totale" 
            description="Chiffrement quantique de vos données et conversations sécurisées."
          />
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ils en parlent</h2>
          <p className="text-xl text-gray-300">
            Découvrez ce que les experts et leaders de l'industrie disent d'UltraAI.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TestimonialCard 
            quote="UltraAI va changer le monde de la technologie. C'est l'avancée la plus importante depuis l'invention d'Internet." 
            author="Elon Musk"
            title="CEO, SpaceX & Tesla"
          />
          <TestimonialCard 
            quote="J'ai testé toutes les IA disponibles, et UltraAI est dans une classe à part. Sa capacité à comprendre les nuances est stupéfiante." 
            author="Dr. Emma Chen"
            title="MIT AI Research"
          />
          <TestimonialCard 
            quote="Notre entreprise a augmenté sa productivité de 300% en intégrant UltraAI dans nos processus. C'est révolutionnaire." 
            author="Thomas Laurent"
            title="CTO, TechVision Inc."
          />
        </div>
      </section>
      
      {/* Video Player Promo Section - New Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="glass rounded-2xl p-8 md:p-16 relative overflow-hidden border-cyan-500/20">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Découvrez notre <span className="text-gradient glow">Lecteur Vidéo Futuriste</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Profitez d'une expérience visuelle exceptionnelle avec notre lecteur vidéo high-tech. 
              Effets visuels saisissants et fonctionnalités avancées pour tous vos contenus.
            </p>
            
            <Link to="/player">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 group">
                <Play className="mr-2 h-5 w-5 group-hover:animate-pulse" /> Essayer Maintenant
                <div className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="glass rounded-2xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Rejoignez les pionniers de l'IA nouvelle génération
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Accès gratuit pour une durée limitée. Soyez parmi les premiers à explorer le potentiel illimité d'UltraAI.
            </p>
            <div className="flex justify-center">
              <div className="flex items-center space-x-1 mb-8">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-300">4.9/5 basé sur 2,463 avis</span>
              </div>
            </div>
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 px-8">
                Accéder Gratuitement <Zap className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Logo size="small" />
          <div className="flex items-center gap-4 my-4 md:my-0">
            <Link to="/player" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Lecteur Vidéo
            </Link>
            <Link to="/signup" className="text-gray-400 hover:text-white transition-colors">
              Inscription
            </Link>
          </div>
          <div className="text-sm text-gray-400">
            © 2024 UltraAI Inc. Une expérience unique en son genre.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
