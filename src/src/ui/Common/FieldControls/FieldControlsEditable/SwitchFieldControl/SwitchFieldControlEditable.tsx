import React from 'react';
import {
  SwitchFieldControlProps,
  SwitchFieldControl,
} from '../../FieldControlsBase';
import {SwitchFieldControlView} from './SwitchFieldControlView';

export type SwitchFieldControlEditableProps = SwitchFieldControlProps & {
  isEdit?: boolean;
};

export const SwitchFieldControlEditable = (
  props: SwitchFieldControlEditableProps
) => {
  const {className, isEdit = true, value, ...other} = props;
  return isEdit ? (
    <SwitchFieldControl value={value} className={className} {...other} />
  ) : (
    <SwitchFieldControlView value={value} className={className} {...other} />
  );
};
