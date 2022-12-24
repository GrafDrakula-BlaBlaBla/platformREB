import {IAPIModule} from '../../InfrastructureLayer/APIModule/interfaces';
import {EBankInteractionTypes} from '../../Model/Banks';
import {ISession} from './interfaces';
import {ISessionDTO} from '../../Model/Session';
import mockSession from '../../Model/Session/mock';

export const SESSION = Symbol('Session');

export class Session implements ISession {
  private session?: ISessionDTO;
  constructor(protected apiModule: IAPIModule) {}

  getSession = async (): Promise<ISessionDTO> => {
    if (process.env.NODE_ENV === 'development') {
      this.session = mockSession;
      return Promise.resolve(this.session as ISessionDTO);
    }

    if (this.session) {
      return Promise.resolve(this.session);
    }

    this.session = await this.apiModule.getData<ISessionDTO>('auth/session');
    return this.session || null;
  };

  isBankManual = (): boolean => {
    return (
      !this.session?.user.isReb &&
      this.session?.bank.settings?.interactionType ===
        EBankInteractionTypes.MANUAL
    );
  };
}
