import {ITableColumn} from '../../../../../Common/TableComponents';

interface IDataMock {
  name: string;
  some: string;
}
export const config: {
  [key in keyof IDataMock]: ITableColumn<IDataMock>;
} = {
  name: {
    label: 'Name',
  },
  some: {
    label: 'Some',
  },
};
