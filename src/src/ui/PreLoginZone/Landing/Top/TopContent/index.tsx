import React from 'react';
import {useRouter} from 'react-router5';
import {ReactComponent as LogoBigIcon} from '../../../../../assets/landing/svg/logo-big.svg';
import {ROUTER_CONST_PRE_LOGIN} from '../../../../app/settings/routerConst/RouterConstPreLogin';
import './index.less';

export const TopContent = () => {
  const router = useRouter();
  const onClick = () => {
    router.navigate(ROUTER_CONST_PRE_LOGIN.BIC.name);
  };
  return (
    <div className="top-content">
      <div className="top-content__left">
        <div className="top-content__name">
          Цифровая платформа АО&nbsp;Росэксимбанка
        </div>
        <div className="top-content__title">
          Кредитные продукты для банков, участвующих в финансировании экспортной
          деятельности
        </div>
        <div className="top-content__button" onClick={onClick}>
          Начать работу
        </div>
      </div>
      <div className="top-content__right">
        <LogoBigIcon />
      </div>
    </div>
  );
};
