import React from 'react';
import {MultiSelectExtFieldControlView} from './MultiSelectExtFieldControlView';
import {
  MultiSelectExtFieldControl,
  MultiSelectExtFieldControlProps,
} from '../../FieldControlsBase';

export type MultiSelectExtFieldControlEditableProps<
  ItemType
> = MultiSelectExtFieldControlProps<ItemType> & {
  isEdit?: boolean;
};

export const MultiSelectExtFieldControlEditable = <ItemType,>(
  props: MultiSelectExtFieldControlEditableProps<ItemType>
) => {
  const {isEdit = true, ...other} = props;
  return isEdit ? (
    <MultiSelectExtFieldControl {...other} />
  ) : (
    <MultiSelectExtFieldControlView {...other} />
  );
};
