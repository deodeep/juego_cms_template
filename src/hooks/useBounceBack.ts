import { useEffect, useRef } from 'react';

const useBounceBack = (duration: number, handleCallBack: () => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear previous timeout, if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      handleCallBack(); // Execute the callback function
    }, duration);

    // Clean up the timeout on component unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [duration, handleCallBack]);
  return null;
};

export default useBounceBack;
