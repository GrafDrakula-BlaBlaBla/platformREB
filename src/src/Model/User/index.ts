export interface IUserDTO {
  id: string;
  bankInfoId?: string;
  isActive: boolean;
  isReb?: boolean;
  email: string;
  phoneNumber: string | null;
  name: string;
  surname: string;
  patronymic?: string | null;
  password?: string | null;
  role?: string;
  roleTitle?: string;
  FIO?: string;
  tb?: string;
  tbId?: string | null;
}

export interface IUserConfirmInformation extends IUserDTO {
  passwordEqual: string;
}

export interface IUserRegDTO {
  bic: string;
  email: string;
  name: string;
  password: string;
  patronymic: string;
  phoneNumber: string;
  surname: string;
}

export interface IBankUserRoleDTO {
  id: string;
  key: string;
  title: string;
}

export const MUserStatusNames = new Map()
  .set(true, 'Активен')
  .set(false, 'Не активен');

export enum REBRoles {
  ROLE_REB_ADMIN = 'ROLE_REB_ADMIN',
  ROLE_REB_CONTROLLER = 'ROLE_REB_CONTROLLER',
  ROLE_REB_CURATOR = 'ROLE_REB_CURATOR',
  ROLE_REB_VIEWER = 'ROLE_REB_VIEWER',
}
export enum REBRolesNames {
  ROLE_REB_ADMIN = 'Администратор',
  ROLE_REB_CONTROLLER = 'Контролер',
  ROLE_REB_CURATOR = 'Куратор',
  ROLE_REB_VIEWER = 'Наблюдатель',

  // ROLE_REB_MANAGER = 'Менеджер РЭБ',
  // ROLE_REB_MANAGER_SIGN = 'Менеджер РЭБ с правом подписи',
}

export enum CBRoles {
  ROLE_CB_ADMIN_CANDIDATE = 'ROLE_CB_ADMIN_CANDIDATE',
  ROLE_CB_ADMIN = 'ROLE_CB_ADMIN',
  ROLE_CB_CONTROLLER = 'ROLE_CB_CONTROLLER',
  ROLE_CB_CURATOR = 'ROLE_CB_CURATOR',
  ROLE_CB_ANALYST = 'ROLE_CB_ANALYST',
  ROLE_CB_CLIENT_MANAGER = 'ROLE_CB_CLIENT_MANAGER',
  ROLE_CB_VIEWER = 'ROLE_CB_VIEWER',
}
export enum CBRolesNames {
  ROLE_CB_ADMIN_CANDIDATE = 'Кандидат в администраторы',
  ROLE_CB_ADMIN = 'Администратор',
  ROLE_CB_CONTROLLER = 'Контролер',
  ROLE_CB_CURATOR = 'Куратор',
  ROLE_CB_CLIENT_MANAGER = 'Клиентский менеджер',
  ROLE_CB_VIEWER = 'Наблюдатель',
  ROLE_CB_ANALYST = 'Аналитик КБ',
}
