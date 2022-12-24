type objectType = Record<string, boolean>;
type arrayType = Array<valueType>;
type valueType = undefined | string | objectType | arrayType;

export const ClassNameInjection = (...args: Array<valueType>): string => {
  const classNames: string[] = [];

  const handleObject = (object: objectType) => {
    for (let key of Object.keys(object)) {
      if (object[key]) {
        classNames.push(key);
      }
    }
  };

  const handleArray = (array: arrayType) => {
    for (let item of array) {
      if (typeof item === 'string') {
        classNames.push(item);
      } else if (Array.isArray(item)) {
        handleArray(item);
      } else if (typeof item === 'object') {
        handleObject(item);
      }
    }
  };

  handleArray(args);
  return classNames.join(' ');
};
