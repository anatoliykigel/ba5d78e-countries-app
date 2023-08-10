interface ICountryInfo {
    name: {
        common: string,
        official: string
    },
    flags: {
        png: string,
        svg: string,
        alt: string,
    },
    cca2: string,
    cca3: string,
    region: string,
    subregion?: string
}

interface ICountryDetailsInfo extends ICountryInfo {
    tld: string[],
    independent: boolean,
    unMember: boolean
    currencies: {
        [propName: string]: {
            name: string,
            symbol: string
        }
    },
    capital: string[],
    altSpellings: string[],
    translations: {
        [propName: string]: {
            official: string,
            common: string
        }
    },
    latlng: [number, number],
    borders?: string[],
    area: number,
    maps: {
        googleMaps: string,
        googleMaps: string
    },
    population: number,
    continents: string
    timezones: string[],
    coatOfArms: {
        png: string,
        svg: string
    },
    capitalInfo: {
        latlng: [number, number]
    },
    landlocked:boolean,
    languages: {
        [propName: string]: string
    }
}

interface ICountriesDetailsInfoStorage {
    [propName: string]: ICountryDetailsInfo
}