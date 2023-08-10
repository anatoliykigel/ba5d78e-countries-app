export const useRatesStore = defineStore('rates', () => {
  const ratesList:ICurrenciesRecords = {};

  const fetchRatesByCode = async (code:string):Promise<void> => {
    const { data } = await useFetch<ICurrencyExchangeRates>(`http://www.floatrates.com/daily/${code.toLowerCase()}.json`);

    if (data) Object.assign(ratesList[code].rates, data.value);
  };

  const getRatesByCode = (code:string):ICurrencyRecord => {
    if (!ratesList[code]) {
      ratesList[code] = reactive({ code, rates: {} });

      fetchRatesByCode(code);
    }
    return ratesList[code];
  };

  const getRatesByCodes = (codes:string[]):any => {
    return codes.map(code => getRatesByCode(code));
  };

  return {
    getRatesByCodes
  };
});
