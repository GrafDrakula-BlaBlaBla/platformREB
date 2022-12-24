import {IBaseViewModel} from '../Base/interfaces';

export interface IBaseCardViewModel<T> extends IBaseViewModel {
  data?: T;
  isEditCard: boolean;
  isOpenCard: boolean;
  setIsEditCard(isEdit: boolean): void;
  setIsOpenCard(isOpenCard: boolean): void;
  clearData(): void;
  setData(data?: T): void;
  setField(name: keyof T, value?: number | string | boolean): void;
  setFields(data: T): void;
  saveData(): Promise<void>;
}
