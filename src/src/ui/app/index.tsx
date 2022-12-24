import React, {useEffect, useState} from 'react';
import {LoaderWithBackdrop} from '../Common/SimpleComponents/LoaderWithBackdrop';
import {PermissionCtx} from './contexts/PremissionContext';
import {init} from './init';
import {render} from './render';
import {Page500} from '../Components/PageErrors/Page500';

export const App = () => {
  const [app, setApp] = useState<JSX.Element>(
    <LoaderWithBackdrop loading={true} />
  );

  useEffect(() => {
    init()
      .then(({bootstrap, config}) => {
        const router = bootstrap.getRouter();
        const container = bootstrap.getDiContainer();
        const permissions = bootstrap.getPermissions();
        const permissionClass = new PermissionCtx(permissions);
        const roles = bootstrap.getRoles();
        const UI = config.getUI();
        router.start(() => {
          setApp(render(container, router, UI, permissionClass, roles));
        });
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('start app error: ', err);
        }
        setApp(<Page500 />);
      });
  }, []);

  return app;
};
