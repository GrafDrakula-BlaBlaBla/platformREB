import {BaseListService} from '../../BaseList';
import {EAttachmentStatus, IAttachmentDTO} from '../../../../Model/Attachment';
import {IAccreditationService} from '../interfaces';
import {IAccreditationAPIClient} from '../../../../IntegrationLayer/APIClients/Accreditation';
import {IAccreditationDTO} from '../../../../Model/Accreditation';
import fileSize from 'filesize';
import {injectable} from 'inversify';

@injectable()
export class AccreditationService
  extends BaseListService<IAccreditationDTO, IAccreditationAPIClient>
  implements IAccreditationService {
  protected APIClient!: IAccreditationAPIClient;

  getItem = async (accreditationId: string): Promise<IAccreditationDTO> => {
    return await this.APIClient.getItem(accreditationId);
  };
  findAttachMeta = async (
    accreditationId: string,
    fileType: string
  ): Promise<IAttachmentDTO[]> => {
    const params = {
      bankAccreditationId: accreditationId,
      fileType: fileType,
    };
    const res = await this.APIClient.findAttachMeta(params);
    return res.map(this.attachmentDtoFind);
  };
  upload = async (
    accreditationId: string,
    fileType: string,
    files: File[]
  ): Promise<IAttachmentDTO[]> => {
    const formData = this.toFormData(accreditationId, fileType, files);
    const res = await this.APIClient.upload(formData);
    return res.map(this.attachmentDtoUpload);
  };

  attachmentDtoFind = (file: IAttachmentDTO) => {
    return this.attachmentDtoExtend({
      ...file,
      status: EAttachmentStatus.GET,
      disabled: false,
    } as IAttachmentDTO);
  };
  attachmentDtoUpload = (file: IAttachmentDTO) => {
    //@todo: доделать когда с бэка будет приходить результат загрузки документа
    const status =
      Math.random() < 0.5 ? EAttachmentStatus.SUCCESS : EAttachmentStatus.ERROR;
    return this.attachmentDtoExtend({
      ...file,
      status: status,
      disabled: status === EAttachmentStatus.ERROR,
    } as IAttachmentDTO);
  };
  attachmentDtoExtend = (file: IAttachmentDTO) => {
    const regexp = /(?:\.([^.]+))?$/;
    const fileExt = regexp.exec(file.attachmentName);
    return {
      ...file,
      attachmentSizeString: fileSize(file.attachmentSize),
      attachmentExtension: fileExt ? fileExt[1].toLocaleUpperCase() : '',
    } as IAttachmentDTO;
  };

  toFormData = (accreditationId: string, fileType: string, files: File[]) => {
    const formData = new FormData();
    formData.append('bankAccreditationId', accreditationId);
    formData.append('fileType', fileType);
    files.forEach((file) => formData.append('files', file));
    return formData;
  };
}
