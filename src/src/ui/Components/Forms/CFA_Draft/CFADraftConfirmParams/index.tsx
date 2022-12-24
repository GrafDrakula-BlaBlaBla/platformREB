import React from 'react';
import {Form, FormField, FormSection} from '../../../../Common/FormComponents';
import {TextFieldControlView} from '../../../../Common/FieldControls';
import useViewModel from '../../../../hooks/useViewModel';
import {ICFADraftComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/draft/interfaces';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {WrapperStatus} from '../../../CFA_Deal/WrapperStatus';
import {WrapperIndividualCategory} from '../../../CFA_Deal/WrapperIndividualCategory';
import {Notify, NOTIFY_TYPE} from '../../../../Common/SimpleComponents/Notify';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import './index.less';

export const CFADraftConfirmParams = () => {
  const {data, isValid: isValidRequest} = useViewModel<ICFADraftComViewModel>(
    VIEW_MODEL.CFADraft
  );

  return (
    <Form className="cfa-draft-confirm-params">
      {isValidRequest ? null : (
        <Notify
          className="cfa-draft-confirm-params__notify"
          type={NOTIFY_TYPE.error}
          icon={<CancelIcon />}
          text="Вы заполнили не все поля."
        />
      )}
      <FormSection title="1. Параметры" subtitle="Общая информация">
        <FormField isRow title="ID сделки" error={!data?.requestId}>
          <TextFieldControlView value={data?.requestId} />
        </FormField>
        <FormField isRow title="Статус сделки" error={!data?.status}>
          <WrapperStatus status={data?.status} />
        </FormField>
      </FormSection>
      <FormSection subtitle="Заёмщик/приказодатель">
        <FormField isRow title="Наименование" error={!data?.fullName}>
          <TextFieldControlView value={data?.fullName} />
        </FormField>
        <FormField isRow title="ИНН" error={!data?.inn}>
          <TextFieldControlView value={data?.inn} />
        </FormField>
        <FormField isRow title="ОКВЕД 2" error={!data?.okved2}>
          <TextFieldControlView value={data?.okved2} />
        </FormField>
        <FormField isRow title="Сегмент" error={!data?.individualCategory}>
          <WrapperIndividualCategory
            individualCategory={data?.individualCategory}
          />
        </FormField>
        <FormField isRow title="Субъект РФ" error={!data?.tb}>
          <TextFieldControlView value={data?.tb} />
        </FormField>
      </FormSection>
      <FormSection subtitle="Предварительные параметры">
        <FormField isRow title="Страна поставки" error={!data?.deliveryCountry}>
          <TextFieldControlView value={data?.deliveryCountry} />
        </FormField>
        <FormField
          isRow
          title="Наименование компании покупателя"
          error={!data?.buyerCompanyName}
        >
          <TextFieldControlView value={data?.buyerCompanyName} />
        </FormField>
      </FormSection>
    </Form>
  );
};
