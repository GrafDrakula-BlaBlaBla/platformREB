import {Container} from 'inversify';
import {IAPIModule} from '../APIModule/interfaces';
import {APIModule} from '../APIModule';
import {INFRASTRUCTURE_MODULE} from '../identifiers';

export const infrastructureModuleContainer = new Container();

infrastructureModuleContainer
  .bind<IAPIModule>(INFRASTRUCTURE_MODULE.APIModule)
  .to(APIModule);
