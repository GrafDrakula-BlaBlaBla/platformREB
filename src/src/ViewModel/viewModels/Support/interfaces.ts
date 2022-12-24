import {IBaseCardViewModel} from '../BaseCard/interfaces';
import {ISupportDTO} from '../../../Model/Support';

export interface ISupportViewModel extends IBaseCardViewModel<ISupportDTO> {
  attachmentIds: Array<string>;
  addAttachment: (id: string) => void;
  removeAttachment: (id: string) => void;
  unsetAttachments: () => void;
}
