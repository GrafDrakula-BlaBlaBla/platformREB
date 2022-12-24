import React, {FC} from 'react';
import {ErrorBoundary} from '../../Components/ErrorBoundary';
import {useRoute} from 'react-router5';
import {Loader} from '../SimpleComponents/Loader';
import {PageLayoutHeaderButtons} from './PageLayoutHeaderButtons';
import {IButtonProps} from '../SimpleComponents/Button';
import {ReactComponent as ArrowBack} from '../../../assets/svg/commonArea/ArrowBack.svg';
import './index.less';

export type TPageLayoutType = 'default' | 'tabs' | 'table';

interface IPageLayoutProps {
  title?: string | JSX.Element;
  titleExtra?: string | JSX.Element;
  subtitle?: string | JSX.Element;
  loading?: boolean;
  buttonGroupConfig?: IButtonProps[];
  numberVisibleButton?: number;
  footer?: {
    titleText?: string | JSX.Element;
    buttonsGroup?: JSX.Element | null;
  };
  link?: {
    title: string;
    onClick: () => void;
  };
  subTitleElement?: React.ReactElement;
  className?: string;
  type?: TPageLayoutType;
  filtersComponent?: JSX.Element;
}

export const PageLayout: FC<IPageLayoutProps> = ({
  link,
  title,
  titleExtra,
  subtitle,
  loading,
  children,
  buttonGroupConfig = [],
  numberVisibleButton,
  footer,
  subTitleElement,
  className,
  type = 'default',
  filtersComponent,
}) => {
  const route = useRoute();
  const cls = ['page-layout__body', `page-layout__body_${type}`];

  if (className) cls.push(className);
  if (footer && !loading) cls.push('page-layout__body_no-bottom-radius');
  return (
    <div className="page-layout">
      {title || subtitle || buttonGroupConfig?.length > 0 ? (
        <div className="page-layout__header">
          <div className="page-layout__header-info">
            {link && (
              <div className="page-layout__header-back" onClick={link?.onClick}>
                <ArrowBack />
                <span className="page-layout__header-back__text">
                  {link?.title}
                </span>
              </div>
            )}
            {title && (
              <div className="page-layout__header-title">
                <div className="page-layout__header-title-main">{title}</div>
                {titleExtra && (
                  <div className="page-layout__header-title-extra">
                    {titleExtra}
                  </div>
                )}
              </div>
            )}
            {subtitle && (
              <div className="page-layout__header-subtitle">{subtitle}</div>
            )}
          </div>
          {filtersComponent && (
            <div className="page-layout__header-filters">
              {filtersComponent}
            </div>
          )}
          <PageLayoutHeaderButtons
            numberVisibleButton={numberVisibleButton}
            buttonsConfig={buttonGroupConfig}
          />
        </div>
      ) : null}
      {subTitleElement}
      <div className={cls.join(' ')}>
        <ErrorBoundary route={route}>
          {loading ? <Loader /> : children}
        </ErrorBoundary>
      </div>
      {footer && !loading && (
        <div className="page-layout__footer">
          <div className="page-layout__footer-text">{footer.titleText}</div>
          <div className="page-layout__footer-buttons">
            {footer.buttonsGroup}
          </div>
        </div>
      )}
    </div>
  );
};
