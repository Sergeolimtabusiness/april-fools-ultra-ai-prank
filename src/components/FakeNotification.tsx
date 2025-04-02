
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useToast } from '@/components/ui/use-toast';

// List of fake user names
const fakeUsers = [
  'Elon_Fan', 'AIenthusiast', 'TechGuru99', 'FutureIsNow', 'NeuroGeek',
  'QuantumMind', 'CodeNinja', 'DataWizard', 'Silicon_Valley', 'RoboFriend',
  'DeepLearner', 'NeuralNet42', 'AIresearcher', 'FutureTech', 'Innovator2024'
];

// List of countries
const countries = [
  'France', 'Canada', 'Japan', 'Germany', 'Australia', 
  'UK', 'Brazil', 'India', 'Singapore', 'Sweden'
];

// List of random actions
const actions = [
  'vient de se connecter',
  'a généré une image photoréaliste',
  'a créé un algorithme de trading',
  'a résolu une équation complexe',
  'a obtenu une prédiction à 99.8%'
];

export const useRandomNotifications = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance each interval
        const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        
        toast({
          title: `${user} ${action}`,
          description: `depuis ${country}`,
          duration: 3000
        });
      }
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval);
  }, [toast]);
  
  return null;
};

export const useSonnerNotifications = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance each interval
        const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        
        toast(`${user} ${action}`, {
          description: `depuis ${country}`,
          duration: 3000
        });
      }
    }, 8000); // Check every 8 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return null;
};

export default function FakeNotification() {
  useRandomNotifications();
  useSonnerNotifications();
  
  return null;
}
