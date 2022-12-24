import {action, makeObservable, observable} from 'mobx';
import {Params} from 'router5/dist/types/base';
import {IUserDTO, IUserRegDTO, IBankUserRoleDTO} from '../../../Model/User';
import {BaseCardViewModel} from '../BaseCard';
import {IUserService} from '../../../BusinessLayer/services/User/interfaces';
import {IUserViewModel} from './interfaces';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../BusinessLayer/identifiers';

@injectable()
export class UserViewModel
  extends BaseCardViewModel<IUserDTO>
  implements IUserViewModel {
  users: IUserDTO[] = [];
  currentUser?: IUserDTO;
  bankUserRoles: IBankUserRoleDTO[] = [];
  isEditAdmin: boolean = false;
  isUserLoading: boolean = false;

  @inject(SERVICE.User) protected service!: IUserService;

  constructor() {
    super();
    makeObservable(this, {
      users: observable,
      currentUser: observable,
      isEditAdmin: observable,
      bankUserRoles: observable,
      isUserLoading: observable,

      setIsEditAdmin: action,
      setUsers: action,
      clearData: action,

      getUser: action,
      getUsers: action,
      deleteUser: action,
      regUser: action,
      setIsUserLoading: action,

      saveDataUser: action,
      saveDataAdmin: action,

      getCurrentUser: action,
      setCurrentUser: action,
      reloadCurrentUser: action,

      setBankUserRoles: action,
    });
  }

  setIsEditAdmin = (isEditAdmin: boolean) => {
    this.isEditAdmin = isEditAdmin;
  };
  setUsers = (data: IUserDTO[]): void => {
    this.users = data;
  };
  clearData = () => {
    this.setIsEditAdmin(false);
    this.setData();
  };

  getUser = async (userId: string) => {
    this.setIsUserLoading(true);
    const data = await this.service.getUser(userId);
    this.setData(data);
    this.setIsUserLoading(false);
  };
  setIsUserLoading = (value: boolean) => {
    this.isUserLoading = value;
  };

  getUsers = async (searchParams?: Params): Promise<void> => {
    this.setLoading();
    const data = await this.service.getUsers(searchParams);
    this.setUsers(data);
    this.unsetLoading();
  };
  deleteUser = async (userId: string): Promise<void> => {
    this.setLoading();
    await this.service.deleteUser(userId);
    this.unsetLoading();
  };
  regUser = async (userRegDTO: IUserRegDTO): Promise<boolean> => {
    this.setLoading();
    return await this.service.regUser(userRegDTO).finally(() => {
      this.unsetLoading();
    });
  };

  saveData = async (): Promise<void> => {
    if (this.isEditAdmin) {
      await this.saveDataAdmin();
    } else {
      await this.saveDataUser();
    }
  };
  saveDataUser = async (): Promise<void> => {
    this.setLoading();
    if (this.data) {
      const data = await this.service.saveUser(this.data);
      this.setData(data);
      this.unsetLoading();
    }
  };
  saveDataAdmin = async (): Promise<void> => {
    this.setLoading();
    if (this.data) {
      const data = await this.service.saveUserAdmin(this.data);
      this.setData(data);
      this.unsetLoading();
    }
  };

  setCurrentUser(user?: IUserDTO) {
    this.currentUser = user;
  }
  getCurrentUser = async (): Promise<IUserDTO> => {
    if (this.currentUser) {
      return Promise.resolve(this.currentUser);
    }
    this.setLoading();
    const user = await this.service.getCurrentUser();
    this.setCurrentUser(user);
    this.unsetLoading();
    return user;
  };
  reloadCurrentUser = () => {
    this.setCurrentUser(undefined);
    this.getCurrentUser();
  };

  getBankUserRoles = async (): Promise<void> => {
    this.setLoading();
    const roles = await this.service.getBankUserRoles();
    this.setBankUserRoles(roles);
    this.unsetLoading();
  };
  setBankUserRoles = (roles: IBankUserRoleDTO[]) => {
    this.bankUserRoles = roles;
  };
}
