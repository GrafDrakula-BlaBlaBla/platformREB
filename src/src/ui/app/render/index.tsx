import React from 'react';
import {interfaces} from 'inversify';
import {RouterProvider} from 'react-router5';
import {Router} from 'router5';
import DIContainerProvider from '../../providers/DIContainerProvider';
import PermissionContext, {PermissionCtx} from '../contexts/PremissionContext';
import {RoleContext} from '../contexts/RoleContext';

export const render = (
  container: interfaces.Container,
  router: Router,
  App: () => JSX.Element,
  permissionClass: PermissionCtx,
  roles: Record<string, string>
) => {
  return (
    <RouterProvider router={router}>
      <DIContainerProvider container={container}>
        <PermissionContext.Provider value={permissionClass}>
          <RoleContext.Provider value={roles}>
            <App />
          </RoleContext.Provider>
        </PermissionContext.Provider>
      </DIContainerProvider>
    </RouterProvider>
  );
};
