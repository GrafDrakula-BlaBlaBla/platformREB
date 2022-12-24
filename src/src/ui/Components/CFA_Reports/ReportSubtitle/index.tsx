import {Skeleton} from '@material-ui/lab';
import React from 'react';
import useViewModel from '../../../hooks/useViewModel';
import {ICFA_ReportsViewModel} from '../../../../ViewModel/viewModels/CFA_Reports';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {observer} from 'mobx-react-lite';

export const ReportSubtitle = observer(() => {
  const {report, loadingReport} = useViewModel<ICFA_ReportsViewModel>(
    VIEW_MODEL.CFA_Reports
  );

  return loadingReport ? (
    <Skeleton height={18} width={250} />
  ) : Object.keys(report || {}).length === 0 ? (
    <>Нет данных</>
  ) : (
    <>{`№ ${report?.id} за период ${report?.period}`}</>
  );
});
