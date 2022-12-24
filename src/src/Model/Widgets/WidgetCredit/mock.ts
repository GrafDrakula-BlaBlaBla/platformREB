import {IWidgetCreditInfoDTO} from './index';

const RANDOM_AMOUNT = () => {
  const max = 100000000;
  const min = 10000000;
  return String(Math.floor(Math.random() * (max - min + 1) + min));
};
export const WIDGET_CREDIT_MOCK: IWidgetCreditInfoDTO = {
  creditAgreement: {
    balance: RANDOM_AMOUNT(),
    issued: RANDOM_AMOUNT(),
    paidFor: RANDOM_AMOUNT(),
    unusedLimit: RANDOM_AMOUNT(),
    limitCreditAgreement: RANDOM_AMOUNT(),
  },
  generalAgreement: {
    balance: RANDOM_AMOUNT(),
    issued: RANDOM_AMOUNT(),
    paidFor: RANDOM_AMOUNT(),
    unusedLimit: RANDOM_AMOUNT(),
    limitGeneralAgreement: RANDOM_AMOUNT(),
  },
};
