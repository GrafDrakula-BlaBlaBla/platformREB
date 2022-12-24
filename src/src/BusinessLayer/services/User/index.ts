import {Params} from 'router5/dist/types/base';
import {ISession} from '../../../Bootstrap/Session/interfaces';
import {IUserAPIClient} from '../../../IntegrationLayer/APIClients/User/interfaces';
import {IUserDTO, IUserRegDTO} from '../../../Model/User';
import {IUserService} from './interfaces';
import {getFIO} from '../../../Model/User/functions';
import {IBankUserRoleDTO} from '../../../Model/User';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../IntegrationLayer/identifiers';
import {SESSION} from '../../../Bootstrap/Session';

@injectable()
export class UserService implements IUserService {
  @inject(API_CLIENT.User) protected APIClient!: IUserAPIClient;
  @inject(SESSION) protected session!: ISession;

  getUsers = async (searchParams?: Params): Promise<IUserDTO[]> => {
    const users = await this.APIClient.getUsers(searchParams);
    return users?.map((user) => {
      user.FIO = getFIO(user);
      return user;
    });
  };

  getUsersTB = async (territorialBankId: string): Promise<IUserDTO[]> => {
    const users = await this.APIClient.getUsersTB(territorialBankId);
    return users?.map((user) => {
      user.FIO = getFIO(user);
      return user;
    });
  };

  getUser = async (userId: string): Promise<IUserDTO> => {
    return this.APIClient.getUser(userId);
  };

  saveUser = async (user: IUserDTO): Promise<IUserDTO> => {
    return this.APIClient.updateUser(user);
  };

  saveUserAdmin = async (user: IUserDTO): Promise<IUserDTO> => {
    if (user.id) {
      return this.APIClient.updateUserAdmin(user);
    } else {
      return this.APIClient.createUser(user);
    }
  };

  deleteUser = (userId: string) => {
    return this.APIClient.deleteUser(userId);
  };

  regUser = async (userRegDTO: IUserRegDTO): Promise<boolean> => {
    return this.APIClient.regUser(userRegDTO);
  };

  getCurrentUser = async () => {
    const session = await this.session.getSession();
    return this.getUser(session?.user?.id);
  };

  getBankUserRoles = async (): Promise<IBankUserRoleDTO[]> => {
    return this.APIClient.getBankUserRoles();
  };
}
