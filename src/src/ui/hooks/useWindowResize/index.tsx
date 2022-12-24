import {useState} from 'react';

enum WIN_SIZE {
  small = 1365,
}

export type WindowSize = 'small' | 'middle' | 'big';

export const useWindowResize = (delay: number = 500): WindowSize => {
  const [windowSize, setWindowSize] = useState(
    parseWinSizeToEnum(document.documentElement.clientWidth)
  );

  let timeOut: NodeJS.Timeout;
  window.onresize = () => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setWindowSize(
        parseWinSizeToEnum(window.document.documentElement.clientWidth)
      );
    }, delay);
  };

  return windowSize;
};

function parseWinSizeToEnum(currentWinSize: number): WindowSize {
  switch (true) {
    case currentWinSize <= WIN_SIZE.small:
      return 'small';
    default:
      return 'middle';
  }
}
