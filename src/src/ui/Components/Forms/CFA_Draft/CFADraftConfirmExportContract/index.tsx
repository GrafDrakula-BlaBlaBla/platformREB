import React from 'react';
import {FormField, FormSection, Form} from '../../../../Common/FormComponents';
import {ICFADraftExportContractDTO} from '../../../../../Model/CFA_Draft';
import {
  TextFieldControlView,
  CheckboxFieldControlView,
  DateFieldControlView,
  CurrencyFieldControlView,
} from '../../../../Common/FieldControls';
import {getDateWithFrontEndFormat} from '../../../../../Utils/Date/DateFormat';
import {Divider} from '../../../../Common/SimpleComponents/Divider';
import './index.less';

interface ICFADraftConfirmExportContractProps {
  data: ICFADraftExportContractDTO;
}

export const CFADraftConfirmExportContract = ({
  data,
}: ICFADraftConfirmExportContractProps) => {
  return (
    <Form className="cfa-draft-confirm-export-contract">
      <Divider />
      <FormSection
        title={`Экспортный контракт № ${
          data?.numberOfExportContract
        } от ${getDateWithFrontEndFormat(data?.dateOfExportContract)}`}
        subtitle="Общая информация"
      >
        <FormField isRow title="Номер экспортного контракта">
          <TextFieldControlView value={data?.numberOfExportContract} />
        </FormField>
        <FormField isRow title="Дата экспортного контракта">
          <DateFieldControlView value={data?.dateOfExportContract} />
        </FormField>
        <FormField isRow title="Наименование компании покупателя">
          <TextFieldControlView value={data?.buyerCompanyName} />
        </FormField>
        <FormField isRow title="Страна поставки">
          <TextFieldControlView value={data?.deliveryCountry} />
        </FormField>
        <FormField isRow title="Плановая дата поступления выручки">
          <DateFieldControlView value={data?.revenuePlannedDate} />
        </FormField>
        <FormField isRow title="Сумма, приходящаяся на ТН ВЭДы (RUB)">
          <CurrencyFieldControlView value={data?.tnSumm} />
        </FormField>
      </FormSection>
      <FormSection subtitle="ТН ВЭД коды">
        <FormField isRow>
          <TextFieldControlView
            value={data?.tnCodes.map((tnCode) => tnCode.code).join(', ')}
          />
        </FormField>
      </FormSection>
      <FormSection subtitle="Экспортные документы">
        {data?.confirmedDocuments.map((document) => (
          <div
            key={document.confirmedId}
            className="cfa-draft-confirm-export-contract__document"
          >
            <FormField isRow title="Наименование документа">
              <TextFieldControlView value={document?.name} />
            </FormField>
            <FormField isRow title="Номер документа">
              <TextFieldControlView value={document?.confirmedId} />
            </FormField>
            <FormField isRow title="Сумма документа (RUB)">
              <CurrencyFieldControlView value={document?.amount} />
            </FormField>
            <FormField isRow title="Дата документа">
              <DateFieldControlView value={document?.date} />
            </FormField>
            <FormField isRow title="Транспортный документ">
              <CheckboxFieldControlView value={document?.isTransport} />
            </FormField>
          </div>
        ))}
      </FormSection>
    </Form>
  );
};
