import React from 'react';
import {useRoute} from 'react-router5';
import {constants} from 'router5';
import {AlertNotification} from '../Components/AlertNotification';
import {Page404} from '../Components/PageErrors/Page404';
import useRouteSegment from '../hooks/useRouteSegment';

const PreLoginContainer = (
  getPageMapFromSegment: (segment: string, route: string) => JSX.Element | null
) => {
  const {route} = useRoute();
  const segment = useRouteSegment();

  if (segment === constants.UNKNOWN_ROUTE) {
    return <Page404 />;
  }
  const page = getPageMapFromSegment(segment, route.name);
  return (
    <React.Fragment>
      {page}
      <AlertNotification />
    </React.Fragment>
  );
};

export default PreLoginContainer;
