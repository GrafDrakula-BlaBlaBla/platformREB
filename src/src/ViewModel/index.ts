import {Container} from 'inversify';
import {ACCOUNT, ContainerFactory} from '../Bootstrap';
import {viewModelContainer} from './containers/viewModelContainer';

export const getViewModelContainer: ContainerFactory = async (
  account: ACCOUNT
) => {
  switch (account) {
    case 'commercial':
      const comViewModelContainer = await import(
        './containers/commercialViewModelContainer'
      ).then((mod) => {
        return mod.commercialViewModelContainer;
      });
      return Container.merge(viewModelContainer, comViewModelContainer);
    case 'reb':
      const rebViewModelContainer = await import(
        './containers/rebViewModelContainer'
      ).then((mod) => {
        return mod.rebViewModelContainer;
      });
      return Container.merge(viewModelContainer, rebViewModelContainer);
    default:
      return viewModelContainer;
  }
};
