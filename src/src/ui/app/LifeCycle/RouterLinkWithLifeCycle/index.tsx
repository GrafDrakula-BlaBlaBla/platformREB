import React, {FC, useEffect} from 'react';
import {useRoute} from 'react-router5';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IPageLifeCycle} from '../PageLifeCycle';
import {IFilterViewModel} from '../../../../ViewModel/viewModels/Filter/interfaces';
import useViewModel from '../../../hooks/useViewModel';

export const RouterLinkWithLifeCycle: FC = ({children}) => {
  return (
    <>
      <FirstChildForLifeCycle />
      {children}
    </>
  );
};

const FirstChildForLifeCycle = () => {
  const {
    route: {params, name},
  } = useRoute();
  const {setFilters} = useViewModel<IFilterViewModel>(VIEW_MODEL.Filters);
  const {mountPage, unmountPage} = useViewModel<IPageLifeCycle>(
    VIEW_MODEL.PageLifeCycle
  );

  useEffect(() => {
    //монтирование компонента страницы
    mountPage(() => {
      setFilters(params, name);
    });
    return () => {
      //размонтирование компонента страницы
      unmountPage();
    };
    // eslint-disable-next-line
  });

  return <></>;
};
