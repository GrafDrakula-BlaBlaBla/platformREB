type funcType<T> = (...args: T[]) => void;

export function throttle<T>(func: funcType<T>, ms: number) {
  let isThrottled = false;
  let savedArgs: T[] | null = null;

  const wrapper = (...args: T[]) => {
    if (isThrottled) {
      savedArgs = args;
      return;
    }

    func(...args);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper(...savedArgs);
        savedArgs = null;
      }
    }, ms);
  };

  return wrapper;
}
