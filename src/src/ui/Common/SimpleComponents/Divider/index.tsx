import React from 'react';
import Divider, {DividerProps} from '@material-ui/core/Divider';
import './index.less';

const DividerCustom = ({...props}: DividerProps) => (
  <Divider {...props} className="divider-custom" />
);

export {DividerCustom as Divider};
