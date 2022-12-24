import React from 'react';

export const multiSelectExtRenderValue = <ItemType,>(
  selected: unknown,
  valueField: keyof ItemType,
  labelField: keyof ItemType,
  items?: ItemType[],
  placeholder?: string,
  renderValue?: (items: ItemType[]) => JSX.Element | string
) => {
  const sel = (selected as unknown[])?.filter((s) => s);
  const selItems = items?.filter((item) => sel.includes(item[valueField]));
  if (!selItems || selItems.length === 0) {
    return <div className="color-gray">{placeholder}</div>;
  }
  if (renderValue) {
    return renderValue(selItems);
  } else {
    return selItems?.map((item) => item[labelField]).join(', ');
  }
};
