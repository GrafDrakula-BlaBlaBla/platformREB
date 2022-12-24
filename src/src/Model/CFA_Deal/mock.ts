import {
  ECFAGeneralAgreementStatus,
  ECFASourceType,
  ECFAStatuses,
  ICFABankUserDTO,
  ICFACreditContractDTO,
  ICFAExportContractDTO,
  ICFAGeneralAgreementDTO,
  ICFARequestDTO,
  IExportConfirmedDocument,
  ICFAItemDTO,
  ICFAExportContractPreliminaryDTO,
  ECFADealStep,
} from '.';
import {uuidv4} from '../../Utils/Uid';

export const CFA_BANK_USERS_MOCK: ICFABankUserDTO[] = [
  {
    id: '1',
    name: 'Василий',
    surname: 'Быстроногов',
    patronymic: 'Михайлович',
    totalDeals: 5,
  },
  {
    id: '2',
    name: 'Константин',
    surname: 'Петров',
    patronymic: 'Николаевич',
    totalDeals: 10,
  },
  {
    id: '3',
    name: 'Максим',
    surname: 'Волков',
    patronymic: 'Сергеевич',
    totalDeals: 3,
  },
  {
    id: '4',
    name: 'Сергей',
    surname: 'Ветров',
    patronymic: 'Михайлович',
    totalDeals: 6,
  },
  {
    id: '5',
    name: 'Игорь',
    surname: 'Максименко',
    patronymic: 'Михайлов',
    totalDeals: 1,
  },
];
export const CFA_ITEMS_MOCK: ICFAItemDTO[] = [
  {
    id: '1',
    requestId: '1-1DRGT8NP',
    borrowerId: '1',
    debtorID: '1',
    fullName: 'ООО «Доставка грузов»',
    inn: '7106041070',
    industry: 'industry',
    individualCategory: 'individualCategory',
    tb: 'Санкт-Петербург',
    status: 'status',
    statusCode: 'DOC',
    generalAgreementStatus: 'generalAgreementStatus',
    draftId: 'draftId',
    assignedEmployees: [
      CFA_BANK_USERS_MOCK[0],
      CFA_BANK_USERS_MOCK[3],
      CFA_BANK_USERS_MOCK[4],
      CFA_BANK_USERS_MOCK[5],
    ],
  },
  {
    id: '1',
    requestId: '1-8FGWRR34',
    borrowerId: '1',
    debtorID: '1',
    fullName: 'ООО «ПТКВ»',
    inn: '3420397556',
    industry: 'industry',
    individualCategory: 'individualCategory',
    tb: 'Москва',
    status: 'status',
    statusCode: 'DOC',
    generalAgreementStatus: 'generalAgreementStatus',
    draftId: 'draftId',
    assignedEmployees: [
      CFA_BANK_USERS_MOCK[4],
      CFA_BANK_USERS_MOCK[5],
      CFA_BANK_USERS_MOCK[0],
      CFA_BANK_USERS_MOCK[3],
    ],
  },
];
export const CFA_REQUEST_MOCK: ICFARequestDTO = {
  id: '1',
  bankInfoId: '1',
  requestId: '1',
  status: ECFAStatuses.NEW,
  fullName: 'fullName',
  inn: 'inn',
  industry: 'industry',
  individualCategory: 'individualCategory',
  tb: 'tb',
  generalAgreementStatus: ECFAGeneralAgreementStatus.OPEN,
  deliveryCountry: 'deliveryCountry',
  buyerCompanyName: 'buyerCompanyName',
  sourceType: ECFASourceType.API,
  createdAt: '17.01.2022',
  okved2: '17.01.2022',
  assignedEmployees: [CFA_BANK_USERS_MOCK[0], CFA_BANK_USERS_MOCK[3]],
  limitCreditAgreement: 1000000,
  revolving: true,
  currency: '643',
  loanRate: 10,
  loanCreditLine: '12',
  loanTranche: '16',
  financingType: 'Предэкспорт',
  limitGeneralAgreement: 1000000,
  loanPeriodGeneralAgreement: '12',
  commission: 13,
  dealStepStatus: ECFADealStep.CAN_SEND,
};
export const CFA_GENERAL_AGREEMENT_MOCK: ICFAGeneralAgreementDTO = {
  limit: 1000000,
  creditLineType: {
    revolving: true,
    fixed: false,
  },
  accreditiveNumber: '1111',
  unusedLimit: 0,
  balance: 0,
  sumPercent: 0,
  issued: [
    {
      id: '1',
      changedDate: '2022-01-16T15:40:49.200Z',
      amount: 120000,
    },
    {
      id: '2',
      changedDate: '2022-01-17T15:40:49.200Z',
      amount: 250000,
    },
  ],
  paidFor: [
    {
      id: '1',
      changedDate: '2022-01-17T15:40:49.200Z',
      amount: 10000,
    },
  ],
  agreementId: '2320003455',
  conclusionDt: '2021-11-30T10:23:29.655Z',
  endDate: '2022-02-28T15:40:49.200Z',
  loanPeriod: '',
  commission: 14,
  plannedSumServiceFee: 1000,
  plannedFeePaymentDate: '2022-01-17T15:40:49.200Z',
  factSumServiceFee: 1000,
  factFeePaymentDate: '2022-01-18T15:40:49.200Z',
  id: '123',
  tnCodes: ['7106041070', '7106041071'],
  tnSumm: 20000,
  cfaId: '1',
};
export const CFA_CREDIT_CONTRACT_MOCK: ICFACreditContractDTO = {
  limit: 1000000,
  creditLineType: {
    revolving: true,
    fixed: false,
  },
  issued: [
    {
      id: '1',
      amount: 120000,
      changedDate: '2022-01-16T15:40:49.200Z',
      maurityDate: '2022-01-16T15:40:49.200Z',
      tranchNumber: 1,
    },
    {
      id: '2',
      amount: 250000,
      changedDate: '2022-01-17T15:40:49.200Z',
      maurityDate: '2022-01-17T15:40:49.200Z',
      tranchNumber: 2,
    },
  ],
  unusedLimit: 0,
  balance: 0,
  paidFor: [
    {
      id: '1',
      changedDate: '2022-01-17T15:40:49.200Z',
      amount: 10000,
    },
  ],
  agreementId: '2320003455',
  conclusionDt: '2022-01-17T15:40:49.200Z',
  endDate: '2023-05-18T15:40:49.200Z',
  loanPeriod: '14 дней',
  tnCodes: ['123', '321'],
  individualCategory: 'Категория заемщика',
  inn: '7106041070',
  commission: 14,
  loanTranche: '10 месяцев',
  loanRate: 11,
  loanMPT: 12,
  sumPercent: 0,
  id: '123',
  cfaId: '1',
};

