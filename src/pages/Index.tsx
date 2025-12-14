import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Threshold from '@/components/threshold/Threshold';
import Sanctum from '@/components/sanctum/Sanctum';

const Index = () => {
  const [showThreshold, setShowThreshold] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {showThreshold && (
          <Threshold onComplete={() => setShowThreshold(false)} />
        )}
      </AnimatePresence>

      {!showThreshold && <Sanctum />}
    </>
  );
};

export default Index;
