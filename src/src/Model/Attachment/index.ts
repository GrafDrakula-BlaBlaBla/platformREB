export interface IAttachmentDTO {
  id: string;
  userId: string;
  attachmentName: string;
  attachmentDate: string;
  attachmentSize: number;
  attachmentSizeString: string;
  status: EAttachmentStatus;
  disabled: boolean;
  canDelete: boolean;
}

export interface IAttachmentSingleDTO
  extends Pick<IAttachmentDTO, 'id' | 'attachmentName' | 'attachmentSize'> {}

export interface IAttachmentView {
  attachmentName: string;
  attachmentDate: string;
  attachmentSize: number;
  attachmentSizeString: string;
  id: string;
}

export enum EAttachmentStatus {
  GET = 'GET',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
