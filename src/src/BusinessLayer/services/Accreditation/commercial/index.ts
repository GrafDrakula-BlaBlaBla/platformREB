import {IAccreditationCommercialService} from '../interfaces';
import {AccreditationService} from '../base';
import {IAccreditationCommercialAPIClient} from '../../../../IntegrationLayer/APIClients/Accreditation';
import {IAccreditationDTO} from '../../../../Model/Accreditation';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';
import {inject, injectable} from 'inversify';

@injectable()
export class AccreditationCommercialService
  extends AccreditationService
  implements IAccreditationCommercialService {
  @inject(API_CLIENT.Accreditation)
  protected APIClient!: IAccreditationCommercialAPIClient;

  createItem = async (): Promise<IAccreditationDTO> => {
    return this.APIClient.createItem();
  };
  acceptMeeting = async (accreditationId: string): Promise<boolean> => {
    return this.APIClient.acceptMeeting(accreditationId);
  };
  send = async (accreditationId: string): Promise<boolean> => {
    return this.APIClient.send(accreditationId);
  };
}
