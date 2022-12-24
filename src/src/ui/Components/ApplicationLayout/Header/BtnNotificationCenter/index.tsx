import React from 'react';
import {useRoute} from 'react-router5';
import useRouterConst from '../../../../hooks/useRouterConst';
import {ReactComponent as NotificationCenterIcon} from '../../../../../assets/svg/header/NotificationCenter.svg';
import {IHeaderBtnProps} from '../index';

export const BtnNotificationCenter = (props: IHeaderBtnProps) => {
  const {onClick} = props;
  const routerConst = useRouterConst();
  const {router, route} = useRoute();

  return (
    <NotificationCenterIcon
      className={
        route.name === routerConst.NOTIFICATION_CENTER.fullName ? 'active' : ''
      }
      onClick={() => {
        if (onClick) onClick();
        router.navigate(routerConst.NOTIFICATION_CENTER.fullName);
      }}
    />
  );
};
