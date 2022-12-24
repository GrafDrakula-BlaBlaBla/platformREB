import {IRadioItem} from './RadioGroupFieldControl';
import {IDictionaryDTO} from '../../../../../Model/Dictionary';

export const RadioItemsFromDictionary = (list: IDictionaryDTO) => {
  const items: IRadioItem[] = [];
  for (const [key, value] of Object.entries(list)) {
    items.push({value: key, label: value});
  }
  return items;
};
