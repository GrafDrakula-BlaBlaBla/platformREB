import 'reflect-metadata';
import {interfaces} from 'inversify';
import {createDIContainer} from '../Bootstrap/createDIContainer';
import {configureDIContainer} from '../Bootstrap/createDIContainer';
import {infrastructureModuleContainer} from '../InfrastructureLayer/containers/infrastructureModuleContainer';
import {errorModuleContainer} from '../ErrorsLayer/containers/errorModuleContainer';
import {ACCOUNT} from '../Bootstrap';
import {getApiClientContainer} from '../IntegrationLayer';
import {getServiceContainer} from '../BusinessLayer';
import {getViewModelContainer} from '../ViewModel';
import memoize from '../Utils/Function/memoize';

const getTestDIContainer = async (
  account: ACCOUNT
): Promise<interfaces.Container> => {
  let DIContainer = createDIContainer(
    infrastructureModuleContainer,
    errorModuleContainer
  );

  const TestDIContainer = await configureDIContainer(
    DIContainer,
    getApiClientContainer(account),
    getServiceContainer(account),
    getViewModelContainer(account)
  );
  return TestDIContainer;
};

export const createTestDIContainer = memoize(getTestDIContainer);
