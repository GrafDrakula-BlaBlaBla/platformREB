import {useState} from 'react';

export const useAddItems = <T>(viewModelList: Array<T>) => {
  const [stateListItems, setState] = useState<T[]>(viewModelList);

  const handlerAddItem = (item: T) => {
    viewModelList.push(item);
    setState([...viewModelList]);
  };

  return {stateListItems, handlerAddItem};
};
