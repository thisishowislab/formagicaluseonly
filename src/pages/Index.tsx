import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Threshold from '@/components/threshold/Threshold';
import Sanctum from '@/components/sanctum/Sanctum';

const Index = () => {
  const [showThreshold, setShowThreshold] = useState(true);

  const handleReplayIntro = useCallback(() => {
    sessionStorage.removeItem('hasSeenThreshold');
    setShowThreshold(true);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showThreshold && (
          <Threshold onComplete={() => setShowThreshold(false)} />
        )}
      </AnimatePresence>

      {!showThreshold && <Sanctum onReplayIntro={handleReplayIntro} />}
    </>
  );
};

export default Index;
