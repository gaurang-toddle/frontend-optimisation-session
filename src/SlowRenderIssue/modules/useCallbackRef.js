import { useCallback, useRef } from "react";

export const useCallbackRef = () => {
  const ref = useRef(null);
  const setRef = useCallback((node) => {
    ref.current = node;
  }, []);

  return [ref, setRef];
};
