import { useEffect } from "react";

export default function useEventListener<T extends Event>(
  event: keyof WindowEventMap,
  callback: (event: T) => void
) {
  useEffect(() => {
    const handler = (e: Event) => callback(e as T);

    document.addEventListener(event, handler);

    return () => {
      document.removeEventListener(event, handler);
    };
  }, [callback, event]);
}
