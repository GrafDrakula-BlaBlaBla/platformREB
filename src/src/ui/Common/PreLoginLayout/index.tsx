import React, {FC} from 'react';
import moment from 'moment';
import {useRouter} from 'react-router5';
import {ROUTER_CONST_PRE_LOGIN} from '../../app/settings/routerConst/RouterConstPreLogin';
import {ReactComponent as Logo} from '../../../assets/svg/header/logo.svg';
import './index.less';

interface IPreLoginLayoutProps {
  className?: string;
}

export const PreLoginLayout: FC<IPreLoginLayoutProps> = (props) => {
  const {className, children} = props;
  const router = useRouter();
  const cls = ['prelogin__layout'];
  if (className) cls.push(className);
  return (
    <div className={cls.join(' ')}>
      <div className="prelogin__header">
        <Logo
          className="prelogin__logo"
          onClick={() => {
            router.navigate(ROUTER_CONST_PRE_LOGIN.HOME.name);
          }}
        />
      </div>
      <div className="prelogin__content">{children}</div>
      <div className="prelogin__signature">
        1994–{moment().year()} АО РОСЭКСИМБАНК
      </div>
    </div>
  );
};
