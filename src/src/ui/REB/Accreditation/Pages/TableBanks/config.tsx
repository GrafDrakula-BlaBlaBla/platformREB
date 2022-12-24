import {ITableColumn} from '../../../../Common/TableComponents';
import {formatDateString} from '../../../../../Utils/Date/DateFormat';
import {IAccreditation_BankDTO} from '../../../../../Model/Banks';

export const BanksTableConfig: {
  [key in keyof IAccreditation_BankDTO]?: ITableColumn<IAccreditation_BankDTO>;
} = {
  bankName: {
    label: 'Наименование банка',
  },
  createdAt: {
    label: 'Дата поступления заявления',
    align: 'right',
    wrapper: (value) => formatDateString(value, 'DD.MM.YYYY'),
  },
  employeeName: {
    label: `Сотрудник`,
  },
};
