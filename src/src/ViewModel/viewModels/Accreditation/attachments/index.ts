import {action, makeObservable, observable} from 'mobx';
import {IAccreditationService} from '../../../../BusinessLayer/services/Accreditation';
import {IAccreditationAttachmentsViewModel} from '../interfaces';
import {IAttachmentDTO} from '../../../../Model/Attachment';
import {BaseViewModel} from '../../Base';
import {injectable} from 'inversify';

@injectable()
export class AccreditationAttachmentsViewModel
  extends BaseViewModel
  implements IAccreditationAttachmentsViewModel {
  constructor(
    protected service: IAccreditationService,
    protected fileType: string
  ) {
    super();
    makeObservable(this, {
      id: observable,
      attachments: observable,

      setId: action,
      setAttachments: action,

      init: action,
      findAttachMeta: action,
      upload: action,
      download: action,
      remove: action,
    });
  }

  id?: string;
  attachments?: IAttachmentDTO[];

  setId = (id: string) => {
    this.id = id;
  };
  setAttachments = (data?: IAttachmentDTO[]) => {
    this.attachments = data;
  };

  init = async (id: string) => {
    this.setId(id);
    this.setAttachments();
    await this.findAttachMeta();
  };
  findAttachMeta = async () => {
    if (this.id) {
      this.setLoading();
      try {
        const attachments = await this.service.findAttachMeta(
          this.id,
          this.fileType
        );
        this.setAttachments(attachments);
      } finally {
        this.unsetLoading();
      }
    }
  };
  upload = async (files: File[]) => {
    if (this.id) {
      this.setLoading();
      try {
        const loaded = await this.service.upload(this.id, this.fileType, files);
        this.setAttachments(loaded.concat(this.attachments || []));
      } finally {
        this.unsetLoading();
      }
    }
  };

  download = async (ids: string[]) => {
    //@todo: нужен бэк
    console.log('download files', ids);
  };
  remove = async (id: string) => {
    //@todo: нужен бэк
    console.log('remove file', id);
  };
}
