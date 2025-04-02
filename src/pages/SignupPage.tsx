
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import SignupForm from '@/components/SignupForm';
import FakeNotification from '@/components/FakeNotification';
import { ArrowLeft } from 'lucide-react';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FakeNotification />
      
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Retour</span>
        </Link>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold mb-2">Créez votre compte UltraAI</h1>
          <p className="text-gray-300 max-w-md mx-auto">
            Quelques secondes vous séparent de l'IA la plus puissante jamais créée.
          </p>
        </div>
        
        <SignupForm />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            En vous inscrivant, vous acceptez de ne PAS utiliser UltraAI pour des activités illégales.
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
