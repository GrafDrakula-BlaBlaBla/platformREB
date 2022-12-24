import {action, makeObservable, observable} from 'mobx';
import {IAccreditationService} from '../../../../BusinessLayer/services/Accreditation';
import {ListViewModel} from '../../List';
import {
  IAccreditationAttachmentsViewModel,
  IAccreditationViewModel,
} from '../interfaces';
import {AccreditationAttachmentsViewModel} from '../attachments';
import {
  EAccreditationAttachments,
  IAccreditationDTO,
} from '../../../../Model/Accreditation';
import {injectable, postConstruct} from 'inversify';

@injectable()
export class AccreditationViewModel
  extends ListViewModel<IAccreditationDTO, IAccreditationService>
  implements IAccreditationViewModel {
  protected service!: IAccreditationService;
  constructor() {
    super();
    makeObservable(this, {
      item: observable,
      setItem: action,
      getItem: action,
      getCurrentItem: action,
    });
  }

  @postConstruct()
  public postConstruct() {
    this.attachmentsDocs = new AccreditationAttachmentsViewModel(
      this.service,
      EAccreditationAttachments.ACCREDITATION
    );
    this.attachmentsMeeting = new AccreditationAttachmentsViewModel(
      this.service,
      EAccreditationAttachments.ACCREDITATION_MEETING
    );
  }

  item?: IAccreditationDTO;
  attachmentsDocs!: IAccreditationAttachmentsViewModel;
  attachmentsMeeting!: IAccreditationAttachmentsViewModel;

  setItem = (data?: IAccreditationDTO) => {
    this.item = data;
  };
  getItem = async (id: string) => {
    this.setLoading();
    try {
      const item = await this.service.getItem(id);
      this.setItem(item);
    } finally {
      this.unsetLoading();
    }
  };
  getCurrentItem = async () => {
    if (this.item) await this.getItem(this.item.id);
  };
  initAttachments = async (accreditationId: string) => {
    await this.attachmentsDocs.init(accreditationId);
    await this.attachmentsMeeting.init(accreditationId);
  };
}
