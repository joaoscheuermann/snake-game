import { useEffect } from "react";

export default function useGameLoop(callback: () => void, delay: number) {
  useEffect(() => {
    const interval = setInterval(callback, delay);

    return () => {
      clearInterval(interval);
    };
  }, [callback, delay]);
}
