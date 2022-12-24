import React from 'react';
import {IUserDTO} from '../../../Model/User';
import {ITableColumn} from '../../Common/TableComponents';
import {PhoneFieldControlView} from '../../Common/FieldControls';
import {StatusWrapper} from './StatusWrapper';
import {RoleWrapper} from './RoleWrapper';

export const UsersTableConfig: {
  [key in keyof IUserDTO]?: ITableColumn<IUserDTO>;
} = {
  FIO: {
    label: 'ФИО',
    wrapper: (fio) => {
      return fio || <span className="color-gray">не указано</span>;
    },
  },
  email: {
    label: 'Почта',
  },
  phoneNumber: {
    label: 'Телефон',
    wrapper: (phoneNumber: string) => {
      return <PhoneFieldControlView value={phoneNumber} />;
    },
  },
  role: {
    label: 'Роль в системе',
    wrapper: (role) => {
      return <RoleWrapper role={role} />;
    },
  },
  tb: {
    label: 'ТБ',
    wrapper: (tb) => {
      return tb || <span className="color-gray">не указано</span>;
    },
  },
  isActive: {
    label: 'Статус',
    wrapper: (status) => {
      return <StatusWrapper status={status} />;
    },
  },
};
