import React, {useEffect, useState} from 'react';
import {IIndustryDivisionOKVEDItem} from '../../../../../../Model/Widgets/WidgetIndustry';
import {config} from './config';
import {TableWidget} from '../../../../../Common/TableComponents/Table/TableWidget';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../../../hooks/useViewModel';
import {IWidgetIndustryViewModel} from '../../../../../../ViewModel/viewModels/Widgets/WidgetIndustry/interfaces';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {useRoute} from 'react-router5';
import {ETableType} from '../..';
import useUpdateEffect from '../../../../../hooks/useUpdateEffect';
import {ReactComponent as DocumentsIcon} from '../../../../../../assets/svg/commonArea/Documents.svg';

interface IProps {
  id?: string;
  data?: IIndustryDivisionOKVEDItem[];
  tableType?: ETableType;
  limit?: number;
  loading?: boolean;
  onRowClick?: (row: IIndustryDivisionOKVEDItem) => void;
}

export const OkvedTable = observer((props: IProps) => {
  const {id, limit, data, onRowClick} = props;
  const {getOKVED, setData, clearData} = useViewModel<IWidgetIndustryViewModel>(
    VIEW_MODEL.WidgetIndustry
  );

  const {
    route: {params},
  } = useRoute();

  const [sortBy, setSortBy] = useState('desc(countDeals)');

  useEffect(() => {
    switch (props.tableType) {
      case ETableType.Table:
        getOKVED('okvedData', {
          ...params,
          limit: 6,
          sortBy: 'desc(countDeals)',
        });
        break;
      case ETableType.FullTable:
        getOKVED('okvedFullData', {
          ...params,
          limit: 100,
          sortBy: 'desc(countDeals)',
        });
        break;
      case ETableType.DetailedTable:
        getOKVED('okvedDetailedData', {
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
          clearData('okvedData');
          break;
        case ETableType.FullTable:
          clearData('okvedFullData');
          break;
        case ETableType.DetailedTable:
          clearData('okvedDetailedData');
          break;
      }
    };
    // eslint-disable-next-line
  }, []);

  useUpdateEffect(() => {
    switch (props.tableType) {
      case ETableType.Table:
        getOKVED('okvedData', {
          ...params,
          limit: 6,
          sortBy: sortBy,
        });
        break;
      case ETableType.FullTable:
        getOKVED('okvedFullData', {
          ...params,
          limit: 100,
          sortBy: sortBy,
        });
        break;
      case ETableType.DetailedTable:
        getOKVED('okvedDetailedData', {
          ...params,
          limit: limit || 100,
          id: id,
          sortBy: sortBy,
        });
        break;
    }
  }, [sortBy]);

  const _onRowClick = onRowClick
    ? (row: IIndustryDivisionOKVEDItem) => {
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
            setData('okvedFullData', sortedData);
            break;
          case ETableType.DetailedTable:
            setData('okvedDetailedData', sortedData);
            break;
        }
      }}
      data={data || []}
      config={config}
      className="okved-table"
      onRowClick={_onRowClick}
      emptyInfo={{icon: <DocumentsIcon />}}
    />
  );
});
