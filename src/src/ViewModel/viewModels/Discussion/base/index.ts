import {injectable} from 'inversify';
import {action, makeObservable, observable} from 'mobx';
import moment from 'moment';
import {
  IDiscussionService,
  IMapMessagesOnDay,
} from '../../../../BusinessLayer/services/Discussion/interfaces';
import {getFIO} from '../../../../Model/User/functions';
import {IDiscussionGETParams} from '../../../../IntegrationLayer/APIClients/Discussion/interfaces';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {IDiscussionMessageDTO} from '../../../../Model/Discussion/Model';
import {BaseViewModel} from '../../Base';
import {IDiscussionViewModel} from '../interfaces';

/**
 * mapMessagesOnDay - мапка для хранения {день: массив сообщений}. Мапка гарантирует последовательность в которой были положены объекты
 * scrollHeight - высота блока в котором крутятся сообщения
 * actualTotal - количество отображаемых сообщений
 * haveNew - есть ли сообщения которых пользователь еще не видел
 * total - общее количество сообщений треда
 * _data - данные как есть
 */

@injectable()
export class DiscussionViewModel
  extends BaseViewModel
  implements IDiscussionViewModel {
  mapMessagesOnDay: IMapMessagesOnDay = new Map();
  scrollHeight: number = 0;
  offset: number = 0;
  total: number = 0;
  actualTotal: number = 0;
  haveNew: boolean = false;
  protected _data: IDiscussionMessageDTO[] = [];
  protected service!: IDiscussionService;

  constructor() {
    super();

    makeObservable(this, {
      mapMessagesOnDay: observable,
      scrollHeight: observable,
      offset: observable,
      haveNew: observable,
      setOffset: action,
      setMessages: action,
      setScrollHeight: action,
      setHaveNew: action,
    });
  }

  editMessage = async (message: IDiscussionMessageDTO) => {
    this.setLoading();
    return this.service.editMessage(message).finally(this.unsetLoading);
  };

  deleteMessage = async (messageId: string) => {
    this.setLoading();
    return this.service.deleteMessage(messageId).finally(this.unsetLoading);
  };

  getMessages = async (params: IDiscussionGETParams): Promise<void> => {
    this.setLoading();
    const messages = await this._fetchMessages(params).finally(
      this.unsetLoading
    );
    this._data = [...this._data, ...messages.items];
    this.total = messages.total;
    this.setActualTotal(this._data.length);
    const mapMessageDate = this._getMapMessageOnDayFromSource(this._data);
    this.setMessages(mapMessageDate);
  };

  updateMessages = async (params: IDiscussionGETParams): Promise<void> => {
    const messages = await this._fetchMessages(params);

    if (messages?.total > this.total) {
      this._data = messages.items;
      this.total = messages.total;
      this.setActualTotal(messages.items.length);
      this.setHaveNew(true);
      const mapMessageDate = this._getMapMessageOnDayFromSource(messages.items);
      this.setMessages(mapMessageDate);
    }
  };

  clearMessages = () => {
    this._data = [];
    this.actualTotal = 0;
    this.total = 0;
    this.offset = 0;
    this.setMessages(new Map());
  };

  setMessages = (data: IMapMessagesOnDay) => {
    this.mapMessagesOnDay = data;
  };

  setOffset = (offset?: number) => {
    this.offset = offset || 0;
  };

  setHaveNew = (isNew: boolean) => {
    this.haveNew = isNew;
  };

  setScrollHeight = (height?: number) => {
    this.scrollHeight = height || 0;
  };

  setActualTotal = (n: number): void => {
    this.actualTotal = n;
  };

  _fetchMessages = async (
    params: IDiscussionGETParams
  ): Promise<IBaseListDTO<IDiscussionMessageDTO>> => {
    return await this.service.getMessages(params);
  };

  _getMapMessageOnDayFromSource = (data: IDiscussionMessageDTO[]) => {
    return new MessageStruct(data)
      .getMessToDate()
      .sortDate()
      .getMapMessToDate();
  };
}

// вспомогательный класс MessageStruct Служит для создания нужной для отображения структуры данных
class MessageStruct {
  _messToDate: {[key: string]: IDiscussionMessageDTO[]} = {};
  _mapMessToDate: Map<string, IDiscussionMessageDTO[]> = new Map();
  _sortDate: number[] = [];
  constructor(protected data: IDiscussionMessageDTO[]) {}

  getMessToDate = (): MessageStruct => {
    this.data.forEach((message) => {
      const time = moment(message.createdAt, 'DD.MM.YYYY').toDate().getTime();
      this._sortDate.push(time);
      if (!this._messToDate[time]) {
        this._messToDate[time] = [];
      }
      message.FIO = getFIO(message.senderUser);
      message.time = moment(message.createdAt).format('HH:mm');
      this._messToDate[time].unshift(message);
    });
    return this;
  };

  sortDate = (): MessageStruct => {
    this._sortDate = this._sortDate.sort((a: number, b: number): number => {
      return a < b ? -1 : 1;
    });
    return this;
  };

  getMapMessToDate = (): Map<string, IDiscussionMessageDTO[]> => {
    this._sortDate.forEach((day) => {
      this._mapMessToDate.set(
        moment(day).format('DD.MM.YYYY'),
        this._messToDate[day]
      );
    });

    return this._mapMessToDate;
  };
}
