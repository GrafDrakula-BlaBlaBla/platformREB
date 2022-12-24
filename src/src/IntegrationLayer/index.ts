import {Container, interfaces} from 'inversify';
import {ACCOUNT, ContainerFactory} from '../Bootstrap';
import {apiClientContainer} from './containers/apiClientContainer';

export const getApiClientContainer: ContainerFactory = async (
  account: ACCOUNT
): Promise<interfaces.Container> => {
  switch (account) {
    case 'commercial':
      const comApiClientContainer = await import(
        './containers/comApiClientContainer'
      ).then((mod) => {
        return mod.ComApiClientContainer;
      });
      return Container.merge(apiClientContainer, comApiClientContainer);
    case 'reb':
      const rebApiClientContainer = await import(
        './containers/rebApiClientContainer'
      ).then((mod) => {
        return mod.RebApiClientContainer;
      });
      return Container.merge(apiClientContainer, rebApiClientContainer);
    default:
      return apiClientContainer;
  }
};
