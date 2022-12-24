import {Params} from 'router5/dist/types/base';
import {IUserDTO, IUserRegDTO, IBankUserRoleDTO} from '../../../Model/User';

export interface IUserService {
  getUsers: (searchParams?: Params) => Promise<IUserDTO[]>;
  getUsersTB: (territorialBankId: string) => Promise<IUserDTO[]>;
  getUser: (userId: string) => Promise<IUserDTO>;
  saveUser: (user: IUserDTO) => Promise<IUserDTO>;
  saveUserAdmin: (user: IUserDTO) => Promise<IUserDTO>;
  deleteUser: (userId: string) => Promise<void>;
  regUser: (userRegDTO: IUserRegDTO) => Promise<boolean>;
  getCurrentUser: () => Promise<IUserDTO>;
  getBankUserRoles: () => Promise<IBankUserRoleDTO[]>;
}
