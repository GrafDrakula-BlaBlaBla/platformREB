export interface IDiscussionMessageDTO {
  createdAt: string;
  isRead: boolean;
  objectId: string;
  recipientBankId: string;
  senderUser: ISenderUser;
  text: string;
  threadId: string;
  threadType: EThreadMessageType;
  FIO: string;
  time: string;
  isSelf: boolean;
  senderBankName: string;
}

export interface ISenderUser {
  bankInfoId: string;
  email: string;
  id: string;
  isActive: boolean;
  isReb: boolean;
  keycloakId: string;
  name: string;
  patronymic: string;
  phoneNumber: string;
  role: string;
  surname: string;
}

export type TDiscussionPostParams = Pick<
  IDiscussionMessageDTO,
  'recipientBankId' | 'text' | 'threadId' | 'threadType'
>;

export enum EThreadMessageType {
  ACCREDITATION = 'ACCREDITATION',
  CREDIT_FOR_ACCREDITIVE = 'CREDIT_FOR_ACCREDITIVE',
}
