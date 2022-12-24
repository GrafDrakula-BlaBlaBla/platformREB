import React from 'react';
import Alert, {AlertProps} from '@material-ui/lab/Alert';
import './index.less';

const AlertCustom = ({...props}: AlertProps) => (
  <Alert {...props} className="alert-custom" />
);

export {AlertCustom as Alert};
