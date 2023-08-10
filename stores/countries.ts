export const useCountriesStore = defineStore('countries', () => {
  let _countriesInfoList:ICountryInfo[] = [];

  const fetchCountriesInfoList = async () => {
    if (!_countriesInfoList.length) {
      const { data } = await useFetch<ICountryInfo[]>('https://restcountries.com/v3.1/all?fields=name,flags,cca2,cca3,region,subregion');

      _countriesInfoList = data.value ?? [];
    }

    return _countriesInfoList;
  };

  const searchFilter = ref<string>('');

  const _searchFilter = refDebounced(searchFilter, 350);

  const filtredCountriesInfoList = computed(() => {
    const search = _searchFilter.value.trim().toLowerCase();
    return _countriesInfoList
      .filter((country) => {
        const countryTexts = [country.cca2, country.cca3, country.name.common, country.name.official].join('-').toLowerCase();
        return countryTexts.includes(search);
      });
  });

  const getNeighboringСountries = (list:string[] | undefined | null):ICountryInfo[] => list ? _countriesInfoList.filter(country => list.includes(country.cca3)) : [];

  const countriesFullDataStorage:ICountriesDetailsInfoStorage = {};

  const getCountryByCca3Code = async (code:string):Promise<ICountryDetailsInfo> => {
    code = code.toLowerCase().replace(/[^a-z]+/g, '');

    if (!countriesFullDataStorage[code]) {
      const { data } = await useFetch<ICountryDetailsInfo[]>(`https://restcountries.com/v3.1/alpha/${code}`);

      if (data && data.value) countriesFullDataStorage[code] = data?.value?.[0];
    }

    return countriesFullDataStorage[code];
  };

  return {
    searchFilter,
    getCountryByCca3Code,
    getNeighboringСountries,
    fetchCountriesInfoList,
    filtredCountriesInfoList
  };
});
