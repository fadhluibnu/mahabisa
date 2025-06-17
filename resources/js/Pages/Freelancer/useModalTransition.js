/**
 * Custom hook to handle modal transitions and prevent state bugs
 * This ensures that modal state is reset properly after animations
 */
import { useState } from 'react';

export const useModalTransition = (transitionDuration = 300) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  
  const showModal = () => {
    setIsRendered(true);
    // Small delay to allow the DOM to update before starting animation
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  };
  
  const hideModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsRendered(false);
    }, transitionDuration);
  };
  
  return {
    isVisible,
    isRendered,
    showModal,
    hideModal
  };
};
