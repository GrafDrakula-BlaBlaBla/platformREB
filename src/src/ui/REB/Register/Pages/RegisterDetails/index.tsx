import React from 'react';
import {observer} from 'mobx-react-lite';
import {PageLayout} from '../../../../Common/PageLayout';
import {CreditsTable} from '../../../../Components/CreditsTable';
import useViewModel from '../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {Button} from '../../../../Common/SimpleComponents/Button';
import {InfoBlock} from '../../../../Common/SimpleComponents/InfoBlock';
import {FilesExportBlock} from '../../../../Common/SimpleComponents/FilesExportBlock';
import {StatusWrapper} from '../../../../Common/SimpleComponents/StatusWrapper';
import {EStatusCodes} from '../../../../../Model/Status';
import {IRegistriesViewModel} from '../../../../../ViewModel/viewModels/Registries/interfaces';
import {IRegistriesDTO} from '../../../../../Model/Registries';

/**
 * Моковый конфиг.
 */
const getInfoBlockConfig = (registry?: IRegistriesDTO) => [
  {
    label: 'Статус',
    value: <StatusWrapper status={registry?.status} />,
  },
  {label: '№', value: registry?.objectId},
  {label: 'Дата', value: registry?.createDate},
  {label: 'Кол-во кредитов', value: registry?.loanCount},
  {label: 'Объём фондирования, RUB', value: registry?.loanAmount},
  {label: 'Запрашиваемая выборка, RUB', value: registry?.loanIssuedAmount},
];

/**
 * Детальная страница Реестра.
 */
export const RegisterDetails = observer(() => {
  const {
    registry,
    loading,
    acceptRegistry,
    rejectRegistry,
    downloadRegistry,
  } = useViewModel<IRegistriesViewModel>(VIEW_MODEL.Registries);

  const handleAccept = () => {
    if (registry?.objectId) {
      acceptRegistry(registry.objectId);
    }
  };

  const handleReject = () => {
    if (registry?.objectId) {
      rejectRegistry(registry.objectId);
    }
  };

  const renderHeaderButtonGroup = () => {
    if (registry?.status === EStatusCodes.ON_CONSIDERATION) {
      return [
        {
          children: 'Принять',
          onClick: handleAccept,
        },
      ];
    }
  };

  const renderFooter = () => {
    if (registry?.status === EStatusCodes.ON_CONSIDERATION) {
      return (
        <div>
          <Button className="margin-right-2" whiteTheme onClick={handleReject}>
            Отклонить
          </Button>
          <Button onClick={handleAccept}>Принять</Button>
        </div>
      );
    }
  };

  return (
    <PageLayout
      buttonGroupConfig={renderHeaderButtonGroup()}
      footer={{
        buttonsGroup: renderFooter(),
      }}
      loading={loading}
      title="Реестр"
    >
      <h1>1. Сведения о реестре</h1>
      <div className="d-flex">
        <InfoBlock className="flex-1" data={getInfoBlockConfig(registry)} />
        {registry?.objectId && (
          <FilesExportBlock
            id={registry.objectId}
            data={[
              {label: 'Скачать реестр', excel: downloadRegistry},
              {
                label: 'Скачать заявление на выборку',
                excel: () => {},
              },
            ]}
          />
        )}
      </div>

      {registry?.credits ? (
        <>
          <h1 className="margin-bottom-4">2. Кредиты в реестре</h1>
          <CreditsTable creditsData={registry?.credits} />
        </>
      ) : null}
    </PageLayout>
  );
});
