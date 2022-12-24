export interface IBaseListDTO<T> {
  total: number;
  items: T[];
}

export class BaseListDTO<T> implements IBaseListDTO<T> {
  total: number = 0;
  items: T[] = [];
  constructor(data?: T[]) {
    if (data) {
      this.items = data;
      this.total = data.length;
    }
  }
}
