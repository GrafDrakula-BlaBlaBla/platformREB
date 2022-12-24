import {action, makeObservable, observable} from 'mobx';
import {Params} from 'router5/dist/types/base';
import {SStorage} from '../../../Utils/Storage';
import {constants} from 'router5';
import {IFilterViewModel} from './interfaces';
import {injectable} from 'inversify';

@injectable()
export class FilterViewModel implements IFilterViewModel {
  filters: Record<string, any> = {};
  protected _callback: Array<(filters: Record<string, string>) => void> = [];

  constructor() {
    makeObservable(this, {
      filters: observable,
      setFilters: action,
      setFilter: action,
      setFilterObject: action,
      getFilter: action,
    });
  }

  subscribeOnFilters = (
    callback: (filters: Record<string, string>) => void
  ) => {
    this._callback.push(callback);
  };
  unsubscribeOnFiltersAll = () => {
    this._callback = [];
  };

  getFilter = (key: string) => {
    return this.filters[key];
  };

  setFilterValue = (filters: Record<string, any>, key: string, value: any) => {
    if (
      (Array.isArray(value) && value.length > 0) ||
      (!Array.isArray(value) && value) ||
      (Number.isInteger(value) && value === 0)
    ) {
      filters[key] = value;
    } else {
      delete filters[key];
    }
  };
  setFilter = (key: string, value: any, routeName?: string) => {
    const filters = this.resetFiltersOffset();
    this.setFilterValue(filters, key, value);
    this.setFilters(filters, routeName);
  };
  setFilterObject = (object: Record<string, any>, routeName?: string) => {
    const filters = this.resetFiltersOffset();
    for (const [key, value] of Object.entries(object))
      this.setFilterValue(filters, key, value);
    this.setFilters(filters, routeName);
  };
  setFilters = (filters: Params, routeName?: string) => {
    if (!this.compareFilters(this.filters, filters)) {
      this.filters = this.parseFilters(filters);
      this.setFiltersToQueryParams();
      this.setFiltersToSessionStorage(routeName);
      this._callback.forEach((callback) => {
        callback(this.filters);
      });
    }
  };

  setFiltersToSessionStorage = (routeName?: string) => {
    if (routeName && routeName !== constants.UNKNOWN_ROUTE) {
      SStorage.filters = {...SStorage.filters, [routeName]: this.filters};
    }
  };
  setFiltersToQueryParams = () => {
    const _filters = {...this.filters};
    const _array = [];
    for (let key in _filters) {
      if (_filters[key] || _filters[key] === 0) {
        if (Array.isArray(_filters[key])) {
          _array.push(`${key}=[${_filters[key]}]`);
        } else {
          _array.push(`${key}=${_filters[key]}`);
        }
      }
    }
    if (_array.length > 0) {
      window.history.pushState(
        null,
        '',
        `${window.location.hash.split('?')[0]}?${_array.join('&')}`
      );
    } else {
      window.history.pushState(
        null,
        '',
        `${window.location.hash.split('?')[0]}`
      );
    }
  };

  resetFiltersOffset = () => {
    const filters = {...this.filters};
    if (filters.hasOwnProperty('offset')) filters.offset = 0;
    return filters;
  };
  compareFilters = (from: Record<string, any>, to: Record<string, any>) => {
    return JSON.stringify(from) === JSON.stringify(to);
  };
  parseFilters = (filters: Record<string, any>) => {
    const _filters = {...filters};
    for (let key in _filters) {
      if (this.isArrayString(_filters[key])) {
        _filters[key] = this.getArrayFromString(_filters[key]);
      }
    }
    return _filters;
  };

  isArrayString = (value: string) => {
    const regexp = /\[.+(,.+)*]/gm;
    return regexp.test(value);
  };
  getArrayFromString = (value: string) => {
    const regexp = /\[(.+(,.+)*)]/gm;
    return regexp.exec(value)?.[1].split(',');
  };
}
