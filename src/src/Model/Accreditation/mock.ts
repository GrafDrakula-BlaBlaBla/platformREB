import {EAccreditationStatuses, IAccreditationDTO} from './index';
import {Params} from 'router5/dist/types/base';
import {isAfter, isBefore, parse} from 'date-fns';
import {session_kb_mock} from '../Session/mock';

export const ACCREDITATION_MOCK: IAccreditationDTO = {
  id: '1',
  status: EAccreditationStatuses.CREATED,
  createdAt: '05.08.2020',
  updatedAt: '05.09.2020',
  bankId: session_kb_mock.bank.objectId,
  bankName: session_kb_mock.bank.bankName,
  bic: session_kb_mock.bank.bic,
  correspondentAcc: session_kb_mock.bank.correspondentAcc,
  legalAddress: session_kb_mock.bank.legalAddress,
  employeeName: session_kb_mock.user.name,
  employeePatronymic: session_kb_mock.user.patronymic || '',
  employeeSurname: session_kb_mock.user.surname,
  employeeEmail: session_kb_mock.user.email,
  employeePhone: session_kb_mock.user.phoneNumber || '',
};

export const ACCREDITATION_LIST_MOCK: IAccreditationDTO[] = [
  ACCREDITATION_MOCK,
];
export const ACCREDITATION_LIST_MOCK_FILTER = (
  items: IAccreditationDTO[],
  params?: Params
) => {
  return items.filter((item) => {
    let filtered = true;
    if (params?.status) {
      filtered = filtered && item.status === params?.status;
    }
    if (params?.startDate) {
      const createdAt = parse(item.createdAt, 'dd.MM.yyyy', new Date());
      const startDate = parse(params.startDate, 'dd.MM.yyyy', new Date());
      filtered = filtered && isBefore(startDate, createdAt);
    }
    if (params?.endDate) {
      const createdAt = parse(item.createdAt, 'dd.MM.yyyy', new Date());
      const endDate = parse(params.endDate, 'dd.MM.yyyy', new Date());
      filtered = filtered && isAfter(endDate, createdAt);
    }
    return filtered;
  });
};
