import React from 'react';
import useRouterConst from '../../../hooks/useRouterConst';
import {useRoute} from 'react-router5';
import {PageError} from '../PageError';

export const Page404 = () => {
  const ROUTER_CONST = useRouterConst();
  const {router} = useRoute();
  return (
    <PageError
      className="page-404"
      errorCode="404"
      errorTitle="Страница не найдена"
      errorBtn={{
        children: 'На главную',
        onClick: () => router.navigate(ROUTER_CONST.HOME.fullName),
      }}
    />
  );
};
