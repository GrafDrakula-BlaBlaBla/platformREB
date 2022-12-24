import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {useRoute} from 'react-router5';
import {ETableType} from '../..';
import {IIndustryDivisionOKKItem} from '../../../../../../Model/Widgets/WidgetIndustry';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {IWidgetIndustryViewModel} from '../../../../../../ViewModel/viewModels/Widgets/WidgetIndustry/interfaces';
import {TableWidget} from '../../../../../Common/TableComponents/Table/TableWidget';
import useUpdateEffect from '../../../../../hooks/useUpdateEffect';
import useViewModel from '../../../../../hooks/useViewModel';
import {config} from './config';
import {ReactComponent as DocumentsIcon} from '../../../../../../assets/svg/commonArea/Documents.svg';

interface IProps {
  id?: string;
  data?: IIndustryDivisionOKKItem[];
  limit?: number;
  tableType?: ETableType;
  loading?: boolean;
  onRowClick?: (row: IIndustryDivisionOKKItem) => void;
}

export const OkkTable = observer((props: IProps) => {
  const {limit, id, data, onRowClick} = props;
  const {getOKK, setData, clearData} = useViewModel<IWidgetIndustryViewModel>(
    VIEW_MODEL.WidgetIndustry
  );
  const {
    route: {params},
  } = useRoute();

  useEffect(() => {
    switch (props.tableType) {
      case ETableType.Table:
        getOKK('okkData', {
          ...params,
          limit: 6,
          sortBy: 'desc(countDeals)',
        });
        break;
      case ETableType.FullTable:
        getOKK('okkFullData', {
          ...params,
          limit: 100,
          sortBy: 'desc(countDeals)',
        });
        break;
      case ETableType.DetailedTable:
        getOKK('okkDetailedData', {
          ...params,
          limit: limit || 100,
          id: id,
          sortBy: 'desc(countDeals)',
        });
        break;
    }

    return () => {
      switch (props.tableType) {
        case ETableType.Table:
          clearData('okkData');
          break;
        case ETableType.FullTable:
          clearData('okkFullData');
          break;
        case ETableType.DetailedTable:
          clearData('okkDetailedData');
          break;
      }
    };
    // eslint-disable-next-line
  }, []);

  const [sortBy, setSortBy] = useState('desc(countDeals)');
  useUpdateEffect(() => {
    switch (props.tableType) {
      case ETableType.Table:
        getOKK('okkData', {
          ...params,
          limit: 6,
          sortBy: sortBy,
        });
        break;
      case ETableType.FullTable:
        getOKK('okkFullData', {
          ...params,
          limit: 100,
          sortBy: sortBy,
        });
        break;
      case ETableType.DetailedTable:
        getOKK('okkDetailedData', {
          ...params,
          limit: limit || 100,
          id: id,
          sortBy: sortBy,
        });
        break;
    }
  }, [sortBy]);

  const _onRowClick = onRowClick
    ? (row: IIndustryDivisionOKKItem) => {
        if (!id) {
          onRowClick?.(row);
        }
      }
    : undefined;

  return (
    <TableWidget
      loading={props.loading}
      onSortCallback={(sortedData, sortColumnName, direction) => {
        switch (props.tableType) {
          case ETableType.Table:
            setSortBy(`${direction}(${sortColumnName})`);
            break;
          case ETableType.FullTable:
            setData('okkFullData', sortedData);
            break;
          case ETableType.DetailedTable:
            setData('okkDetailedData', sortedData);
            break;
        }
      }}
      onRowClick={_onRowClick}
      data={data || []}
      config={config}
      emptyInfo={{icon: <DocumentsIcon />}}
    />
  );
});
