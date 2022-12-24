import React from 'react';
import {Table} from '../../../Common/TableComponents';
import {EventsTableConfig, MessageTableConfig} from '../Config';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../hooks/useViewModel';
import {ENotificationType} from '../../../../Model/Messages';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IMessagesViewModel} from '../../../../ViewModel/viewModels/Messages/interfaces';

export const MessageTable = observer(({type}: {type: ENotificationType}) => {
  const {list} = useViewModel<IMessagesViewModel>(VIEW_MODEL.Messages);
  return (
    <Table
      data={list}
      config={
        type === ENotificationType.MESSAGE
          ? MessageTableConfig
          : EventsTableConfig
      }
    />
  );
});
