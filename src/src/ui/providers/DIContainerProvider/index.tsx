import React, {FC} from 'react';
import {interfaces} from 'inversify';

interface IProps {
  container: interfaces.Container;
}

export const DIContainerContext = React.createContext<interfaces.Container | null>(
  null
);

const DIContainerProvider: FC<IProps> = ({container, children}) => (
  <DIContainerContext.Provider value={container}>
    {children}
  </DIContainerContext.Provider>
);

export default DIContainerProvider;
