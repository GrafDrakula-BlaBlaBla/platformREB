import {ICurrencyDTO} from './index';
import {IBaseListDTO} from '../BaseList';

export const CURRENCY_MOCK: IBaseListDTO<ICurrencyDTO> = {
  items: [
    {
      id: '1',
      name: 'Afghani',
      codeDig: '971',
      codeLat: 'AFN',
      isClearing: false,
    },
    {
      id: '2',
      name: 'US Dollar',
      codeDig: '840',
      codeLat: 'USD',
      isClearing: true,
    },
    {
      id: '3',
      name: 'Euro',
      codeDig: '978',
      codeLat: 'EUR',
      isClearing: true,
    },
    {
      id: '4',
      name: 'Ruble',
      codeDig: '643',
      codeLat: 'RUB',
      isClearing: false,
    },
    {
      id: '5',
      name: 'Yuan Renminbi',
      codeDig: '156',
      codeLat: 'CNY',
      isClearing: false,
    },
    {
      id: '6',
      name: 'Yen',
      codeDig: '392',
      codeLat: 'JPY',
      isClearing: false,
    },
  ],
  total: 6,
};
