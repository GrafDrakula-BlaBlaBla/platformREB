import {useState} from 'react';

export type IUseTableCheckbox<T> = T & {
  id: string;
  disabled: boolean;
};

export const useTableCheckbox = <T>(items: IUseTableCheckbox<T>[]) => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const onCheckAll = (checked: boolean) => {
    const _checkedIds: string[] = [];
    items.forEach((item) => {
      if (!item.disabled && checked) _checkedIds.push(item.id);
    });
    setCheckedIds(_checkedIds);
  };

  const onCheck = (id: string, checked: boolean) => {
    if (checked) {
      const _checkedIds: string[] = [...checkedIds];
      _checkedIds.push(id);
      setCheckedIds(_checkedIds);
    } else {
      const _checkedIds: string[] = [...checkedIds.filter((_id) => _id !== id)];
      setCheckedIds(_checkedIds);
    }
  };

  const checkAllValue =
    items.length > 0 &&
    items.filter((item) => {
      return !item.disabled;
    }).length === checkedIds.length;

  const checkAllIndeterminate =
    checkedIds.length > 0 &&
    checkedIds.length <
      items.filter((item) => {
        return !item.disabled;
      }).length;

  return {
    checkedIds,
    setCheckedIds,
    onCheckAll,
    onCheck,
    checkAllValue,
    checkAllIndeterminate,
  };
};
