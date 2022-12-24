import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import {IWidgetCountriesDTO} from '../../../../../../Model/Widgets/WidgetCountries';
import {ClassNameInjection} from '../../../../../../Utils/ClassNames/ClassNameInjection';
import {Loader} from '../../../../../Common/SimpleComponents/Loader';
import {Table} from '../../../../../Common/TableComponents';
import {config} from '../Config';
import '../index.less';

interface IProps {
  data: IWidgetCountriesDTO[];
  className?: string;
  loading?: boolean;
  onSorting: (sortData: IWidgetCountriesDTO[]) => void;
}

export const CountryFullTable: FC<IProps> = observer(
  ({data, className, loading, onSorting}) => {
    return (
      <React.Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Table
            data={data}
            config={config}
            onSortCallback={onSorting}
            className={ClassNameInjection('country-table', className)}
          />
        )}
      </React.Fragment>
    );
  }
);
