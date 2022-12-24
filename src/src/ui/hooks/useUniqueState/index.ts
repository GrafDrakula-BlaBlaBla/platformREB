import {useState} from 'react';

export type uniqueStateType<T> = Record<'current', T>;

export const useUniqueState = <T>(
  initialValue: T
): [uniqueStateType<T>, (value: T) => void] => {
  const [state, setState] = useState<uniqueStateType<T>>({
    current: initialValue,
  });

  const setUniqueState = (current: T) => {
    setState({current});
  };

  return [state, setUniqueState];
};