const EXPORT_CONFIRMED_DOCUMENT_MOCK: IExportConfirmedDocument = {
  numberOfExportContract: '2956/187F-92',
  dateOfExportContract: '22.10.2020',
  contractSumm: 20000000,
  currency: 'RUB',
  buyerCompanyName: 'Sinopec Corp., Китай',
  buyerCompanyCountry: 'Россия',
  deliveryCountry: 'Китай',
  documentsShipmentProducts:
    'Товарно-транспортная накладная, Декларация на товары, Счет-фактура',
  documentsInfo:
    'Товарно-транспортная накладная №AP 185709 от 24.06.2021, Декларация на товары №1650255833/1640139 от 21.06.2021, Счет-фактура №242 от 18.06.2021',
  tdocumentsInfo: 'Товарно-транспортная накладная №AP 185709 от 24.06.2021',
  tnCodes: '851660700, 850431290, 850400000',
  documentSumm:
    'Товарно-транспортная накладная №AP 185709 - 10000.0, Декларация на товары №1650255833/1640139 - 40000.0, Счет-фактура №242 - 400000.0',
  deliveredProducts: 10000000,
  deliveredProductsForPeriod: 7000000,
  paidProducts: 2000000,
  paidProductsForPeriod: 10000000,
};
export const EXPORT_CONTRACT_MOCK: ICFAExportContractDTO = {
  objectId: '7047416326720520194',
  title: 'Экспортный контракт №21020001/1481/1948/1/1 от 22.10.2020',
  exportConfirmedDocument: EXPORT_CONFIRMED_DOCUMENT_MOCK,
};
export const EXPORT_CONTRACT_PRELIMINARY: ICFAExportContractPreliminaryDTO = {
  currency: 'USD',
  contractNumber: '№ экспортного проекта/контракта',
  dateOfContract: '28.02.2020',
  sumContract: 4000000,
  sumHiTech: 20000,
  tnCode: [
    {
      code: '8467810000',
      id: '1',
    },
  ],
  productName: 'Наименование продукции',
  id: '1',
};

export const generateExportContractPreliminary = (
  data: Omit<ICFAExportContractPreliminaryDTO, 'id'>
): ICFAExportContractPreliminaryDTO => ({
  ...data,
  id: uuidv4(),
});
