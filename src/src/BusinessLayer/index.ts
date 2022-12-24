import {Container} from 'inversify';
import {ACCOUNT, ContainerFactory} from '../Bootstrap';
import {servicesContainer} from './containers/servicesContainer';

export const getServiceContainer: ContainerFactory = async (
  account: ACCOUNT
) => {
  switch (account) {
    case 'commercial':
      const comServiceContainer = await import(
        './containers/comServiceContainer'
      ).then((mod) => {
        return mod.commercialServiceContainer;
      });
      return Container.merge(servicesContainer, comServiceContainer);
    case 'reb':
      const rebServiceContainer = await import(
        './containers/rebServiceContainer'
      ).then((mod) => {
        return mod.rebServiceContainer;
      });
      return Container.merge(servicesContainer, rebServiceContainer);
    default:
      return servicesContainer;
  }
};
