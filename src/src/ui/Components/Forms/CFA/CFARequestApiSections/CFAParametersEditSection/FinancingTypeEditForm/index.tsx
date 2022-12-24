import {FormField} from '../../../../../../Common/FormComponents';
import {
  Notify,
  NOTIFY_TYPE,
} from '../../../../../../Common/SimpleComponents/Notify';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import React from 'react';

export const FinancingTypeEditForm = () => (
  <FormField
    title="Цели финансирования"
    className="cfa-parameters-edit-section__goals_edit"
  >
    <div className="cfa-parameters-edit-section__goals_edit-title">
      Обратите внимание, что при выборе вида финансирования Предэкспорт,
      автоматически будут выбраны следующие Цели финансирования:
    </div>
    <Notify
      icon={<AddCircleIcon />}
      iconExpanded={<RemoveCircleIcon />}
      text="Ознакомиться с целями"
      textExpanded={
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
      }
      type={NOTIFY_TYPE.transparent}
    />
  </FormField>
);
