import {makeAutoObservable} from 'mobx';
import {IAttachmentViewModel} from './interfaces';
import {IAttachmentView} from '../../../Model/Attachment';
import {IAttachmentService} from '../../../BusinessLayer/services/Attachment/interfaces';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../BusinessLayer/identifiers';

@injectable()
export class AttachmentViewModel implements IAttachmentViewModel {
  @inject(SERVICE.Attachment) private service!: IAttachmentService;

  constructor() {
    makeAutoObservable(this);
  }
  loading = false;
  attachments: Array<IAttachmentView> = [];

  setLoading = () => (this.loading = true);
  unsetLoading = () => (this.loading = false);

  removeDocument = async (id: string) => {
    return this.service.deleteAttachment(id).then(() => {
      this.attachments = this.attachments.filter((item) => item.id !== id);
    });
  };

  uploadDocument = async (files: Array<File>) => {
    const file = files[0];
    if (!file) {
      return;
    }

    this.setLoading();
    const newAttachment = await this.service.uploadAttachment(file);
    this.attachments = [...this.attachments, newAttachment];
    this.unsetLoading();
    return newAttachment as IAttachmentView;
  };

  get attachmentsIds() {
    return this.attachments.map((item) => item?.id);
  }

  initModel = async (attachmentsIds: Array<string>) => {
    this.setLoading();

    const promise = attachmentsIds.map((id) => {
      return this.service.getMetaInformationById(id);
    });

    this.attachments = await Promise.all(promise);
    this.unsetLoading();
  };

  downloadAttachment = (id: string) => this.service.downloadAttachment(id);
}
