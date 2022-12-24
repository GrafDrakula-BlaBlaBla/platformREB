import {ISelectItem} from './SelectFieldControl';
import {IDictionaryDTO} from '../../../../../Model/Dictionary';

export const SelectItemsFromDictionary = (
  dictionary?: IDictionaryDTO,
  emptyItem?: ISelectItem
): ISelectItem[] => {
  const items = [];
  if (dictionary) {
    Object.keys(dictionary).forEach((key) => {
      items.push({
        label: dictionary[key],
        value: key,
      });
    });
  }
  if (emptyItem) {
    items.unshift(emptyItem);
  }
  return items;
};
