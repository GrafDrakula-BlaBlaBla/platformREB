import React from 'react';
import {useRoute} from 'react-router5';
import useRouterConst from '../../../../hooks/useRouterConst';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {IHeaderBtnProps} from '../index';
import {EUserAreaTabs} from '../../../../app/settings/routes/routesBase';

export const BtnUserArea = (props: IHeaderBtnProps) => {
  const {onClick} = props;
  const routerConst = useRouterConst();
  const {router, route} = useRoute();

  return (
    <PeopleAltIcon
      className={route.name === routerConst.USER_AREA.name ? 'active' : ''}
      onClick={() => {
        if (onClick) onClick();
        router.navigate(routerConst.USER_AREA.name, {
          tab: EUserAreaTabs.AboutBank,
        });
      }}
    />
  );
};
