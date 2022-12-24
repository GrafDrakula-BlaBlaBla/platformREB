import React, {FC} from 'react';
import Badge from '@material-ui/core/Badge';
import './index.less';
import {ClassNameInjection} from '../../../../Utils/ClassNames/ClassNameInjection';

export interface IBadgePulseProps {
  pulse?: boolean;
}
export const BadgePulse: FC<IBadgePulseProps> = (props) => {
  const {pulse, children} = props;
  const cls = ClassNameInjection(
    'badge-pulse',
    pulse ? 'badge-pulse_pulse' : undefined
  );
  return (
    <Badge className={cls} variant="dot">
      {children}
    </Badge>
  );
};
