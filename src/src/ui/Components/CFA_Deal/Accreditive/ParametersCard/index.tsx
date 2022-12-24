import React from 'react';
import {Button} from '../../../../Common/SimpleComponents/Button';
import {NoData} from '../../../../Common/SimpleComponents/NoData';
import {ParametersCardSkeleton} from '../ParametersCardSkeleton';
import {ReactComponent as DocPageIcon} from '../../../../../assets/svg/commonArea/DocPage.svg';
import {LoaderWithBackdrop} from '../../../../Common/SimpleComponents/LoaderWithBackdrop';
import './index.less';

interface IParametersCardProps {
  noDataMessage: string;
  loading?: boolean;
  loaded?: boolean;
  formProvider?: JSX.Element;
  isEditCard?: boolean;
  isForm?: boolean;
  canEdit?: boolean;
  canCreate?: boolean;
  onCreate?: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}

export const ParametersCard = (props: IParametersCardProps) => {
  const {
    noDataMessage,
    loading,
    loaded,
    isEditCard /** true - форма на редактирование, false - форма на просмотр **/,
    isForm /** true - отображаем форму, false - отображаем noDataMessage **/,
    formProvider,
    canEdit,
    canCreate,
    onCreate,
    onEdit,
    onCancel,
    onSave,
  } = props;

  return (
    <div className="parameters-card">
      {!loaded && loading ? (
        <ParametersCardSkeleton />
      ) : isForm ? (
        <React.Fragment>
          <LoaderWithBackdrop loading={loading} />
          {formProvider}
          {canEdit ? (
            isEditCard ? (
              <div className="parameters-card__footer">
                <Button
                  variant="contained"
                  color="blue"
                  size="medium"
                  onClick={onSave}
                >
                  Сохранить
                </Button>
                <Button
                  variant="outlined"
                  color="red"
                  size="medium"
                  onClick={onCancel}
                >
                  Отмена
                </Button>
              </div>
            ) : (
              <div className="parameters-card__footer">
                <Button variant="outlined" color="default" onClick={onEdit}>
                  Редактировать
                </Button>
              </div>
            )
          ) : null}
        </React.Fragment>
      ) : (
        <div className="parameters-card__center">
          <NoData
            icon={<DocPageIcon />}
            message={noDataMessage}
            reloadButton={
              canCreate ? (
                <Button
                  children="Внести данные"
                  variant="contained"
                  color="blue"
                  onClick={onCreate}
                />
              ) : undefined
            }
          />
        </div>
      )}
    </div>
  );
};
