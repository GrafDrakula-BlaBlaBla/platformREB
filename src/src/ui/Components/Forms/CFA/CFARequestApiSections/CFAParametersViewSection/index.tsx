import React from 'react';
import {
  FormField,
  FormSection,
  IFormSectionProps,
} from '../../../../../Common/FormComponents';
import {
  CurrencyFieldControlView,
  monthViewFormat,
  percentViewFormat,
  RadioGroupFieldControlView,
  TextFieldControlView,
} from '../../../../../Common/FieldControls';
import useViewModel from '../../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {ICFARequestViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/request';
import {ClassNameInjection} from '../../../../../../Utils/ClassNames/ClassNameInjection';
import {RadioItemsFromDictionary} from '../../../../../Common/FieldControls/FieldControlsBase/RadioGroupFieldControl/RadioItemsFromDictionary';
import {ECFACreditLineType} from '../../../../../../Model/CFA_Deal';
import './index.less';

export const CFAParametersViewSection = (props: IFormSectionProps) => {
  const {
    data,
    currenciesItems,
    getCurrencyCodeLat,
    financingTypeItems,
  } = useViewModel<ICFARequestViewModel>(VIEW_MODEL.CFARequest);

  const cls = ClassNameInjection(
    'cfa-parameters-view-section',
    props.className
  );

  return (
    <FormSection {...props} className={cls}>
      <FormField isRow title="Валюта сделки">
        <RadioGroupFieldControlView
          value={data?.currency}
          items={currenciesItems}
        />
      </FormField>
      <FormField isRow title="Лимит КД">
        <CurrencyFieldControlView
          value={data?.limitCreditAgreement}
          codeLat={getCurrencyCodeLat(data?.currency)}
        />
      </FormField>
      <FormField isRow title="Тип кредитной линии">
        <RadioGroupFieldControlView
          value={data?.revolving === false ? 'NKL' : 'VKL'}
          items={RadioItemsFromDictionary(ECFACreditLineType)}
        />
      </FormField>
      <FormField isRow title="Субсидируемая ставка по кредиту РЭБ">
        <TextFieldControlView
          value={data?.loanRate}
          viewFormat={percentViewFormat}
        />
      </FormField>
      <FormField isRow title="Срок кредитной линии">
        <TextFieldControlView
          value={data?.loanCreditLine}
          viewFormat={monthViewFormat}
        />
      </FormField>
      <FormField isRow title="Срок транша">
        <TextFieldControlView
          value={data?.loanTranche}
          viewFormat={monthViewFormat}
        />
      </FormField>
      <FormField isRow title="Вид финансирования">
        <RadioGroupFieldControlView
          value={data?.financingType}
          items={financingTypeItems}
        />
      </FormField>
      {data?.financingType === 'Предэкспорт' && (
        <FormField isRow title="Цели финансирования">
          <ul>
            <li>оплаты собственных векселей;</li>
            <li>покупки векселей других организаций;</li>
            <li>
              выдачи и погашения займов и кредитов, рефинансирования кредитов
              других банков;
            </li>
            <li>
              оплаты комиссий и иных платежей, предусмотренных Кредитным
              договором, и/или иными кредитными соглашениями, заключенными с РЭБ
              и/или другими кредитными организациями;
            </li>
            <li>исполнения обязательств других заемщиков перед РЭБ;</li>
            <li>приобретения и погашения эмиссионных ценных бумаг;</li>
            <li>
              осуществления вложений в уставный капитал (в том числе, других
              юридических лиц);
            </li>
            <li>выплаты дивидендов;</li>
            <li>размещения на депозитах в кредитных организациях.</li>
          </ul>
        </FormField>
      )}
      <FormField isRow title="Лимит ГС">
        <CurrencyFieldControlView
          value={data?.limitGeneralAgreement}
          codeLat={getCurrencyCodeLat(data?.currency)}
        />
      </FormField>
      <FormField isRow title="Срок ГС">
        <TextFieldControlView
          value={data?.loanPeriodGeneralAgreement}
          viewFormat={monthViewFormat}
        />
      </FormField>
      <FormField isRow title="Комиссия за обслуживание аккредитива">
        <TextFieldControlView
          value={data?.commission}
          viewFormat={percentViewFormat}
        />
      </FormField>
    </FormSection>
  );
};
