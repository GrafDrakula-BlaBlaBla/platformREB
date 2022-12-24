import {IBankAgreementDTO, IBankProductDTO, ICFA_BankDTO} from './index';

export const CFA_BanksMock: Array<ICFA_BankDTO> = [
  {
    bankName: 'ПАО «Сбербанк»',
    bankId: '1',
    amountDeals: 120,
    amountReport: 12,
    plannedSumDeals: 680000000,
    factSumDeals: 650000000,
  },
  {
    bankName: 'ВЭБ.РФ',
    bankId: '2',
    amountDeals: 10,
    amountReport: 6,
    plannedSumDeals: 190000000,
    factSumDeals: 190000000,
  },
  {
    bankName: 'Совкомбанк',
    bankId: '3',
    amountDeals: 5,
    amountReport: 7,
    plannedSumDeals: 95000000,
    factSumDeals: 60000000,
  },
  {
    bankName: 'ПАО «Сбербанк»',
    bankId: '1',
    amountDeals: 120,
    amountReport: 12,
    plannedSumDeals: 680000000,
    factSumDeals: 650000000,
  },
  {
    bankName: 'ВЭБ.РФ',
    bankId: '2',
    amountDeals: 10,
    amountReport: 6,
    plannedSumDeals: 190000000,
    factSumDeals: 190000000,
  },
  {
    bankName: 'Совкомбанк',
    bankId: '3',
    amountDeals: 5,
    amountReport: 7,
    plannedSumDeals: 95000000,
    factSumDeals: 60000000,
  },
  {
    bankName: 'ПАО «Сбербанк»',
    bankId: '1',
    amountDeals: 120,
    amountReport: 12,
    plannedSumDeals: 680000000,
    factSumDeals: 650000000,
  },
  {
    bankName: 'ВЭБ.РФ',
    bankId: '2',
    amountDeals: 10,
    amountReport: 6,
    plannedSumDeals: 190000000,
    factSumDeals: 190000000,
  },
  {
    bankName: 'Совкомбанк',
    bankId: '3',
    amountDeals: 5,
    amountReport: 7,
    plannedSumDeals: 95000000,
    factSumDeals: 60000000,
  },
];

export const BANK_PRODUCTS: IBankProductDTO[] = [
  {
    type: 'ACCREDITIVE',
    title: 'Кредит под резервный аккредитив',
    isActivated: true,
  },
  {
    type: 'FOUNDATION',
    title: 'Фондирование',
    isActivated: false,
  },
];

export const BANK_AGREEMENTS_EMPTY: IBankAgreementDTO[] = [
  {
    docType: 'Соглашение с РЭБ',
  },
  {
    docType: 'Соглашение с ПАО «Сбербанк»',
  },
];
export const BANK_AGREEMENTS: IBankAgreementDTO[] = [
  {
    docType: 'Соглашение с РЭБ',
    docTitle: 'Договор №132/2 НДА',
    docSize: 2000,
    objectId: '111',
  },
  {
    docType: 'Соглашение с ПАО «Сбербанк»',
    docTitle: 'Договор №132/2 НДА',
    docSize: 4000,
    objectId: '222',
  },
];
