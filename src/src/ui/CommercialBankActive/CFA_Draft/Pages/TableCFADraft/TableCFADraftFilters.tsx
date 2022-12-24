import React from 'react';
import {observer} from 'mobx-react-lite';
import {
  TableFilter,
  TableFilterSelect,
} from '../../../../Common/TableComponents';
import useViewModel from '../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IDictionaryViewModel} from '../../../../../ViewModel/viewModels/Dictionary/interfaces';
import {SelectItemsFromDictionary} from '../../../../Common/FieldControls/FieldControlsBase/SelectFieldControl/SelectItemsFromDictionary';

export const TableCFADraftFilters = observer(() => {
  const {cfaStatuses} = useViewModel<IDictionaryViewModel>(
    VIEW_MODEL.Dictionary
  );
  return (
    <TableFilter searchControl>
      {cfaStatuses ? (
        <TableFilterSelect
          name="dealStatus"
          label="Статусы"
          items={SelectItemsFromDictionary(cfaStatuses, {
            label: 'Все статусы',
            value: undefined,
          })}
        />
      ) : null}
    </TableFilter>
  );
});
