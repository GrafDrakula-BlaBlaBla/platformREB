import {IUserDTO} from './index';
import {createNonBreakingSpace} from '../../Utils/String/createNonBreakingSpace';

const getFIO = (user?: IUserDTO): string => {
  if (user?.surname) {
    return `${user.surname} ${user.name ? `${user.name?.[0]}.` : ''} ${
      user.patronymic ? `${user.patronymic?.[0]}.` : ''
    }`;
  } else {
    return '';
  }
};

const getShortFIO = (
  surname?: string,
  name?: string,
  patronymic?: string
): string => {
  if (surname) {
    return `${surname}${createNonBreakingSpace()}${
      name ? `${name?.[0]}.` : ''
    }${createNonBreakingSpace()}${patronymic ? `${patronymic?.[0]}.` : ''}`;
  } else {
    return '';
  }
};

const getFullFIO = (
  surname?: string,
  name?: string,
  patronymic?: string
): string => {
  let result = '';
  if (surname) result += surname;
  if (name) result += result ? ` ${name}` : name;
  if (patronymic) result += result ? ` ${patronymic}` : patronymic;
  return result;
};

export {getFIO, getFullFIO, getShortFIO};
