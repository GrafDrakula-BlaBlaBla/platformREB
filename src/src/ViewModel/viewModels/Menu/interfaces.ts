import {TMenuConfig} from '../../../ui/app/settings/menuConfig/MenuConfig';

export interface IMenuViewModel {
  menuHierarchy: Map<number, IMenuHierarchy>;
  isOpen: boolean;
  closeMenu: () => void;
  openMenu: () => void;
  setMenuConfig: (menuCnfig: TMenuConfig) => void;
}

export interface IMenuHierarchy {
  id: number;
  parentId: number | null;
  title: string;
  path: string;
  redirect?: string;
  logo: React.ReactNode;
  nestedPaths?: Array<string>;
  segment?: string;
  permission: string;
  childs?: Map<number, IMenuHierarchy>;
  isOpen?: boolean;
  active: boolean;
}
