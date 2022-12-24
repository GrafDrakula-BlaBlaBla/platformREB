import React, {FC} from 'react';
import moment from 'moment';
import {useRouter} from 'react-router5';
import {Loader} from '../SimpleComponents/Loader';
import {ROUTER_CONST_PRE_LOGIN} from '../../app/settings/routerConst/RouterConstPreLogin';
import './index.less';

export interface IPageAuthLayout {
  loading?: boolean;
  className?: string;
}

export const PageAuthLayout: FC<IPageAuthLayout> = ({
  loading,
  className,
  children,
}) => {
  const router = useRouter();

  const cls = ['page-auth-layout'];
  if (className) cls.push(className);

  return (
    <div className={cls.join(' ')}>
      <div className="page-auth-layout__left">
        {loading ? <Loader /> : null}
        <div
          className="page-auth-layout__logo"
          onClick={() => {
            router.navigate(ROUTER_CONST_PRE_LOGIN.HOME.name);
          }}
        />
        <div className="page-auth-layout__content">{children}</div>
        <div className="page-auth-layout__footer">
          1994–{moment().year()} АО РОСЭКСИМБАНК
        </div>
      </div>
      <div className="page-auth-layout__right" />
    </div>
  );
};

export * from './PageAuthLicence';
export * from './PageAuthSubmit';
