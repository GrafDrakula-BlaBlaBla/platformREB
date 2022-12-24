import React from 'react';
import {TableWidget} from '../../../../../Common/TableComponents/Table/TableWidget';
import {config} from './config';

const data = [
  {
    name: 'Name1',
    some: 'Some1',
  },
  {
    name: 'Name2',
    some: 'Some2',
  },
];

export const TnTable = () => {
  return <TableWidget data={data} config={config} />;
};
