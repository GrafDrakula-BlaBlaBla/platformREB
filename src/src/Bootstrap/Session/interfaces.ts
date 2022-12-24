import {ISessionDTO} from '../../Model/Session';

export interface ISession {
  getSession: () => Promise<ISessionDTO>;
  isBankManual: () => boolean;
}
