import React from 'react';
import {MultiSelectExtFieldControlEditableProps} from './MultiSelectExtFieldControlEditable';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import {multiSelectExtRenderValue} from '../../FieldControlsBase/MultiSelectExtFieldControl/multiSelectExtRenderValue';

export const MultiSelectExtFieldControlView = <ItemType,>(
  props: MultiSelectExtFieldControlEditableProps<ItemType>
) => {
  const {
    className,
    value,
    items,
    renderValue,
    placeholder,
    valueField = 'value' as keyof ItemType,
    labelField = 'label' as keyof ItemType,
  } = props;

  const cls = ClassNameInjection(
    'multi-select-ext-field-control',
    'multi-select-field-control',
    'field-control',
    'field-control_is-view',
    className ? className : undefined,
    !value || value.length === 0 ? 'field-control_no-data' : undefined
  );

  return value && value.length > 0 ? (
    <div className={cls}>
      {multiSelectExtRenderValue(
        value,
        valueField,
        labelField,
        items,
        placeholder,
        renderValue
      )}
    </div>
  ) : (
    <div className={cls}>не указано</div>
  );
};
