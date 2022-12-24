import {observer} from 'mobx-react-lite';
import React from 'react';
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
  const {report, loading, sendReportToReb} = useViewModel<IReportsViewModel>(
    VIEW_MODEL.Reports
  );

  const handleSubmit = () => {
    if (report) {
      sendReportToReb(report.objectId);
    }
  };

  const renderFooterButton = (): JSX.Element | null => {
    return report?.status === EStatusCodes.CREATED ? (
      <Button onClick={handleSubmit}>Отправить</Button>
    ) : null;
  };

  return (
    <PageLayout
      loading={loading}
      title="Отчет"
      buttonGroupConfig={
        report?.status === EStatusCodes.CREATED
          ? [{children: 'Отправить', onClick: handleSubmit}]
          : undefined
      }
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
