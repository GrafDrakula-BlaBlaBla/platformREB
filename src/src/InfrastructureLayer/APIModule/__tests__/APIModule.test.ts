import 'reflect-metadata';
import {APIModule, PREFIX_URL} from '../index';
import {server} from '../../../testUtils/mocks/testServer';
import {rest} from 'msw';
import {ErrorsModule} from '../../../ErrorsLayer/ErrorsModule';
import {Container} from 'inversify';
import {IErrorsModule} from '../../../ErrorsLayer/ErrorsModule/interfaces';
import {IAPIModule} from '../interfaces';

const container = new Container();
const MODULE = {
  ERROR: Symbol.for('ErrorModuleContainer'),
  API: Symbol.for('APIModule'),
};

container.bind<IErrorsModule>(MODULE.ERROR).to(ErrorsModule);

container.bind<IAPIModule>(MODULE.API).to(APIModule);

const apiModule = container.get<IAPIModule>(MODULE.API);

describe('APIModule', () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  describe('getData', () => {
    it('Делаем простой запрос на сервер', async () => {
      server.use(
        rest.get(`${PREFIX_URL}/test`, (req, res, ctx) => {
          return res(
            ctx.json({
              body: {
                name: 'Test name',
              },
              success: true,
            })
          );
        })
      );

      const spyOnFetch = jest.spyOn(window, 'fetch');
      await apiModule.getData('test');

      expect(spyOnFetch).toHaveBeenCalled();

      const Request: Request = spyOnFetch.mock.calls[0][0] as Request;

      expect(Request.url).toStrictEqual(`${PREFIX_URL}/test`);
      expect(Request.method).toStrictEqual('GET');
    });

    it('Делаем запрос на сервер с телом запроса', async () => {
      server.use(
        rest.get(`${PREFIX_URL}/test`, (req, res, ctx) => {
          return res(
            ctx.json({
              body: {
                name: '',
              },
              success: true,
            })
          );
        })
      );
      const spyOnFetch = jest.spyOn(window, 'fetch');
      await apiModule.getData('test', {
        param: 'test',
        offset: 30,
        count: 10,
      });
      expect(spyOnFetch).toHaveBeenCalled();

      const Request: Request = spyOnFetch.mock.calls[1][0] as Request;

      expect(Request.url).toStrictEqual(
        `${PREFIX_URL}/test?param=test&offset=30&count=10`
      );
      expect(Request.method).toStrictEqual('GET');
    });
  });
  describe('POST', () => {
    it('Делаем POST запрос', async () => {
      server.use(
        rest.post(`${PREFIX_URL}/test`, (req, res, ctx) => {
          return res(
            ctx.json({
              body: {
                name: 'Test name',
              },
            })
          );
        })
      );

      const spyOnFetch = jest.spyOn(window, 'fetch');
      await apiModule.postData('test', {
        name: 'Test name',
      });

      expect(spyOnFetch).toHaveBeenCalled();

      const Request: any = spyOnFetch.mock.calls[2][0];

      expect(Request.url).toStrictEqual(`${PREFIX_URL}/test`);
      expect(Request.method).toStrictEqual('POST');
      expect(Request._bodyText).toStrictEqual('{"name":"Test name"}');
    });
  });
});
