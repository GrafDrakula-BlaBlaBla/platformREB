import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import useViewModel from '../../../../../hooks/useViewModel';
import PermissionContext from '../../../../../app/contexts/PremissionContext';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {ICFARequestRebViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/request';
import {AccreditiveContainer} from '../../../../../Components/CFA_Deal/Accreditive/AccreditiveContainer';
import {ParametersCard} from '../../../../../Components/CFA_Deal/Accreditive/ParametersCard';
import {
  CreditContractForm,
  creditContractFormDefaultValues,
  GeneralAgreementForm,
  generalAgreementFormDefaultValues,
} from '../../../../../Components/Forms';
import {useRoute} from 'react-router5';
import {ICFAAccreditiveRebViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/accreditive';
import {ICFACreditContractRebViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/creditContract';
import {ICFAGeneralAgreementRebViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/generalAgreement';

export const Accreditive = observer(() => {
  const {route} = useRoute();

  const {isValidForm, setFormData} = useViewModel<ICFAAccreditiveRebViewModel>(
    VIEW_MODEL.CFAAccreditive
  );
  const ccViewModel = useViewModel<ICFACreditContractRebViewModel>(
    VIEW_MODEL.CFACreditContract
  );
  const gaViewModel = useViewModel<ICFAGeneralAgreementRebViewModel>(
    VIEW_MODEL.CFAGeneralAgreement
  );

  const {isDone} = useViewModel<ICFARequestRebViewModel>(VIEW_MODEL.CFARequest);
  const {isAccess} = useContext(PermissionContext);
  const canCreateUrl = 'credit-for-accreditive/reb/creditagreement';
  const canCreate = isAccess(canCreateUrl, 'POST') && isDone;
  const canEditUrl = 'credit-for-accreditive/reb/creditagreement';
  const canEdit = isAccess(canEditUrl, 'PUT') && isDone;

  const gaMethods = useForm<FieldValues>({
    defaultValues: generalAgreementFormDefaultValues,
    mode: 'onChange',
  });
  const ccMethods = useForm<FieldValues>({
    defaultValues: creditContractFormDefaultValues,
    mode: 'onChange',
  });

  const onCreate = () => {
    gaViewModel.setIsEditCard(true);
    ccViewModel.setIsEditCard(true);
  };
  const onEdit = () => {
    gaViewModel.setIsEditCard(true);
    ccViewModel.setIsEditCard(true);
  };
  const onCancel = async () => {
    await ccViewModel.getCreditContract(route.params.id);
    ccMethods.reset();
    gaViewModel.setIsEditCard(false);
    ccViewModel.setIsEditCard(false);
  };
  const onSave = ccMethods.handleSubmit(async (data: any) => {
    if (isValidForm) {
      setFormData(data);
      await ccViewModel.saveData();
      await ccViewModel.getCreditContract(route.params.id);
      ccMethods.reset();
      gaViewModel.setIsEditCard(false);
      ccViewModel.setIsEditCard(false);
    }
  });

  useEffect(() => {
    return () => {
      gaViewModel.setIsEditCard(false);
      gaViewModel.setData();
      ccViewModel.setIsEditCard(false);
      ccViewModel.setData();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <AccreditiveContainer
      blocks={[
        {
          title: 'Кредитный договор',
          content: (
            <ParametersCard
              noDataMessage="Данные о кредитном договоре вносятся банком"
              loaded={ccViewModel.isLoaded}
              loading={ccViewModel.loading}
              isForm={
                !ccViewModel.isEmpty ||
                (ccViewModel.isEmpty && ccViewModel.isEditCard)
              }
              isEditCard={ccViewModel.isEditCard}
              formProvider={
                <FormProvider {...ccMethods}>
                  <CreditContractForm isEdit={ccViewModel.isEditCard} />
                </FormProvider>
              }
              canCreate={canCreate}
              canEdit={canEdit}
              onEdit={onEdit}
              onCreate={onCreate}
              onCancel={onCancel}
              onSave={onSave}
            />
          ),
        },
        {
          title: 'Генеральное соглашение',
          content: (
            <ParametersCard
              noDataMessage="Данные о генеральном соглашении вносятся банком"
              loaded={gaViewModel.isLoaded}
              loading={gaViewModel.loading}
              isForm={!gaViewModel.isEmpty}
              formProvider={
                <FormProvider {...gaMethods}>
                  <GeneralAgreementForm
                    isEdit={gaViewModel.isEditCard}
                    isDisabled={true}
                  />
                </FormProvider>
              }
            />
          ),
        },
      ]}
    />
  );
});
