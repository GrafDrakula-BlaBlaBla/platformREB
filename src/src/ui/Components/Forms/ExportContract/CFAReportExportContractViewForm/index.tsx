import React from 'react';
import {Form, FormSection, FormField} from '../../../../Common/FormComponents';
import {
  CurrencyFieldControlView,
  DateFieldControlView,
  TextFieldControlView,
} from '../../../../Common/FieldControls';
import {ICFA_ReportExportContractDTO} from '../../../../../Model/CFA_Reports';
import './index.less';

interface ICFAReportExportContractViewFormProps {
  data: ICFA_ReportExportContractDTO;
}

export const CFAReportExportContractViewForm = ({
  data,
}: ICFAReportExportContractViewFormProps) => {
  return (
    <Form className="cfa-report-export-contract-view-form">
      <FormSection>
        <FormField title="№ экспортного контракта">
          <TextFieldControlView
            value={data.exportConfirmedDocument.numberOfExportContract}
          />
        </FormField>
        <FormField title="Дата экспортного контракта">
          <DateFieldControlView
            value={data.exportConfirmedDocument.dateOfExportContract}
          />
        </FormField>
        <FormField title="Сумма экспортного контракта, ₽">
          <CurrencyFieldControlView
            value={data.exportConfirmedDocument.contractSumm}
            codeLat={data.exportConfirmedDocument.currency}
          />
        </FormField>
        <FormField title="Валюта контракта">
          <TextFieldControlView value={data.exportConfirmedDocument.currency} />
        </FormField>
        <FormField title="Наименование покупателя">
          <TextFieldControlView
            value={data.exportConfirmedDocument.buyerCompanyName}
          />
        </FormField>
        <FormField title="Страна покупателя">
          <TextFieldControlView
            value={data.exportConfirmedDocument.buyerCompanyCountry}
          />
        </FormField>
        <FormField title="Страна поставки">
          <TextFieldControlView
            value={data.exportConfirmedDocument.deliveryCountry}
          />
        </FormField>
        <FormField title="Наименование документов отгрузки">
          <TextFieldControlView
            value={data.exportConfirmedDocument.documentsShipmentProducts}
          />
        </FormField>
        <FormField title="Наименование, номер и дата документов отгрузки">
          <TextFieldControlView
            value={data.exportConfirmedDocument.documentsInfo}
          />
        </FormField>
        <FormField title="Наименование, номер и дата транспортных документов отгрузки">
          <TextFieldControlView
            value={data.exportConfirmedDocument.tdocumentsInfo}
          />
        </FormField>
        <FormField title="Код(ы) ТН ВЭД в соответствие с приказом МПТ 3092">
          <TextFieldControlView value={data.exportConfirmedDocument.tnCodes} />
        </FormField>
        <FormField title="Наименование, номер и сумма документов отгрузки">
          <TextFieldControlView
            value={data.exportConfirmedDocument.documentSumm}
          />
        </FormField>
        <FormField title="Всего поставлено по контракту на дату составления отчёта, в валюте контракта, ₽">
          <CurrencyFieldControlView
            value={data.exportConfirmedDocument.deliveredProducts}
            codeLat={data.exportConfirmedDocument.currency}
          />
        </FormField>
        <FormField title="Всего поставлено по контракту за отчётный период, в валюте контракта, ₽">
          <CurrencyFieldControlView
            value={data.exportConfirmedDocument.deliveredProductsForPeriod}
            codeLat={data.exportConfirmedDocument.currency}
          />
        </FormField>
        <FormField title="Всего поступило средств по контракту на дату составления отчёта, в валюте контракта, ₽">
          <CurrencyFieldControlView
            value={data.exportConfirmedDocument.paidProducts}
            codeLat={data.exportConfirmedDocument.currency}
          />
        </FormField>
        <FormField title="Всего поступило средств по контракту за отчётный период, в валюте контракта, ₽">
          <CurrencyFieldControlView
            value={data.exportConfirmedDocument.paidProductsForPeriod}
            codeLat={data.exportConfirmedDocument.currency}
          />
        </FormField>
      </FormSection>
    </Form>
  );
};
