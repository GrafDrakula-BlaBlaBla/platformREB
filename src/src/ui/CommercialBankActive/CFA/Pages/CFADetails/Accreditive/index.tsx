import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import useViewModel from '../../../../../hooks/useViewModel';
import PermissionContext from '../../../../../app/contexts/PremissionContext';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {ICFARequestComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/request';
import {AccreditiveContainer} from '../../../../../Components/CFA_Deal/Accreditive/AccreditiveContainer';
import {ParametersCard} from '../../../../../Components/CFA_Deal/Accreditive/ParametersCard';
import {
  CreditContractForm,
  creditContractFormDefaultValues,
  GeneralAgreementForm,
  generalAgreementFormDefaultValues,
} from '../../../../../Components/Forms';
import {useRoute} from 'react-router5';
import {ICFAAccreditiveComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/accreditive';
import {ICFACreditContractComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/creditContract';
import {ICFAGeneralAgreementComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/generalAgreement';

export const Accreditive = observer(() => {
  const {route} = useRoute();

  const {isValidForm, setFormData} = useViewModel<ICFAAccreditiveComViewModel>(
    VIEW_MODEL.CFAAccreditive
  );
  const ccViewModel = useViewModel<ICFACreditContractComViewModel>(
    VIEW_MODEL.CFACreditContract
  );
  const gaViewModel = useViewModel<ICFAGeneralAgreementComViewModel>(
    VIEW_MODEL.CFAGeneralAgreement
  );
  const {getRequest} = useViewModel<ICFARequestComViewModel>(
    VIEW_MODEL.CFARequest
  );

  const {isDone} = useViewModel<ICFARequestComViewModel>(VIEW_MODEL.CFARequest);
  const {isAccess} = useContext(PermissionContext);
  const canCreateUrl = 'credit-for-accreditive/commercial/generalaggrement';
  const canCreate = isAccess(canCreateUrl, 'POST') && isDone;
  const canEditUrl = 'credit-for-accreditive/commercial/generalaggrement';
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
    await gaViewModel.getGeneralAgreement(route.params.id);
    gaMethods.reset();
    gaViewModel.setIsEditCard(false);
    ccViewModel.setIsEditCard(false);
  };
  const onSave = gaMethods.handleSubmit(async (data: any) => {
    if (isValidForm) {
      setFormData(data);
      await gaViewModel.saveData();
      await gaViewModel.getGeneralAgreement(route.params.id);
      gaMethods.reset();
      gaViewModel.setIsEditCard(false);
      ccViewModel.setIsEditCard(false);
      await getRequest(route.params.id);
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
          title: 'Генеральное соглашение',
          content: (
            <ParametersCard
              noDataMessage="Данные о генеральном соглашении вносятся банком"
              loaded={gaViewModel.isLoaded}
              loading={gaViewModel.loading}
              isForm={
                !gaViewModel.isEmpty ||
                (gaViewModel.isEmpty && gaViewModel.isEditCard)
              }
              isEditCard={gaViewModel.isEditCard}
              formProvider={
                <FormProvider {...gaMethods}>
                  <GeneralAgreementForm isEdit={gaViewModel.isEditCard} />
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
          title: 'Кредитный договор',
          content: (
            <ParametersCard
              noDataMessage="Данные о кредитном договоре вносятся банком"
              loaded={ccViewModel.isLoaded}
              loading={ccViewModel.loading}
              isForm={!ccViewModel.isEmpty}
              formProvider={
                <FormProvider {...ccMethods}>
                  <CreditContractForm
                    isEdit={ccViewModel.isEditCard}
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
