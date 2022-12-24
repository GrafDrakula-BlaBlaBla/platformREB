import {Params} from 'router5/dist/types/base';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface IAPIModule {
  getData: <P>(url: string, queryDTO?: Params) => Promise<P>;
  postData: <P, T = void>(
    url: string,
    reqDTO?: T extends void ? P : T,
    queryDTO?: Params
  ) => Promise<P>;
  putData: <P>(url: string, reqDTO?: P, queryDTO?: Params) => Promise<P>;
  deleteData: (url: string, queryDTO?: Params) => Promise<void>;
  postFormData: <P>(url: string, form: FormData) => Promise<P>;
  downloadFile: (url: string) => void;
}
