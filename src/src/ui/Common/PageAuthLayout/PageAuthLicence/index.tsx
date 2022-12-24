import React from 'react';
import './index.less';

export interface IPageAuthLicenceProps {
  label: string;
}

export const PageAuthLicence = (props: IPageAuthLicenceProps) => {
  const {label} = props;
  return (
    <div className="page-auth-licence">
      <span>Нажимая кнопку «{label}», вы соглашаетесь с </span>
      <a
        href="/pdf/privacy_policy.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Политикой обработки персональных данных.
      </a>
    </div>
  );
};
