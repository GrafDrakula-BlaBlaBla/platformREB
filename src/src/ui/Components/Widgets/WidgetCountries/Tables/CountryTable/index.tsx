import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import {ClassNameInjection} from '../../../../../../Utils/ClassNames/ClassNameInjection';
import {Table} from '../../../../../Common/TableComponents';
import {config} from '../Config';
import {IWidgetCountriesDTO} from '../../../../../../Model/Widgets/WidgetCountries';
import {LoaderWithBackdrop} from '../../../../../Common/SimpleComponents/LoaderWithBackdrop';
import '../index.less';

interface IProps {
  data: IWidgetCountriesDTO[];
  className?: string;
  loading?: boolean;
  onSorting: (
    sortedData: IWidgetCountriesDTO[],
    column?: string,
    direction?: string
  ) => void;
}

export const CountryTable: FC<IProps> = observer(
  ({data, className, loading, onSorting}) => {
    return (
      <React.Fragment>
        <LoaderWithBackdrop loading={loading} />
        <Table
          data={data}
          config={config}
          onSortCallback={onSorting}
          className={ClassNameInjection('country-table', className)}
        />
      </React.Fragment>
    );
  }
);
