import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {CountryTable} from './Tables/CountryTable';
import {Button} from '../../../Common/SimpleComponents/Button';
import {ModalPage} from '../../../Common/SimpleComponents/ModalPage';
import {CountryFullTable} from './Tables/CountryFullTable';
import useViewModel from '../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IWidgetCountriesViewModel} from '../../../../ViewModel/viewModels/Widgets/WidgetCountries/interfaces';
import {Search} from './Search';
import {useFilters} from '../../../hooks/useFilters';
import useUpdateEffect from '../../../hooks/useUpdateEffect';
import {IWidgetCountriesDTO} from '../../../../Model/Widgets/WidgetCountries';
import './index.less';

const WidgetCountries = observer(() => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {
    countryList,
    countryFullList,
    getCountryList,
    getFullCountryList,
    setFullCountryList,
    loading,
    loadingFullList,
  } = useViewModel<IWidgetCountriesViewModel>(VIEW_MODEL.WidgetCountries);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('asc(country)');
  const {filters, subscribeOnFilters} = useFilters();

  useEffect(() => {
    subscribeOnFilters((newFilters) => {
      getCountryList({
        limit: 6,
        offset: 0,
        query: searchQuery,
        sortBy: sortBy,
        ...newFilters,
      });
    });

    getCountryList({
      limit: 6,
      offset: 0,
      sortBy: sortBy,
      ...filters,
    });
    // eslint-disable-next-line
  }, []);

  useUpdateEffect(() => {
    getCountryList({
      limit: 6,
      offset: 0,
      query: searchQuery,
      sortBy: sortBy,
      ...filters,
    });
  }, [searchQuery, sortBy]);

  const onSorting = (
    _: IWidgetCountriesDTO[],
    columnName?: string,
    direction?: string
  ) => {
    const sortFnStr = `${direction?.toLowerCase()}(${columnName as string})`;

    setSortBy(sortFnStr);
  };

  useEffect(() => {
    if (
      isOpenModal &&
      countryFullList.items.length === 0 &&
      countryFullList.total === 0
    ) {
      getFullCountryList({
        limit: countryList.total,
        offset: 0,
        sortBy: sortBy,
        ...filters,
      });
    }
    // eslint-disable-next-line
  }, [isOpenModal]);

  return (
    <div className="widget-countries">
      <div className="widget-countries__search">
        <Search onSearch={(searchStr) => setSearchQuery(searchStr)} />
      </div>
      <div className="widget-countries__table">
        <CountryTable
          loading={loading}
          data={countryList.items}
          onSorting={onSorting}
        />
      </div>
      <div className="widget-countries__footer">
        <Button
          onClick={() => setIsOpenModal(true)}
          disabled={countryList.total === 0 || countryList.items.length === 0}
        >
          Все страны
        </Button>
      </div>
      <ModalPage
        header={{title: 'Страна поставки экспорта'}}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        className="widget-countries__modal"
      >
        <CountryFullTable
          loading={loadingFullList}
          data={countryFullList.items}
          onSorting={(sortedData) => {
            setFullCountryList({items: sortedData, total: sortedData.length});
          }}
        />
      </ModalPage>
    </div>
  );
});

export default WidgetCountries;
