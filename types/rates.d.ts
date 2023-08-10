interface ICurrencyExchangeRates {
    [propName: string]: {
        code: string,
        name: string,
        rate: number
    }
}

interface ICurrencyRecord {
    code: string,
    rates: ICurrencyExchangeRates;
}

interface ICurrenciesRecords {
    [propName: string]: ICurrencyRecord
}
