import React from 'react';
import {Form, FormSection, FormField} from '../../../../Common/FormComponents';
import {
  CurrencyFieldControlView,
  DateFieldControlView,
  TextFieldControlView,
} from '../../../../Common/FieldControls';
import {ICFAExportContractDTO} from '../../../../../Model/CFA_Deal';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

interface ICFAExportContractViewFormProps {
  data: ICFAExportContractDTO;
  className?: string;
  subtitle?: string;
}

export const CFAExportContractViewForm = (
  props: ICFAExportContractViewFormProps
) => {
  const {data, className, subtitle} = props;
  const cls = ClassNameInjection('cfa-export-contract-view-form', className);
  return (
    <Form className={cls}>
      <FormSection subtitle={subtitle}>
        <FormField isRow title="№ экспортного контракта">
          <TextFieldControlView
            value={data.exportConfirmedDocument.numberOfExportContract}
          />
        </FormField>
        <FormField isRow title="Дата экспортного контракта">
          <DateFieldControlView
            value={data.exportConfirmedDocument.dateOfExportContract}
          />
        </FormField>
        <FormField isRow title="Сумма экспортного контракта, ₽">
          <CurrencyFieldControlView
            value={data.exportConfirmedDocument.contractSumm}
            codeLat={data.exportConfirmedDocument.currency}
          />
        </FormField>
        <FormField isRow title="Валюта контракта">
          <TextFieldControlView value={data.exportConfirmedDocument.currency} />
        </FormField>
        <FormField isRow title="Наименование покупателя">
          <TextFieldControlView
            value={data.exportConfirmedDocument.buyerCompanyName}
          />
        </FormField>
        <FormField isRow title="Страна покупателя">
          <TextFieldControlView
            value={data.exportConfirmedDocument.buyerCompanyCountry}
          />
        </FormField>
        <FormField isRow title="Страна поставки">
          <TextFieldControlView
            value={data.exportConfirmedDocument.deliveryCountry}
          />
        </FormField>
        <FormField isRow title="Наименование документов отгрузки">
          <TextFieldControlView
            value={data.exportConfirmedDocument.documentsShipmentProducts}
          />
        </FormField>
        <FormField isRow title="Наименование, номер и дата документов отгрузки">
          <TextFieldControlView
            value={data.exportConfirmedDocument.documentsInfo}
          />
        </FormField>
        <FormField
          isRow
          title="Наименование, номер и дата транспортных документов отгрузки"
        >
          <TextFieldControlView
            value={data.exportConfirmedDocument.tdocumentsInfo}
          />
        </FormField>
        <FormField
          isRow
          title="Код(ы) ТН ВЭД в соответствие с приказом МПТ 3092"
        >
          <TextFieldControlView value={data.exportConfirmedDocument.tnCodes} />
        </FormField>
        <FormField
          isRow
          title="Наименование, номер и сумма документов отгрузки"
        >
          <TextFieldControlView
            value={data.exportConfirmedDocument.documentSumm}
          />
        </FormField>
        <FormField
          isRow
          title="Всего поставлено по контракту на дату составления отчёта, в валюте контракта, ₽"
        >
          <CurrencyFieldControlView
            value={data.exportConfirmedDocument.deliveredProducts}
            codeLat={data.exportConfirmedDocument.currency}
          />
        </FormField>
        <FormField
          isRow
          title="Всего поставлено по контракту за отчётный период, в валюте контракта, ₽"
        >
          <CurrencyFieldControlView
            value={data.exportConfirmedDocument.deliveredProductsForPeriod}
            codeLat={data.exportConfirmedDocument.currency}
          />
        </FormField>
        <FormField
          isRow
          title="Всего поступило средств по контракту на дату составления отчёта, в валюте контракта, ₽"
        >
          <CurrencyFieldControlView
            value={data.exportConfirmedDocument.paidProducts}
            codeLat={data.exportConfirmedDocument.currency}
          />
        </FormField>
        <FormField
          isRow
          title="Всего поступило средств по контракту за отчётный период, в валюте контракта, ₽"
        >
          <CurrencyFieldControlView
            value={data.exportConfirmedDocument.paidProductsForPeriod}
            codeLat={data.exportConfirmedDocument.currency}
          />
        </FormField>
      </FormSection>
    </Form>
  );
};
