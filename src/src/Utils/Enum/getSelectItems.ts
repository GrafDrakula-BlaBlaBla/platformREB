import {ISelectItem} from '../../ui/Common/FieldControls';

export const getSelectItems = (list: Record<string, string>) => {
  const items: ISelectItem[] = [];
  for (const [key, value] of Object.entries(list)) {
    items.push({value: key, label: value});
  }
  return items;
};
