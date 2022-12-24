import {useEffect} from 'react';

export default function useOnEnter(
  effect: () => void | (() => void | undefined),
  dependencies: any[] = []
) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        effect();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
    // eslint-disable-next-line
  }, [dependencies]);
}
