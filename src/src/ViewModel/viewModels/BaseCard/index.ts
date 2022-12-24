import {injectable} from 'inversify';
import {action, makeObservable, observable} from 'mobx';
import {BaseViewModel} from '../Base';
import {IBaseCardViewModel} from './interfaces';

@injectable()
export class BaseCardViewModel<T>
  extends BaseViewModel
  implements IBaseCardViewModel<T> {
  data?: T;
  isEditCard: boolean = false;
  isOpenCard: boolean = false;

  constructor() {
    super();

    makeObservable(this, {
      data: observable,
      isEditCard: observable,
      isOpenCard: observable,
      setIsEditCard: action,
      setIsOpenCard: action,
      clearData: action,
      setData: action,
      setField: action,
      setFields: action,
      saveData: action,
    });
  }

  setIsEditCard = (isEditCard: boolean) => {
    this.isEditCard = isEditCard;
  };

  setIsOpenCard = (isOpenCard: boolean) => {
    this.isOpenCard = isOpenCard;
  };

  clearData = () => {
    this.data = undefined;
  };

  setData = (data?: T) => {
    this.data = data;
  };

  setField = (name: keyof T, value?: number | string | boolean): void => {
    const data = this.data || ({} as T);
    data[name as keyof T] = value as never;
    this.setData(data);
  };

  setFields = (data: T): void => {
    Object.keys(data).forEach((key) => {
      const value = data?.[key as keyof T];
      this.setField(key as keyof T, value as never);
    });
  };

  saveData = async (): Promise<void> => {};
}
