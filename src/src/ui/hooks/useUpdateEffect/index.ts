import {useEffect, useRef} from 'react';

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */

export default function useUpdateEffect(
  effect: () => void | (() => void | undefined),
  dependencies: any[] = []
) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
    // eslint-disable-next-line
  }, [...dependencies]);
}
