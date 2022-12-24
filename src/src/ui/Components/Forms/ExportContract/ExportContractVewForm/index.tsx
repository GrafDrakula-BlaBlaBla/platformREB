import React from 'react';
import {Form, FormSection, FormField} from '../../../../Common/FormComponents';
import {
  CurrencyFieldControlView,
  TextFieldControlView,
} from '../../../../Common/FieldControls';
import {IExportContractDTO} from '../../../../../Model/Credits';
import './index.less';

interface IExportContractViewFormProps {
  data: IExportContractDTO;
}

export const ExportContractViewForm = ({
  data,
}: IExportContractViewFormProps) => {
  return (
    <Form className="export-contract-view-form">
      <FormSection>
        <FormField title="Наименование и страна покупателя, страна поставки">
          <TextFieldControlView
            value={`${data.buyerCompanyName}, ${data.deliveryCountry}`}
          />
        </FormField>
        <FormField
          title="Наименование документов, подтверждающих отгрузку продукции на
  экспорт (счет, таможенная декларация, транспортный документ)"
        >
          <TextFieldControlView
            value={data.confirmedDocuments.map((item) => item.name).join(', ')}
          />
        </FormField>
        <FormField
          title="Номер и дата документов, подтверждающих отгрузку продукции на
  экспорт"
        >
          <TextFieldControlView
            value={data.confirmedDocuments.map((item) => item.date).join(', ')}
          />
        </FormField>
        <FormField title="Дата транспортного документа, подтверждающего отгрузку продукции">
          <TextFieldControlView
            value={data.confirmedDocuments.map((item) => item.date).join(', ')}
          />
        </FormField>
        <FormField title="Код(ы) ТН ВЭД в соответствие с приказом МПТ 3092">
          <TextFieldControlView value={data.tnCodes.join(', ')} />
        </FormField>
        <FormField title="Сумма документа, подтверждающего отгрузку продукции на экспорт">
          <TextFieldControlView value={data.contractSumm} />
        </FormField>
        <FormField
          title="Плановая дата поступления выручки согласно условиям платежа по
  экспортному контракту"
        >
          <TextFieldControlView value={data.revenuePlannedDate} />
        </FormField>
        <FormField title="Сумма экспортного контракта">
          <CurrencyFieldControlView value={data.tnSumm} />
        </FormField>
      </FormSection>
    </Form>
  );
};
