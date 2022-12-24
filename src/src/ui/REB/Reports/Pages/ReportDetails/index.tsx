import React from 'react';
import {observer} from 'mobx-react-lite';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {PageLayout} from '../../../../Common/PageLayout';
import {InfoBlock} from '../../../../Common/SimpleComponents/InfoBlock';
import {StatusWrapper} from '../../../../Common/SimpleComponents/StatusWrapper';
import useViewModel from '../../../../hooks/useViewModel';
import {CreditsTable} from '../../../../Components/CreditsTable';
import {IReportDTO} from '../../../../../Model/Reports';
import {Button} from '../../../../Common/SimpleComponents/Button';
import {EStatusCodes} from '../../../../../Model/Status';
import {IReportsViewModel} from '../../../../../ViewModel/viewModels/Reports/interfaces';

/**
 * Моковый конфиг.
 */
const getInfoBlockConfig = (report?: IReportDTO) => [
  {
    label: 'Статус',
    value: <StatusWrapper status={report?.status} />,
  },
  {label: '№', value: report?.objectId},
  {label: 'Период', value: '01.01.2021 - 30.03.2021'},
  {label: 'Кол-во кредитов', value: report?.loanCount},
  {label: 'Объём фондирования, RUB', value: report?.loanAmount},
  {label: 'Запрашиваемая выборка, RUB', value: report?.loanIssuedAmount},
];

export const ReportDetails = observer(() => {
  const {report, loading, acceptReport} = useViewModel<IReportsViewModel>(
    VIEW_MODEL.Reports
  );

  const handleAccept = () => {
    if (report) {
      acceptReport(report.objectId);
    }
  };

  const renderFooterButton = () => {
    if (report?.status === EStatusCodes.ON_CONSIDERATION) {
      return <Button onClick={handleAccept}>Принять</Button>;
    }
  };

  const getHeaderButtonConfig = () => {
    if (report?.status === EStatusCodes.ON_CONSIDERATION) {
      return [{children: 'Принять', onClick: handleAccept}];
    }
  };

  return (
    <PageLayout
      loading={loading}
      title="Отчет"
      buttonGroupConfig={getHeaderButtonConfig()}
      footer={{buttonsGroup: renderFooterButton()}}
    >
      <h1>1. Сведения об отчете</h1>
      <div className="d-flex">
        <InfoBlock className="flex-1" data={getInfoBlockConfig(report)} />
      </div>

      {report?.credits ? (
        <>
          <h1 className="margin-bottom-4">2. Кредиты в отчете</h1>
          <CreditsTable creditsData={report.credits} />
        </>
      ) : null}
    </PageLayout>
  );
});
