import {interfaces} from 'inversify';

export const createDIContainer = (
  infrastructureModuleContainer: interfaces.Container,
  errorContainer: interfaces.Container
): interfaces.Container => {
  infrastructureModuleContainer.parent = errorContainer;
  return infrastructureModuleContainer;
};

export const configureDIContainer = async (
  integrationModuleAndErrorContainer: interfaces.Container,
  apiClientContainerPromise: Promise<interfaces.Container>,
  serviceContainerPromise: Promise<interfaces.Container>,
  viewModelContainerPromise: Promise<interfaces.Container>
): Promise<interfaces.Container> => {
  const apiClientContainer = await apiClientContainerPromise.then(
    (container) => container
  );
  const serviceContainer = await serviceContainerPromise.then(
    (container) => container
  );
  const viewModelContainer = await viewModelContainerPromise.then(
    (container) => container
  );
  apiClientContainer.parent = integrationModuleAndErrorContainer;
  serviceContainer.parent = apiClientContainer;
  viewModelContainer.parent = serviceContainer;
  return viewModelContainer;
};
