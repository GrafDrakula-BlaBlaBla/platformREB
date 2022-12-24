import React, {FC} from 'react';
import {ModalPage} from '../../../../Common/SimpleComponents/ModalPage';
import './index.less';

interface IProps {
  isOpen: boolean;
  mode: 'postExport' | 'preExport';
  onClose: () => void;
}

export const FinanceModal: FC<IProps> = ({isOpen, mode, onClose}) => {
  return (
    <ModalPage
      isOpen={isOpen}
      onClose={onClose}
      header={{title: 'Цели финансирования'}}
      className="finance-modal"
    >
      {mode === 'preExport' ? <PreExportContent /> : <PostExportContent />}
    </ModalPage>
  );
};

const PreExportContent = () => {
  return (
    <div className="finance-modal-content finance-modal-content_pre-export">
      <ul>
        <li>Оплата сырья, материалов;</li>
        <li>Транспортные и таможенные расходы;</li>
        <li>Оплата энергоресурсов;</li>
        <li>Оплата заработной платы (в т.ч. Налоги и сборы на ФОТ).</li>
      </ul>
    </div>
  );
};

const PostExportContent = () => {
  return (
    <div className="finance-modal-content finance-modal-content_post-export">
      Финансирование дебиторской задолженности – все расходы за исключением:
      <ul>
        <li>оплаты собственных векселей;</li>
        <li>покупки векселей других организаций;</li>
        <li>
          выдачи и погашения займов и кредитов, рефинансирования кредитов других
          банков;
        </li>
        <li>
          оплаты комиссий и иных платежей, предусмотренных Кредитным договором,
          <br />
          и/или иными кредитными соглашениями, заключенными с РЭБ <br />
          и/или другими кредитными организациями;
        </li>
        <li>исполнения обязательств других заемщиков перед РЭБ;</li>
        <li>приобретения и погашения эмиссионных ценных бумаг;</li>
        <li>
          осуществления вложений в уставный капитал (в том числе, других
          юридических лиц);
        </li>
        <li>
          выплаты дивидендов; размещения на депозитах в кредитных организациях.
        </li>
      </ul>
    </div>
  );
};
