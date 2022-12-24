import {IAttachmentDTO} from '../../../Model/Attachment';
import {IAPIModule} from '../../../InfrastructureLayer/APIModule/interfaces';
import {IAttachmentAPIClient} from './interfaces';
import {INFRASTRUCTURE_MODULE} from '../../../InfrastructureLayer/identifiers';
import {inject, injectable} from 'inversify';

@injectable()
export class AttachmentAPIClient implements IAttachmentAPIClient {
  protected urlPrefix: string = 'attachments';
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  uploadAttachment(reqDTO: FormData): Promise<IAttachmentDTO> {
    return this.apiModule.postFormData(this.urlPrefix, reqDTO);
  }

  getMetaInformation(id: string): Promise<IAttachmentDTO> {
    return this.apiModule.getData(`${this.urlPrefix}/${id}/meta`);
  }

  deleteItem(id: string): Promise<void> {
    return this.apiModule.deleteData(`${this.urlPrefix}/${id}`);
  }

  downloadAttachment(id: string) {
    return this.apiModule.downloadFile(`${this.urlPrefix}/${id}`);
  }
}
