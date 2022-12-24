import {IAPIModule} from '../../../InfrastructureLayer/APIModule/interfaces';
import {IUserDTO, IUserRegDTO, IBankUserRoleDTO} from '../../../Model/User';
import {IUserAPIClient} from './interfaces';
import {Params} from 'router5/dist/types/base';
import mockSession from '../../../Model/Session/mock';
import {inject, injectable} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../InfrastructureLayer/identifiers';
import {USERS_MOCK} from '../../../Model/User/mock';

@injectable()
export class UserAPIClient implements IUserAPIClient {
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  getUsers(searchParams?: Params): Promise<IUserDTO[]> {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<IUserDTO[]>((resolve) =>
        setTimeout(() => resolve(USERS_MOCK), 1000)
      );
    }
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule
        .getData<IUserDTO[]>(`users/bank`, {
          ...searchParams,
          bankId: mockSession?.user.bankInfoId,
        })
        .then((res) => (res ? res : ([] as IUserDTO[])))
        .catch((e) => [] as IUserDTO[]);
    }
    return this.apiModule.getData(`users/bank`, searchParams);
  }

  // @todo: нужно апи
  getUsersTB = (territorialBankId: string): Promise<IUserDTO[]> => {
    return this.getUsers({offset: 0, limit: 100});
  };

  getUser = (userId: string): Promise<IUserDTO> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData(
        `users/${mockSession?.user.bankInfoId}/${userId}`
      );
    }
    return this.apiModule.getData(`users/${userId}`);
  };

  createUser = (user: IUserDTO): Promise<IUserDTO> => {
    return this.apiModule.postData<IUserDTO>('users', user);
  };

  updateUser = (user: IUserDTO): Promise<IUserDTO> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.putData<IUserDTO>('users', user);
    } else {
      return this.apiModule.putData<IUserDTO>('users/update/user', {
        email: user.email,
        password: user.password,
      } as IUserDTO);
    }
  };

  updateUserAdmin = (user: IUserDTO): Promise<IUserDTO> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.putData<IUserDTO>('users', user);
    } else {
      return this.apiModule.putData<IUserDTO>('users/update/admin', {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
        role: user.role,
        tbId: user.tbId,
      } as IUserDTO);
    }
  };

  deleteUser = (userId: string): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.deleteData(
        `users/${mockSession?.user.bankInfoId}/${userId}`
      );
    }
    return this.apiModule.deleteData(`users/${userId}`);
  };

  regUser = async (userRegDTO: IUserRegDTO): Promise<boolean> => {
    if (process.env.NODE_ENV === 'development') {
      return await this.apiModule
        .postData('registration', userRegDTO)
        .then(() => true)
        .catch(() => false);
    }
    return await this.apiModule
      .postData('public/registration', userRegDTO)
      .then(() => true)
      .catch(() => false);
  };

  getBankUserRoles = async (): Promise<IBankUserRoleDTO[]> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData<IBankUserRoleDTO[]>(
        `platform-support/${mockSession?.bank.objectId}/roles`
      );
    }
    return this.apiModule.getData<IBankUserRoleDTO[]>(`available-roles`);
  };
}

/**
 * Есть 2 АПИ метода:
 * /backtofront/v1/vedreb/users/update/user - для редактирования пользователя самим пользователем
 * /backtofront/v1/vedreb/users/update/admin - для редактирования пользователя админом
 *
 * И соответственно 2 вызова:
 * updateUser (user: IUserDTO) - для редактирования пользователя самим пользователем
 * updateUserAdmin (user: IUserDTO) - для редактирования пользователя админом
 */
