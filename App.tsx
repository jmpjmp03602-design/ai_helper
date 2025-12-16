import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AppLayout from './components/AppLayout';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'app'>('landing');

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onLaunchApp={() => setView('app')} />
      ) : (
        <AppLayout onBackToHome={() => setView('landing')} />
      )}
    </>
  );
};

export default App;