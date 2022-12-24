import React, {FC} from 'react';
import {Dialog} from '@material-ui/core';
import {Button, IButtonProps} from '../Button';
import {LoaderWithBackdrop} from '../LoaderWithBackdrop';
import {ClassNameInjection} from '../../../../Utils/ClassNames/ClassNameInjection';
import {ReactComponent as CloseIcon} from '../../../../assets/svg/commonArea/CloseIcon.svg';
import './index.less';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
  header?: {
    title: string;
    subTitle?: string;
  };
  footerButtonConfig?: IButtonProps[];
  loading?: boolean;
  className?: string;
  fullScreen?: boolean;
}

export const ModalPage: FC<IProps> = ({
  isOpen,
  onClose,
  header,
  footerButtonConfig,
  loading,
  className,
  fullScreen = false,
  children,
}) => {
  const cls = ['modal'];
  if (className) cls.push(className);
  return (
    <Dialog
      fullScreen={fullScreen}
      onEscapeKeyDown={onClose}
      open={isOpen}
      className={cls.join(' ')}
    >
      <div className="modal-page">
        <div
          className={ClassNameInjection(
            'modal-page-header',
            header ? 'modal-page-header_border' : ''
          )}
        >
          <div className="header-title">
            {header?.title ? (
              <div className="header-title-main">{header?.title}</div>
            ) : null}
            {header?.subTitle ? (
              <div className="header-title-sub">{header?.subTitle}</div>
            ) : null}
          </div>
          <CloseIcon onClick={onClose} className="close-icon-modal" />
        </div>
        <div className="modal-page-body">
          <LoaderWithBackdrop loading={loading} />
          {children}
        </div>
        {footerButtonConfig && (
          <div className="modal-page-footer">
            {footerButtonConfig.map((button, index) => (
              <Button key={index} {...button} />
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
};
