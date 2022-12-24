import ky from 'ky/umd';
import {HttpMethod, IAPIModule} from './interfaces';
import {Options} from 'ky';
import {Params} from 'router5/dist/types/base';
import {getResponseStatusCodeMessage} from '../../ErrorsLayer/mapErrorsDescription';
import {IErrorsModule} from '../../ErrorsLayer/ErrorsModule/interfaces';
import {API_FROM_IAM, LOCAL_API} from '../const';
import {inject, injectable} from 'inversify';
import {ERROR_MODULE} from '../../ErrorsLayer/containers/errorModuleContainer';
import mockSession from '../../Model/Session/mock';

/**
 * Базовый модуль для работы с REST-api.
 */

export const PREFIX_URL =
  process.env.NODE_ENV === 'development' ? LOCAL_API : API_FROM_IAM;
@injectable()
export class APIModule implements IAPIModule {
  @inject(ERROR_MODULE) protected errorContainer!: IErrorsModule;

  private readonly api: typeof ky;
  protected prefixUrl: string = PREFIX_URL;

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      this.api = ky.create({
        prefixUrl: this.prefixUrl,
        throwHttpErrors: false,
        credentials: 'same-origin',
        headers: {
          'authorize-bank-id': mockSession?.bank.objectId || '',
        },
      });
    } else {
      this.api = ky.create({
        prefixUrl: this.prefixUrl,
        throwHttpErrors: false,
        credentials: 'same-origin',
      });
    }
  }

  private async fetchData<P>(url: string, options: Options): Promise<P> {
    const response = await this.api(url, options);

    if (!response || (!response.ok && response.status >= 400)) {
      // if (response && response.text) {
      //   const text = await response?.text?.();
      //   this.errorContainer.setError(text);
      //   throw text;
      // } else {
      //   const text = response?.status
      //     ? getResponseStatusCodeMessage(response?.status)
      //     : `Что-то пошло не так`;
      //   this.errorContainer.setError(text);
      //   throw text;
      // }

      const description = response?.status
        ? getResponseStatusCodeMessage(response?.status)
        : `Что-то пошло не так`;
      this.errorContainer.setError(description);

      // @todo: Сюда нужно приклеить логирование ошибок запросов.
      if (response && response.json) {
        throw await response?.json?.();
      }

      // @ts-ignore
      return;
    }

    if (options.method === HttpMethod.DELETE) {
      // @ts-ignore
      return;
    }

    // todo: Валидация DTO
    let resp;
    try {
      resp = await response?.json();
    } catch (err) {
      console.error(err);
    }
    return resp;
  }

  async getData<P, R>(url: string, queryDTO?: R): Promise<P> {
    return await this.fetchData<P>(url, {
      method: HttpMethod.GET,
      searchParams: queryDTO as any,
    });
  }

  async putData<P>(url: string, reqDTO?: P, queryDTO?: Params): Promise<P> {
    return await this.fetchData<P>(url, {
      method: HttpMethod.PUT,
      json: reqDTO,
      searchParams: queryDTO,
    });
  }

  async postData<P, T = void>(
    url: string,
    reqDTO?: T extends void ? P : T,
    queryDTO?: Params
  ): Promise<P> {
    return await this.fetchData<P>(url, {
      method: HttpMethod.POST,
      json: reqDTO,
      searchParams: queryDTO,
    });
  }

  async deleteData(url: string, queryDTO?: Params): Promise<void> {
    return await this.fetchData<void>(url, {
      method: HttpMethod.DELETE,
      searchParams: queryDTO,
    });
  }

  async postFormData<P>(url: string, formData: FormData): Promise<P> {
    return await this.fetchData<P>(url, {
      method: HttpMethod.POST,
      body: formData,
    });
  }

  downloadFile(url: string): void {
    window.open(`${this.prefixUrl}/${url}`);
  }
}
