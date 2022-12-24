import React, {FC} from 'react';
import {observer} from 'mobx-react-lite';
import {ModalPage} from '../../../../Common/SimpleComponents/ModalPage';
import {IButtonProps} from '../../../../Common/SimpleComponents/Button';
import {CFAConfirmParams} from '../../../Forms/CFA/CFAConfirmParams';
import {CFAConfirmDocuments} from '../../../Forms/CFA/CFAConfirmDocuments';
import {CFAConfirmExportContracts} from '../../../Forms/CFA/CFAConfirmExportContracts';
import {LoaderWithBackdrop} from '../../../../Common/SimpleComponents/LoaderWithBackdrop';
import './index.less';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttons: IButtonProps[];
  loading?: boolean;
}

export const DialogCFAConfirm: FC<IProps> = observer((props) => {
  const {isOpen, onClose, title, buttons, loading} = props;

  return (
    <ModalPage
      className="dialog-cfa-confirm"
      header={{title}}
      isOpen={isOpen}
      onClose={onClose}
      footerButtonConfig={buttons}
    >
      <CFAConfirmParams />
      <CFAConfirmDocuments />
      <CFAConfirmExportContracts />
      <LoaderWithBackdrop loading={loading} />
    </ModalPage>
  );
});
