import {ISessionDTO} from './index';
import {EBankInteractionTypes} from '../Banks';
import {CBRoles, REBRoles} from '../User';

export const isHideNotifications = true;
const isAuth = true;
const isReb = false;
const isManual = true;
export const ADMIN_ROLE = isReb
  ? REBRoles.ROLE_REB_ADMIN
  : CBRoles.ROLE_CB_ADMIN;

const getSessionInformationMock = () => {
  return isAuth ? (isReb ? session_reb_mock : session_kb_mock) : undefined;
};

export const session_kb_mock: ISessionDTO = {
  bank: {
    bankName: 'Публичное акционерное общество «Сбербанк России»',
    bic: '0144525225',
    correspondentAcc: '30101810400000000225',
    legalAddress: 'Россия, Москва, 117997, ул. Вавилова, д. 19',
    objectId: '7075213694393450502',
    status: 'APPROVED',
    settings: {
      interactionType: isManual
        ? EBankInteractionTypes.MANUAL
        : EBankInteractionTypes.API,
    },
  },
  user: {
    bankInfoId: '7075213694393450502',
    email: 'kbadmin@sberbank.ru',
    id: '7085213702983385073',
    isActive: true,
    isReb: false,
    name: 'kbadmin',
    patronymic: 'kbadmin',
    phoneNumber: '79266666666',
    surname: 'kbadmin',
    // role: CBRoles.ROLE_CB_CONTROLLER,
    role: CBRoles.ROLE_CB_ANALYST,
  },
  permissions: {
    // users: ['POST', 'PUT', 'bank'],
    // 'users/{userId}': ['DELETE', 'GET'],
    'credit-for-accreditive/report': ['**'],
    // 'credit-for-accreditive/commercial': ['**'],
    // 'credit-for-accreditive/draft': ['DELETE'],
    // 'credit-for-accreditive/draft/from-deal': ['POST'],
    // 'credit-for-accreditive/attach-users': ['**'],
    'main-menu': [
      'home',
      // 'accreditation',
      // 'users',
      'credit-for-accreditive',
      'credit-for-accreditive/draft',
      // 'credit-for-accreditive/report',
      // 'statistics',
      // 'bank-settings',
    ],
  },
};
export const session_reb_mock: ISessionDTO = {
  bank: {
    objectId: '7075301148164358145',
    bankName: 'АО РОСЭКСИМБАНК',
    legalAddress: 'г Москва, Краснопресненская наб, д 12',
    bic: '044525192',
    correspondentAcc: '30101810545250000192',
    status: 'APPROVED',
    settings: {
      interactionType: 'MANUAL',
    },
  },
  user: {
    bankInfoId: '7075301148164358145',
    email: 'reb_admin@sberbank.ru',
    id: '7076022129674223617',
    isActive: true,
    isReb: true,
    name: '',
    surname: 'reb_controller2',
    patronymic: '',
    phoneNumber: '79163819152',
    password: null,
    role: REBRoles.ROLE_REB_CONTROLLER,
  },
  permissions: {
    users: ['POST', 'PUT', 'bank'],
    'users/{userId}': ['DELETE', 'GET'],
    'credit-for-accreditive/reb': ['**'],
    'credit-for-accreditive/report': ['**'],
    'credit-for-accreditive/attach-users': ['**'],
    'main-menu': [
      'home',
      'users',
      'credit-for-accreditive',
      'credit-for-accreditive/report',
      'statistics',
    ],
  },
};

const mockSession = getSessionInformationMock();

export default mockSession;
