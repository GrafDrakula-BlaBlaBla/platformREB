export const padStart = (
  sourceString: string,
  targetLength: number,
  padString?: string
) => {
  targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
  padString = String(padString || ' ');
  if (sourceString.length > targetLength) {
    return sourceString;
  } else {
    targetLength = targetLength - sourceString.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + sourceString;
  }
};

export const padEnd = (
  sourceString: string,
  targetLength: number,
  padString?: string
) => {
  targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
  padString = String(padString || ' ');
  if (sourceString.length > targetLength) {
    return sourceString;
  } else {
    targetLength = targetLength - sourceString.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }
    return sourceString + padString.slice(0, targetLength);
  }
};
