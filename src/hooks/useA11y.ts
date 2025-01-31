import { useCallback } from 'react';

export const useA11y = () => {
  const handleKeyPress = useCallback((
    event: React.KeyboardEvent,
    callback: () => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  }, []);

  const getAriaLabel = (elementType: string, context: string): string => {
    return `${elementType} for ${context}`;
  };

  return {
    handleKeyPress,
    getAriaLabel
  };
}; 