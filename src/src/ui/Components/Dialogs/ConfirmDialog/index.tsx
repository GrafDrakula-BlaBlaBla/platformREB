import React, {FC} from 'react';
import {Button, IButtonProps} from '../../../Common/SimpleComponents/Button';
import {ReactComponent as DangerIcon} from '../../../../assets/svg/commonArea/Danger.svg';
import {ModalPage} from '../../../Common/SimpleComponents/ModalPage';
import './index.less';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | JSX.Element;
  text?: string | JSX.Element;
  buttons?: IButtonProps[];
}

export const ConfirmDialog: FC<IProps> = ({
  isOpen,
  onClose,
  title,
  text,
  buttons,
}) => {
  return (
    <ModalPage className="confirm-dialog" isOpen={isOpen} onClose={onClose}>
      <DangerIcon className="confirm-dialog__icon" />
      <div className="confirm-dialog__title">{title}</div>
      {text && <div className="confirm-dialog__text">{text}</div>}
      {buttons ? (
        <div className="confirm-dialog__footer">
          {buttons.map((button, index) => (
            <Button
              key={index}
              {...button}
              onClick={(event) => {
                if (button.onClick) button.onClick(event);
                onClose();
              }}
            />
          ))}
        </div>
      ) : null}
    </ModalPage>
  );
};
