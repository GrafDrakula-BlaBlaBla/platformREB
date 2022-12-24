import React from 'react';
import {observer} from 'mobx-react-lite';
import {ModalPage} from '../../../../Common/SimpleComponents/ModalPage';
import {Notify, NOTIFY_TYPE} from '../../../../Common/SimpleComponents/Notify';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment';
import './index.less';

interface IDialogCreateReportProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (dates?: {startDate: string; endDate: string}) => void;
  isEnableCreate?: boolean;
}

const getCurrentPeriod = () => {
  const today = new Date();
  const quarter = Math.floor((today.getMonth() + 3) / 3) - 1;
  const startDate = moment(today)
    .quarter(quarter)
    .startOf('year')
    .format('DD.MM.YYYY');
  const endDate = moment(today)
    .quarter(quarter)
    .endOf('quarter')
    .format('DD.MM.YYYY');
  return `с ${startDate} по ${endDate}`;
};

export const DialogCreateReport = observer(
  (props: IDialogCreateReportProps) => {
    const {isOpen, onClose, onSuccess, isEnableCreate} = props;
    return (
      <ModalPage
        className="dialog-create-report"
        onClose={onClose}
        isOpen={isOpen}
        header={{title: 'Формирование отчета'}}
        footerButtonConfig={[
          {
            children: 'Отмена',
            onClick: onClose,
            whiteTheme: true,
          },
          {
            disabled: !isEnableCreate,
            children: 'Сформировать и отправить',
            onClick: () => onSuccess(),
          },
        ]}
      >
        <Notify
          icon={<InfoIcon />}
          type={NOTIFY_TYPE.warning}
          isExpanded={true}
          text="Формирование отчета происходит накопительным итогом и возможно в течение месяца, следующего после окончания квартала."
          textExpanded={
            <div>
              <div>Например:</div>
              <ul>
                <li>
                  Отчет <b>за Q1, 2021</b> – формирование будет доступно{' '}
                  <b>в апреле 2021</b>
                </li>
                <li>
                  Отчет <b>за Q1, Q2, 2021</b> – формирование будет доступно{' '}
                  <b>в июле 2021</b>
                </li>
                <li>
                  Отчет <b>за Q1, Q2, и Q3 2021</b> – формирование будет
                  доступно <b>в октябре 2021</b>
                </li>
                <li>
                  Отчет <b>за Q1, Q2, Q3 и Q4 2021</b> – формирование будет
                  доступно <b>в январе 2022</b>
                </li>
              </ul>
            </div>
          }
        />
        <div className="dialog-create-report__interval">
          Отчет будет сформирован за период {getCurrentPeriod()} включительно.
        </div>
      </ModalPage>
    );
  }
);
