import {createContext} from 'react';
import {TPermission} from '../../../Model/Session';

export interface IPermissionCtx {
  permissions: TPermission;
  isAccess: (permission: string, action: string) => boolean;
}

export class PermissionCtx implements IPermissionCtx {
  permissions: TPermission;

  constructor(permission: TPermission) {
    this.permissions = permission;
    this.isAccess = this.isAccess.bind(this);
  }

  isAccess(permission: string, action: string): boolean {
    const _rules = this.findRules(permission);
    const _parentRules = this.findParentRules(permission);

    return (
      this.computeAccess(_rules, action) ||
      this.computeAccess(_parentRules, action)
    );
  }

  private findRules = (permission: string): Array<string> => {
    return this.permissions[permission] || [];
  };

  private findParentRules = (permission: string): Array<string> => {
    const parentPermissionName = Object.keys(this.permissions).filter(
      (item) => {
        return permission.startsWith(item);
      }
    )[0];

    return this.permissions[parentPermissionName] || [];
  };

  private computeAccess = (rules: Array<string>, action: string): boolean => {
    return (
      (rules.length === 1 && rules[0] === '**') || rules.indexOf(action) !== -1
    );
  };
}

const PermissionContext = createContext<PermissionCtx>({} as PermissionCtx);

export default PermissionContext;
