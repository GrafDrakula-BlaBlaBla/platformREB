import React from 'react';
import moment from 'moment';
import {ModalPage} from '../../../Common/SimpleComponents/ModalPage';
import {FormProvider, FieldValues, useForm} from 'react-hook-form';
import {ReportCreateForm, reportCreateFormDefaultValues} from '../../Forms';
import {LoaderWithBackdrop} from '../../../Common/SimpleComponents/LoaderWithBackdrop';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../hooks/useViewModel';
import {ICFA_ReportsCommercialViewModel} from '../../../../ViewModel/viewModels/CFA_Reports';
import './index.less';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';

const yearMask = 'YYYY';
const dateMask = 'DD.MM.YYYY';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (dates?: {startDate: string; endDate: string}) => void;
}

/**
 * Компонент диалогового окна для формирования отчета из кредитов
 */
export const DialogReportCreation = observer(
  ({isOpen, onClose, onSuccess}: IProps) => {
    const {loading} = useViewModel<ICFA_ReportsCommercialViewModel>(
      VIEW_MODEL.CFA_Reports
    );
    const methods = useForm<FieldValues>({
      defaultValues: reportCreateFormDefaultValues,
      mode: 'onChange',
    });

    const submit = (data: any) => {
      const startDate = moment(data.year, yearMask).format(dateMask);
      const endDate = moment(data.year, yearMask)
        .quarter(data.quarter)
        .endOf('quarter')
        .format(dateMask);
      onSuccess({startDate, endDate});
    };

    return (
      <ModalPage
        className="dialog-report-creation"
        onClose={onClose}
        isOpen={isOpen}
        header={{title: 'Период формирования отчета'}}
        footerButtonConfig={[
          {
            children: 'Отмена',
            onClick: onClose,
            whiteTheme: true,
          },
          {
            children: 'Сформировать',
            onClick: methods.handleSubmit(submit),
          },
        ]}
      >
        <LoaderWithBackdrop loading={loading} />
        <FormProvider {...methods}>
          <ReportCreateForm />
        </FormProvider>
      </ModalPage>
    );
  }
);
