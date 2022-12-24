import {IAPIModule} from '../../../InfrastructureLayer/APIModule/interfaces';
import {IDiscussionAPIClient, IDiscussionGETParams} from './interfaces';
import {IDiscussionMessageDTO} from '../../../Model/Discussion/Model';
import {IBaseListDTO} from '../../../Model/BaseList';
import {d_BaseList} from '../../Decorators/d_BaseList';
import {inject, injectable} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../InfrastructureLayer/identifiers';

@injectable()
export class DiscussionAPIClient implements IDiscussionAPIClient {
  protected urlPrefix: string = 'comment';

  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  @d_BaseList
  async getMessages(
    params: IDiscussionGETParams
  ): Promise<IBaseListDTO<IDiscussionMessageDTO>> {
    return this.apiModule.getData<IBaseListDTO<IDiscussionMessageDTO>>(
      `${this.urlPrefix}/fetchThread`,
      params
    );
  }

  sendMessage = async (
    userId: string,
    message: IDiscussionMessageDTO
  ): Promise<boolean> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule
        .postData<any>(`${this.urlPrefix}/create/${userId}`, message)
        .then(() => true)
        .catch(() => false);
    }

    return this.apiModule
      .postData<any>(`${this.urlPrefix}`, message)
      .then(() => true)
      .catch(() => false);
  };

  editMessage = async (message: IDiscussionMessageDTO): Promise<boolean> => {
    return this.apiModule
      .putData(`${this.urlPrefix}/update`, message)
      .then(() => true)
      .catch(() => false);
  };

  deleteMessage = async (messageId: string): Promise<boolean> => {
    return this.apiModule
      .deleteData(`${this.urlPrefix}/delete/${messageId}`)
      .then(() => true)
      .catch(() => false);
  };
}
