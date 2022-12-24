import {IAccreditationREBService} from '../interfaces';
import {IAccreditationREBAPIClient} from '../../../../IntegrationLayer/APIClients/Accreditation';
import {AccreditationService} from '../base';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';

@injectable()
export class AccreditationREBService
  extends AccreditationService
  implements IAccreditationREBService {
  @inject(API_CLIENT.Accreditation)
  protected APIClient!: IAccreditationREBAPIClient;

  accept = async (accreditationId: string): Promise<boolean> => {
    return this.APIClient.accept(accreditationId);
  };
  complete = async (accreditationId: string): Promise<boolean> => {
    return this.APIClient.complete(accreditationId);
  };
  consideration = async (accreditationId: string): Promise<boolean> => {
    return this.APIClient.consideration(accreditationId);
  };
  createMeeting = async (accreditationId: string): Promise<boolean> => {
    return this.APIClient.createMeeting(accreditationId);
  };
  reject = async (accreditationId: string): Promise<boolean> => {
    return this.APIClient.reject(accreditationId);
  };
  revision = async (accreditationId: string): Promise<boolean> => {
    return this.APIClient.revision(accreditationId);
  };
}
