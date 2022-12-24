import React, {FC, useState} from 'react';
import {OkkTable} from './Tables/OkkTable';
import {OkvedTable} from './Tables/OkvedTable';
import {Switcher} from '../../../Common/SimpleComponents/Switcher';
import {Button} from '../../../Common/SimpleComponents/Button';
import {ModalPage} from '../../../Common/SimpleComponents/ModalPage';
import {
  IIndustryDivisionOKKItem,
  IIndustryDivisionOKVEDItem,
} from '../../../../Model/Widgets/WidgetIndustry';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../hooks/useViewModel';
import {IWidgetIndustryViewModel} from '../../../../ViewModel/viewModels/Widgets/WidgetIndustry/interfaces';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import './index.less';

export enum ETableType {
  Table = 'table',
  FullTable = 'fullTable',
  DetailedTable = 'detailedTable',
}

enum ETableName {
  OKVED = 'okved',
  TNVED = 'tnved',
  OKK = 'okk',
}

const WidgetIndustry: FC = observer(() => {
  const [tableId, setTableId] = useState<ETableName>(ETableName.OKVED);
  const [row, setRow] = useState<
    IIndustryDivisionOKKItem | IIndustryDivisionOKVEDItem | undefined
  >();
  const [isModalFullTableOpen, setIsOpenFullTableModal] = useState(false);
  const [isModalDetailedOpen, setIsOpenDetailedModal] = useState(false);

  const {
    okkData,
    okkFullData,
    okkDetailedData,
    okvedData,
    okvedFullData,
    okvedDetailedData,
    loading,
    fullDataLoading,
    detailedDataLoading,
    clearData,
  } = useViewModel<IWidgetIndustryViewModel>(VIEW_MODEL.WidgetIndustry);

  const switcherConfig = [
    {
      title: 'ОКВЭД 2',
      value: ETableName.OKVED,
      selected: tableId === ETableName.OKVED,
      onClick: () => setTableId(ETableName.OKVED),
    },
    {
      title: 'ОКК',
      value: ETableName.OKK,
      selected: tableId === ETableName.OKK,
      onClick: () => setTableId(ETableName.OKK),
    },
  ];

  const onModalClose = (modalType: 'fullTable' | 'detailedTable') => {
    setRow(undefined);
    if (modalType === 'fullTable') {
      setIsOpenFullTableModal(false);
      tableId === 'okved'
        ? clearData('okvedFullData')
        : clearData('okkFullData');
    } else {
      setIsOpenDetailedModal(false);
      tableId === 'okved'
        ? clearData('okvedDetailedData')
        : clearData('okkDetailedData');
    }
  };

  const onRowClick = (
    row: IIndustryDivisionOKKItem | IIndustryDivisionOKVEDItem
  ) => {
    setRow(row);
    setIsOpenDetailedModal(true);
  };

  return (
    <div className="widget-industry">
      <div className="widget-industry__header">
        <Switcher items={switcherConfig} />
      </div>
      <div className="widget-industry__content">
        <div className="industry-table">
          {tableId === ETableName.OKVED ? (
            <OkvedTable
              data={okvedData?.items}
              loading={loading}
              limit={6}
              onRowClick={onRowClick}
              tableType={ETableType.Table}
            />
          ) : (
            <OkkTable
              data={okkData?.items}
              limit={6}
              loading={loading}
              onRowClick={onRowClick}
              tableType={ETableType.Table}
            />
          )}
        </div>
      </div>
      <ModalPage
        isOpen={isModalFullTableOpen}
        header={{
          title: getTableTitle(tableId),
        }}
        onClose={() => onModalClose('fullTable')}
        className="widget-industry__modal"
      >
        {tableId === ETableName.OKVED ? (
          <OkvedTable
            data={okvedFullData?.items}
            limit={okvedData?.total || 0}
            loading={fullDataLoading}
            onRowClick={(row) => {
              setRow(row);
              setIsOpenDetailedModal(true);
            }}
            tableType={ETableType.FullTable}
          />
        ) : (
          <OkkTable
            data={okkFullData?.items}
            limit={okkData?.total}
            loading={fullDataLoading}
            onRowClick={(row) => {
              setRow(row);
              setIsOpenDetailedModal(true);
            }}
            tableType={ETableType.FullTable}
          />
        )}
      </ModalPage>
      <ModalPage
        header={{
          title: getTableTitle(tableId, row),
        }}
        isOpen={isModalDetailedOpen}
        onClose={() => onModalClose('detailedTable')}
        className="widget-industry__modal widget-industry__modal-detailed"
      >
        {tableId === ETableName.OKVED ? (
          <OkvedTable
            id={row?.objectId}
            data={okvedDetailedData?.items}
            loading={detailedDataLoading}
            tableType={ETableType.DetailedTable}
          />
        ) : (
          <OkkTable
            id={row?.objectId}
            data={okkDetailedData?.items}
            loading={detailedDataLoading}
            tableType={ETableType.DetailedTable}
          />
        )}
      </ModalPage>
      <div className="widget-industry__footer">
        <Button
          onClick={() => {
            setIsOpenFullTableModal(true);
          }}
        >{`Все ${getButtonTitle(tableId)}`}</Button>
      </div>
    </div>
  );
});

function getButtonTitle(tableId: ETableName): string {
  switch (tableId) {
    case ETableName.OKVED:
      return 'отрасли';
    case ETableName.TNVED:
      return 'ТН ВЭД';
    case ETableName.OKK:
      return 'OKK';
    default:
      return '';
  }
}

function getTableTitle(
  tableId: ETableName,
  categoryName?: IIndustryDivisionOKKItem | IIndustryDivisionOKVEDItem
): string {
  switch (tableId) {
    case 'okk':
      return categoryName
        ? `${categoryName.code}. ${categoryName.name}`
        : 'Все ОКК';
    case 'okved':
      return categoryName
        ? `${categoryName.code}. ${categoryName.name}`
        : 'Все отрасли';
    default:
      return '';
  }
}

export default WidgetIndustry;
