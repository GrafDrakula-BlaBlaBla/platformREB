import React from 'react';
import {useRoute} from 'react-router5';
import {Page404} from '../Components/PageErrors/Page404';
import useRouteSegment from '../hooks/useRouteSegment';
import {Application} from '../Components/ApplicationLayout/Application';
import {constants} from 'router5';
import {AlertNotification} from '../Components/AlertNotification';

/**
 * Основной контейнер приложения.
 */
const MainContainer = (
  getPageMapFromSegment: (segment: string, route: string) => JSX.Element | null
) => {
  const {route} = useRoute();
  const segment = useRouteSegment();

  if (segment === constants.UNKNOWN_ROUTE) {
    return <Page404 />;
  }

  const page = getPageMapFromSegment(segment, route.name);

  return <MainContainerApp page={page} />;
};

const MainContainerApp = ({page}: {page: JSX.Element | null}) => {
  return (
    <React.Fragment>
      <Application>{page}</Application>
      <AlertNotification />
    </React.Fragment>
  );
};

export default MainContainer;
