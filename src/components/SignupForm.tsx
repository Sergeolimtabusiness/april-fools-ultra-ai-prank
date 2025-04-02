
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHuman, setIsHuman] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for "poisson" in email (Easter egg)
    if (email.toLowerCase().includes('poisson')) {
      setError("T'es malin, toi. 😏 Mais non, ça marchera pas !");
      return;
    }
    
    if (!email || !password) {
      setError('Tous les champs sont obligatoires');
      return;
    }
    
    if (!isHuman) {
      setError('Veuillez confirmer votre humanité');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate loading and redirect to reveal page
    setTimeout(() => {
      navigate('/reveal');
    }, 3000);
  };

  return (
    <div className="w-full max-w-md mx-auto glass rounded-xl p-8">
      {isLoading ? (
        <div className="text-center">
          <h3 className="text-xl mb-4">Configuration de votre accès neuronal...</h3>
          <div className="space-y-3">
            <div className="loading-bar"></div>
            <div className="text-xs text-gray-400 animate-pulse">Établissement des connexions synaptiques...</div>
            <div className="text-xs text-gray-400 animate-pulse">Calibration des couches neuronales...</div>
            <div className="text-xs text-gray-400 animate-pulse">Initialisation des filtres contextuels...</div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6">Créer votre compte UltraAI</h2>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="human"
              checked={isHuman}
              onCheckedChange={(checked) => setIsHuman(checked as boolean)}
            />
            <Label htmlFor="human" className="text-sm">
              Je confirme mon humanité et j'accepte d'accéder à UltraAI
            </Label>
          </div>
          
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white">
            Accéder à UltraAI
          </Button>
          
          <p className="text-xs text-gray-400 text-center pt-2">
            <span className="text-cyan-400">1245</span> utilisateurs actifs en ce moment
          </p>
        </form>
      )}
    </div>
  );
};

export default SignupForm;
