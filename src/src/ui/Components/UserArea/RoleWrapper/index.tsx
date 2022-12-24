import React from 'react';
import {getValue} from '../../../../Utils/Enum/getValue';
import {
  CBRoles,
  CBRolesNames,
  REBRoles,
  REBRolesNames,
} from '../../../../Model/User';
import memoize from '../../../../Utils/Function/memoize';

interface IRoleWrapperProps {
  role: string;
}

const getClassName = memoize(function (role: string): string | undefined {
  switch (role) {
    case CBRoles.ROLE_CB_ADMIN:
    case CBRoles.ROLE_CB_VIEWER:
    case CBRoles.ROLE_CB_CLIENT_MANAGER:
    case CBRoles.ROLE_CB_CONTROLLER:
    case REBRoles.ROLE_REB_ADMIN:
    case REBRoles.ROLE_REB_VIEWER:
    case REBRoles.ROLE_REB_CURATOR:
    case REBRoles.ROLE_REB_CONTROLLER:
      return '';
    default:
      return 'color-gray';
  }
});

export const RoleWrapper = (props: IRoleWrapperProps) => {
  return (
    <span className={getClassName(props.role)}>
      {getValue(REBRolesNames, props.role) ||
        getValue(CBRolesNames, props.role) ||
        'не указано'}
    </span>
  );
};
