import {action, makeObservable, observable} from 'mobx';
import {EStatusCodes} from '../../../Model/Status';
import {ListViewModel} from '../List';
import {IRegistriesViewModel} from './interfaces';
import {IRegistriesService} from '../../../BusinessLayer/services/Registries/interfaces';
import {IRegistriesDTO} from '../../../Model/Registries';
import {IAppViewModel} from '../App/interfaces';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../BusinessLayer/identifiers';
import {VIEW_MODEL} from '../../identifiers';

@injectable()
export class RegistriesViewModel
  extends ListViewModel<IRegistriesDTO, IRegistriesService>
  implements IRegistriesViewModel {
  @inject(SERVICE.Registries) protected service!: IRegistriesService;
  @inject(VIEW_MODEL.App) protected appViewModel!: IAppViewModel;

  constructor() {
    super();

    makeObservable(this, {
      getItem: action,
      createItem: action,
      updateItem: action,
      registry: observable,
    });
  }
  registry: IRegistriesDTO | undefined;

  getItem = async (id: string): Promise<void> => {
    this.setLoading();
    this.registry = await this.service.getItem(id);
    this.unsetLoading();
  };

  createItem = async (): Promise<void> => {
    this.setLoading();
    this.registry = await this.service.createItem();
    this.unsetLoading();
  };

  updateItem = async (id: string, status: EStatusCodes): Promise<void> => {
    this.setLoading();
    this.registry = await this.service.updateItem(id, status);
    this.unsetLoading();
  };

  sendRegistryToReb = async (id: string) => {
    const {sendNotification} = this.appViewModel;
    await this.updateItem(id, EStatusCodes.ON_CONSIDERATION)
      .then(function (_) {
        sendNotification({
          title: 'Реестр отправлен',
          text: 'Реестр отправлен в РЭБ',
        });
      })
      .catch(function (_) {
        sendNotification({
          title: 'Произошла ошибка',
          text: 'Повторите попытку позже',
          isError: true,
        });
      });
    this.unsetLoading();
  };

  acceptRegistry = (id: string) => {
    this.updateItem(id, EStatusCodes.ACCEPTED);
  };

  rejectRegistry = (id: string) => {
    this.updateItem(id, EStatusCodes.REJECTED);
  };

  downloadRegistry = (id: string) => {
    this.service.downloadRegistry(id);
  };
}
