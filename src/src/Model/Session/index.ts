import {IUserDTO} from '../User';
import {IBankDTO} from '../Banks';

export type TPermission = Record<string, Array<string>>;

export interface ISessionDTO {
  user: IUserDTO;
  bank: IBankDTO;
  permissions: TPermission;
}
