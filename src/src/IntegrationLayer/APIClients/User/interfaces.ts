import {Params} from 'router5/dist/types/base';
import {IUserDTO, IUserRegDTO, IBankUserRoleDTO} from '../../../Model/User';

export interface IUserAPIClient {
  getUsers: (searchParams?: Params) => Promise<IUserDTO[]>;
  getUsersTB: (territorialBankId: string) => Promise<IUserDTO[]>;
  getUser: (userId: string) => Promise<IUserDTO>;
  createUser: (user: IUserDTO) => Promise<IUserDTO>;
  updateUser: (user: IUserDTO) => Promise<IUserDTO>;
  updateUserAdmin: (user: IUserDTO) => Promise<IUserDTO>;
  deleteUser: (userId: string) => Promise<void>;
  regUser: (userDTO: IUserRegDTO) => Promise<boolean>;
  getBankUserRoles: () => Promise<IBankUserRoleDTO[]>;
}
