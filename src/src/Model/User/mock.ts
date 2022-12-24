import {IUserDTO} from './index';
import {session_kb_mock, session_reb_mock} from '../Session/mock';

export const USERS_MOCK: IUserDTO[] = [
  {...session_kb_mock.user},
  {...session_reb_mock.user},
];
