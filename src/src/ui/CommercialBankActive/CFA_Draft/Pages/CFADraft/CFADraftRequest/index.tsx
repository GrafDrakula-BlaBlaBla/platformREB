import React from 'react';
import {observer} from 'mobx-react-lite';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {CFADraftRequestEditForm} from '../../../../../Components/Forms';
import useViewModel from '../../../../../hooks/useViewModel';
import {ICFADraftComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Draft/draft/interfaces';
import './index.less';

export const CFADraftRequest = observer(() => {
  const {isCreated} = useViewModel<ICFADraftComViewModel>(VIEW_MODEL.CFADraft);

  const methods = useForm<FieldValues>({
    defaultValues: {},
    mode: 'onChange',
  });

  return (
    <div className="cfa-draft-request">
      <FormProvider {...methods}>
        <CFADraftRequestEditForm isEdit={isCreated} />
      </FormProvider>
    </div>
  );
});
