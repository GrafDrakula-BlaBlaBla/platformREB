import {IMenuHierarchy} from '../../../../ViewModel/viewModels/Menu/interfaces';

export type TMenuConfigItem = Partial<IMenuHierarchy> &
  Pick<IMenuHierarchy, 'id'>;

export type TMenuConfig = Array<TMenuConfigItem>;
