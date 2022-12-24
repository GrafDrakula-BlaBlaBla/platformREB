import React, {FC} from 'react';
import {observer} from 'mobx-react-lite';
import {ModalPage} from '../../../../Common/SimpleComponents/ModalPage';
import {CFADraftConfirmParams} from '../../../Forms/CFA_Draft/CFADraftConfirmParams';
import {CFADraftConfirmDocuments} from '../../../Forms/CFA_Draft/CFADraftConfirmDocuments';
import {CFADraftConfirmExportContracts} from '../../../Forms/CFA_Draft/CFADraftConfirmExportContracts';
import {IButtonProps} from '../../../../Common/SimpleComponents/Button';
import useViewModel from '../../../../hooks/useViewModel';
import {ICFADraftComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/draft/interfaces';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {ICFADraftExportContractComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/exportContract/interfaces';
import {ICFADraftDocumentComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/document/interfaces';
import './index.less';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onExecute: () => void;
}

export const DialogCFADraftConfirm: FC<IProps> = observer(
  ({isOpen, onClose, onExecute}) => {
    const {isValid: isValidRequest} = useViewModel<ICFADraftComViewModel>(
      VIEW_MODEL.CFADraft
    );
    const {isValid: isValidDocuments} = useViewModel<
      ICFADraftDocumentComViewModel
    >(VIEW_MODEL.CFADraftDocument);
    const {isValid: isValidContracts} = useViewModel<
      ICFADraftExportContractComViewModel
    >(VIEW_MODEL.CFADraftExportContract);

    const isValidForm = isValidRequest && isValidDocuments && isValidContracts;
    const footerButtonConfig: IButtonProps[] = [
      {
        children: 'Отмена',
        variant: 'outlined',
        color: 'red',
        onClick: onClose,
      },
      {
        children: 'Подтвердить отправку',
        variant: 'contained',
        color: 'blue',
        onClick: onExecute,
        disabled: !isValidForm,
      },
    ];

    return (
      <ModalPage
        className="dialog-cfa-draft-confirm"
        header={{title: 'Подтвердите сделку'}}
        isOpen={isOpen}
        onClose={onClose}
        footerButtonConfig={footerButtonConfig}
      >
        <CFADraftConfirmParams />
        <CFADraftConfirmDocuments />
        <CFADraftConfirmExportContracts />
      </ModalPage>
    );
  }
);
