import {EStatus} from '../../../../Model/Status';

export const statusSelectParams = {
  items: [
    {
      label: 'Все статусы',
      value: undefined,
    },
    {
      label: 'Подана заявка',
      value: EStatus.CREDIT_CREATED,
    },
    {
      label: 'Документы размещены',
      value: EStatus.CREDIT_DOCS_OK,
    },
    {
      label: 'Выход на КО',
      value: EStatus.CREDIT_ENTER_KO,
    },
    {
      label: 'Согласовано',
      value: EStatus.CREDIT_APPROVED,
    },
    {
      label: 'Не согласовано',
      value: EStatus.CREDIT_REJECTED,
    },
  ],
  label: 'Статус',
  name: 'status',
};
