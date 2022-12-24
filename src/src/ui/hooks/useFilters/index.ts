import useDiContainer from '../useDiContainer';
import {IFilterViewModel} from '../../../ViewModel/viewModels/Filter/interfaces';
import {VIEW_MODEL} from '../../../ViewModel/identifiers';

export const useFilters = () => {
  const container = useDiContainer();
  return container.get<IFilterViewModel>(VIEW_MODEL.Filters);
};
