export const useCountryLink = (country:ICountryInfo):string => `/country/${country.cca3.toLowerCase()}-${country.name.common.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '')}`;
