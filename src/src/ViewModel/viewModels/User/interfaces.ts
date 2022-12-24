import {IBaseCardViewModel} from '../BaseCard/interfaces';
import {IUserDTO, IUserRegDTO, IBankUserRoleDTO} from '../../../Model/User';
import {Params} from 'router5/dist/types/base';

export interface IUserViewModel extends IBaseCardViewModel<IUserDTO> {
  users: IUserDTO[];
  currentUser?: IUserDTO;
  isEditAdmin: boolean;
  bankUserRoles: IBankUserRoleDTO[];
  isUserLoading: boolean;

  setIsEditAdmin: (isEditAdmin: boolean) => void;
  setUsers: (data: IUserDTO[]) => void;
  clearData: () => void;

  getUser: (userId: string) => Promise<void>;
  getUsers: (searchParams?: Params) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  regUser: (userRegDTO: IUserRegDTO) => Promise<boolean>;

  saveDataUser: () => Promise<void>;
  saveDataAdmin: () => Promise<void>;

  setCurrentUser: (data: IUserDTO) => void;
  getCurrentUser: () => Promise<IUserDTO>;
  reloadCurrentUser: () => void;

  getBankUserRoles: () => Promise<void>;
}
