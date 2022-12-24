import React from 'react';
import {observer} from 'mobx-react-lite';
import {ModalPage} from '../../../../Common/SimpleComponents/ModalPage';
import {useFormContext} from 'react-hook-form';
import {ICFADraftDTO} from '../../../../../Model/CFA_Draft';
import {CFADraftCreateForm} from '../../../Forms/';
import {LoaderWithBackdrop} from '../../../../Common/SimpleComponents/LoaderWithBackdrop';
import './index.less';

interface IDialogCreateDraftProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: ICFADraftDTO) => void;
  loading?: boolean;
}

export const DialogCreateDraft = observer((props: IDialogCreateDraftProps) => {
  const {isOpen, onClose, onSuccess, loading} = props;
  const {handleSubmit} = useFormContext();

  return (
    <ModalPage
      className="dialog-create-draft"
      onClose={onClose}
      isOpen={isOpen}
      header={{title: 'Создание сделки'}}
      footerButtonConfig={[
        {
          children: 'OK',
          onClick: handleSubmit(onSuccess),
        },
      ]}
    >
      <LoaderWithBackdrop loading={loading} />
      <CFADraftCreateForm />
    </ModalPage>
  );
});
