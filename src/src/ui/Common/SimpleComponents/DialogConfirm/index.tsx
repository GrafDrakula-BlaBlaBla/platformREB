import React, {FC} from 'react';
import {Dialog} from '@material-ui/core';
import {Button, IButtonProps} from '../Button';
import {CloseIcon} from '../../Icons/CloseIcon';
import {ClassNameInjection} from '../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

interface IDialogConfirmProps {
  open: boolean;
  text: string;
  cancel: IButtonProps;
  confirm: IButtonProps;
  className?: string;
  onClose: () => void;
}

export const DialogConfirm: FC<IDialogConfirmProps> = (props) => {
  const {open, text, cancel, confirm, className, onClose} = props;
  return (
    <Dialog
      open={open}
      className={ClassNameInjection('dialog-confirm', className)}
    >
      <div>
        <CloseIcon onClick={onClose} className="dialog-confirm__close" />
      </div>
      <div className="dialog-confirm__text">{text}</div>
      <div className="dialog-confirm__button-group">
        <Button
          {...cancel}
          onClick={(e) => {
            onClose();
            if (cancel.onClick) cancel.onClick(e);
          }}
        />
        <Button
          {...confirm}
          onClick={(e) => {
            onClose();
            if (confirm.onClick) confirm.onClick(e);
          }}
        />
      </div>
    </Dialog>
  );
};
