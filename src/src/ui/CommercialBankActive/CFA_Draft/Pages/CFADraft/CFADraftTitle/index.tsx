import React from 'react';
import {Skeleton} from '@material-ui/lab';
import './index.less';

export interface ICFADetailsManualTitleProps {
  loading: boolean;
  create: boolean;
  edit: boolean;
  finished: boolean;
  canceled: boolean;
}

export const CFADraftTitle = (props: ICFADetailsManualTitleProps) => {
  const {loading, create, edit, finished, canceled} = props;
  return loading ? (
    <Skeleton width={100} />
  ) : (
    <div className="cfa-draft-title">
      {create && 'Создание сделки'}
      {edit && 'Редактирование'}
      {finished && 'Исполнен'}
      {canceled && 'Отменен'}
    </div>
  );
};
