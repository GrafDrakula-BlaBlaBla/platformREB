import {injectable} from 'inversify';
import {action, makeObservable, observable} from 'mobx';
import {
  TMenuConfig,
  TMenuConfigItem,
} from '../../../ui/app/settings/menuConfig/MenuConfig';
import {IMenuHierarchy, IMenuViewModel} from './interfaces';

@injectable()
export class MenuViewModel implements IMenuViewModel {
  menuHierarchy: Map<number, IMenuHierarchy> = new Map();
  isOpen: boolean = false;

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      menuHierarchy: observable,
      closeMenu: action,
      openMenu: action,
      setMenuConfig: action,
    });
  }

  closeMenu = () => {
    this.isOpen = false;
  };

  openMenu = () => {
    this.isOpen = true;
  };

  setMenuConfig = (menuConfig: TMenuConfig) => {
    this.menuHierarchy = this._getMenuHierarchy(menuConfig);
  };

  _getMenuHierarchy = (
    menuConfig: TMenuConfig
  ): Map<number, IMenuHierarchy> => {
    const hierarchyMenuList: Map<number, TMenuConfigItem> = new Map();
    (menuConfig as Array<IMenuHierarchy>).forEach((menuItem) => {
      if (menuItem.parentId) {
        if (!hierarchyMenuList.has(menuItem.parentId)) {
          const parentMenuItem = this._findMenuItem(
            hierarchyMenuList,
            menuItem.parentId
          );
          if (parentMenuItem) {
            parentMenuItem.childs = parentMenuItem.childs || new Map();
            parentMenuItem.childs.set(menuItem.id, menuItem);
          }
        } else {
          const parentItem = hierarchyMenuList.get(menuItem.parentId);
          if (parentItem) {
            parentItem.childs = parentItem.childs || new Map();
            parentItem.childs.set(menuItem.id, menuItem as IMenuHierarchy);
          }
        }
      } else {
        hierarchyMenuList.set(menuItem.id, menuItem as IMenuHierarchy);
      }
    });

    return hierarchyMenuList as Map<number, IMenuHierarchy>;
  };

  _findMenuItem = (
    hierarchyMenuList: Map<number, TMenuConfigItem>,
    menuItemId: number
  ): TMenuConfigItem | undefined => {
    let targetMenuItem: TMenuConfigItem | undefined = undefined;

    for (let menuItem of Array.from(hierarchyMenuList.values())) {
      if (menuItem.childs) {
        if (!menuItem.childs.has(menuItemId)) {
          targetMenuItem = this._findMenuItem(menuItem.childs, menuItemId);
        } else {
          targetMenuItem = menuItem.childs.get(menuItemId);
        }
      }
    }

    return targetMenuItem;
  };
}
