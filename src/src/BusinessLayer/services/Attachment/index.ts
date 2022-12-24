import {IAttachmentDTO, IAttachmentView} from '../../../Model/Attachment';
import {IAttachmentAPIClient} from '../../../IntegrationLayer/APIClients/Attachment/interfaces';
import {IAttachmentService} from './interfaces';
import {getDateWithFrontEndFormat} from '../../../Utils/Date/DateFormat';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../IntegrationLayer/identifiers';

@injectable()
export class AttachmentService implements IAttachmentService {
  @inject(API_CLIENT.Attachment) private APIClient!: IAttachmentAPIClient;

  getMetaInformationById = async (id: string): Promise<IAttachmentView> => {
    const res = await this.APIClient.getMetaInformation(id);
    return mapperDTOtoView(res);
  };

  deleteAttachment = async (id: string): Promise<void> => {
    return await this.APIClient.deleteItem(id);
  };

  uploadAttachment = async (file: File): Promise<IAttachmentView> => {
    const dto = await mapperFileToDTO(file);
    const res = await this.APIClient.uploadAttachment(dto);
    return mapperDTOtoView(res);
  };

  downloadAttachment = (id: string) => {
    return this.APIClient.downloadAttachment(id);
  };
}

function mapperDTOtoView(dto: IAttachmentDTO): IAttachmentView {
  return {
    ...dto,
    id: dto.id as string,
    attachmentDate: getDateWithFrontEndFormat(dto.attachmentDate) || '',
  };
}

const mapperFileToDTO = async (dto: File): Promise<FormData> => {
  const blob = await fileToBlob(dto);

  const formData = new FormData();
  formData.append('file', blob);

  return formData;
};

const fileToBlob = async (file: File): Promise<Blob> => {
  return new Blob([file]);
};
