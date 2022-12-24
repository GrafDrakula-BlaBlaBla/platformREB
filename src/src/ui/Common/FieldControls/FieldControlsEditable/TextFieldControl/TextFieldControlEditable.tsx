import React from 'react';
import {TextFieldControl, TextFieldControlProps} from '../../FieldControlsBase';
import {TextFieldControlView} from './TextFieldControlView';

export type TextFieldControlEditableProps = TextFieldControlProps & {
  isEdit?: boolean;
  viewFormat?: (value?: string | number) => string;
};

export const TextFieldControlEditable = (
  props: TextFieldControlEditableProps
) => {
  const {className, isEdit = true, value, ...other} = props;
  return isEdit ? (
    <TextFieldControl value={value} className={className} {...other} />
  ) : (
    <TextFieldControlView value={value} className={className} {...other} />
  );
};
