export interface IAccreditationDTO {
  id: string;
  status: EAccreditationStatuses;
  createdAt: string;
  updatedAt: string;
  bankId: string;
  bankName: string;
  bic: string;
  correspondentAcc: string;
  legalAddress: string;
  employeeName: string;
  employeePatronymic: string;
  employeeSurname: string;
  employeeEmail: string;
  employeePhone: string;
}

export enum EAccreditationStatuses {
  CREATED = 'CREATED',
  SENT = 'SENT',
  CONSIDERATION = 'CONSIDERATION',
  ON_REVISION = 'ON_REVISION',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  RESENT = 'RESENT',
  MEETING_CREATED = 'MEETING_CREATED',
  MEETING_ACCEPTED = 'MEETING_ACCEPTED',
  COMPLETED = 'COMPLETED',
}
export enum EAccreditationStatusNames {
  CREATED = 'Создано',
  SENT = 'Отправлено',
  CONSIDERATION = 'На рассмотрении',
  ON_REVISION = 'Возвращено на доработку',
  ACCEPTED = 'Принято',
  REJECTED = 'Отклонено',
  RESENT = 'Отправлено повторно',
  MEETING_CREATED = 'Согласование встречи',
  MEETING_ACCEPTED = 'Назначена встреча',
  COMPLETED = 'Аккредитация пройдена',
}

export enum EAccreditationAttachments {
  ACCREDITATION = 'ACCREDITATION',
  ACCREDITATION_MEETING = 'ACCREDITATION_MEETING',
}
