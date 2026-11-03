'use html';
'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence, usePresence } from 'framer-motion';

type MotionLifecyclePhase = 'idle' | 'initiating' | 'entering' | 'present' | 'exiting';

interface MotionLifecycleContextProps {
  phase: MotionLifecyclePhase;
  registerHook: (id: string, callback: () => void) => () => void;
}

const MotionLifecycleContext = createContext<MotionLifecycleContextProps | null>(null);

export const useAnimationLifecycle = () => {
  const context = useContext(MotionLifecycleContext);
  if (!context) throw new Error('useAnimationLifecycle must run beneath a PageMotion sequence.');
  return context;
};

interface PageMotionProps {
  children: React.ReactNode;
  routeKey: string;
  onLifecycleTransition?: (phase: MotionLifecyclePhase) => void;
}

export const PageMotion: React.FC<PageMotionProps> = ({
  children,
  routeKey,
  onLifecycleTransition
}) => {
  const hooksMap = useRef<Map<string, () => void>>(new Map());

  const registerHook = (id: string, callback: () => void) => {
    hooksMap.current.set(id, callback);
    return () => {
      hooksMap.current.delete(id);
    };
  };

  const handleAnimationState = (phase: MotionLifecyclePhase) => {
    if (onLifecycleTransition) onLifecycleTransition(phase);
    if (phase === 'present') {
      hooksMap.current.forEach(callback => callback());
    }
  };

  return (
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        key={routeKey}
        initial="initial"
        animate="animate"
        exit="exit"
        onAnimationStart={() => handleAnimationState('entering')}
        onAnimationComplete={(definition) => {
          if (definition === 'animate') handleAnimationState('present');
          if (definition === 'exit') handleAnimationState('idle');
        }}
        variants={{
          initial: {
            opacity: 0,
            y: 15,
            transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] }
          },
          animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
          },
          exit: {
            opacity: 0,
            y: -15,
            transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] }
          }
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <MotionLifecycleWrapper registerHook={registerHook}>
          {children}
        </MotionLifecycleWrapper>
      </motion.div>
    </AnimatePresence>
  );
};

const MotionLifecycleWrapper: React.FC<{
  children: React.ReactNode;
  registerHook: (id: string, callback: () => void) => () => void;
}> = ({ children, registerHook }) => {
  const [isPresent, safeToRemove] = usePresence();
  const currentPhase: MotionLifecyclePhase = isPresent ? 'present' : 'exiting';

  useEffect(() => {
    if (!isPresent && safeToRemove) {
      safeToRemove();
    }
  }, [isPresent, safeToRemove]);

  return (
    <MotionLifecycleContext.Provider value={{ phase: currentPhase, registerHook }}>
      {children}
    </MotionLifecycleContext.Provider>
  );
};
