import React, {FC, useContext} from 'react';
import PermissionContext from '../../app/contexts/PremissionContext';

interface IPremissionWrapper {
  permission: string;
  action: string;
}

export const PermissionWrapper: FC<IPremissionWrapper> = ({
  permission,
  action,
  children,
}) => {
  const context = useContext(PermissionContext);
  const isAccess = context.isAccess(permission, action);

  return <>{isAccess ? children : null}</>;
};
