<script setup lang="ts">

import { useCountriesStore } from '~/stores/countries';

import { useRatesStore } from '~/stores/rates';

import { useNumbersFormatter } from '~/composables/useNumbersFormatter';

const store = useCountriesStore();

const ratesStore = useRatesStore();

const { cca3 } = useRoute().params;

const code = cca3.toString().split('-')[0];

const country = await store.getCountryByCca3Code(code);

if (!country) throw createError({ statusCode: 404, statusMessage: 'Page Not Found', message: `No Country By Code [ ${code} ] Found`, fatal: true });

const currenciesCodesList = country.currencies ? Object.keys(country.currencies) : [];

const currenciesRatesList = ratesStore.getRatesByCodes(currenciesCodesList);

const getGoogleMapsLink = computed(() => `https://maps.google.com/maps?width=700&height=440&hl=en&q=${country?.latlng?.[0]},${country?.latlng?.[1]}&ie=UTF8&t=&z=${country.area > 100_000 ? 6 : 10}&iwloc=B&output=embed`);

const googleMapCapitalLink = computed(() => `https://www.google.com/maps/@${country.capitalInfo?.latlng?.[0]},${country.capitalInfo?.latlng?.[1]},14z?dir_action=navigate`);

const currencyCode = Object.keys((country ?? {}).currencies ?? {})?.join(', ');

const neighbours = store.getNeighboringСountries(country.borders);

useHead({
  title: `${country.name.common} | Countries App`,
  meta: [
    { name: 'description', content: `Detailed information about ${country.name.official}` }
  ]
});

</script>

<template>
  <div>
    <section class="bg-white dark:bg-slate-800 rounded-xl py-4 lg:py-8">
      <div class="px-4 mx-auto max-w-screen-xl  grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div class="flex flex-col justify-center">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white ">
            <img
              :src="country?.flags.png"
              class="inline w-[75px] min-h-[50px] hover:scale-110 transition duration-200 delay-100 shadow rounded relative top-[-4px] opcaity-1 border shadow-xl"
              loading="lazy"
              alt=""
            >
            {{ country.name.common }}
          </h1>
          <p class="mb-4 text-lg font-semibold italic text-gray-500 lg:text-3xl dark:text-gray-400 flex flex-wrap gap-2 items-center">
            <span class="">{{ country.name.official }}</span>

            <span v-for="lang in country.languages" :key="lang" class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300 inline-flex gap-1 items-center">
              <Icon size="16px" name="ic:baseline-translate" />
              {{ lang }}
            </span>
          </p>
          <p class="mb-4 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 flex gap-2 items-start flex-wrap">
            <span v-if="country.independent" class="bg-purple-100 text-purple-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400 flex items-center gap-1">
              <Icon name="mdi:flag-variant" /> Independent</span>

            <span v-if="country.unMember" class="bg-blue-100 text-blue-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 flex items-center gap-1">
              <Icon size="14px" name="solar:global-bold" />

              UN Member
            </span>

            <span class="text-base font-medium mr-2 px-2.5 py-0.5 rounded flex gap-1 items-center bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border border-green-400">  <Icon name="ph:map-pin-line" />  {{ country.region }} <span v-if="country.subregion">/</span>  {{ country.subregion }}</span>

            <span v-if="country.landlocked" class="bg-blue-100 text-blue-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 flex items-center gap-1">
              <Icon size="18px" name="ic:outline-directions-boat-filled" />
              Landlocked
            </span>
          </p>

          <p class="mb-4 text-sm font-normal text-gray-500 lg:text-sm dark:text-gray-400">
            <span v-for="(spelling, i) in country.altSpellings" :key="i" title="Alternate Spelling" class="cursor-help bg-gray-100 border text-gray-800 text-md font-medium mr-2 my-1 inline-block px-2.5 py-0.5 rounded dark:bg-gray-900 dark:text-gray-300 hover:bg-yellow-100 hover:text-yellow-800 hover:dark:bg-yellow-900 hover:dark:text-yellow-300 inline-flex gap-1 items-center">
              {{ spelling }}
            </span>

            <span v-for="(translation, key) in country.translations" :key="key" title="Spelling Translations" class="cursor-help bg-gray-100 border text-gray-800 text-md font-medium mr-2 my-1 inline-block px-2.5 py-0.5 rounded dark:bg-gray-900 dark:text-gray-300 hover:bg-yellow-100 hover:text-yellow-800 hover:dark:bg-yellow-900 hover:dark:text-yellow-300"><b>{{ (key as string).toUpperCase() }}:</b> {{ translation.official }}</span>
          </p>

          <div v-if="country.capital" class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <a :href="googleMapCapitalLink" target="_blank" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Capital is {{ country.capital.join(', ') }}
              <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <iframe class="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl" title="Google Maps" :src="getGoogleMapsLink" frameborder="0" allow="accelerometer;" />
        </div>
      </div>
    </section>

    <section class="bg-white mt-8 dark:bg-slate-800 rounded-xl py-4">
      <div class="max-w-screen-xl px-4 py-4 mx-auto text-center lg:py-4 lg:px-6">
        <dl class="grid max-w-screen-md gap-2 sm:gap-8 mx-auto text-gray-900 grid-cols-2 sm:grid-cols-4 dark:text-white">
          <div class="flex flex-col items-center justify-center border sm:border-none rounded-md py-3 sm:py-0">
            <dt class="mb-2 text-2xl md:text-3xl font-extrabold">
              ~{{ useNumbersFormatter(country.population) }}
            </dt>
            <dd class="text-xl sm:text-2xl font-normal text-gray-500 dark:text-gray-400">
              Population
            </dd>
          </div>
          <div class="flex flex-col items-center justify-cente border sm:border-none rounded-md py-3 sm:py-0">
            <dt class="mb-2 text-2xl md:text-3xl font-extrabold">
              ~{{ useNumbersFormatter(country.area) }} km²
            </dt>
            <dd class="text-xl sm:text-2xl font-normal text-gray-500 dark:text-gray-400">
              Area
            </dd>
          </div>
          <div class="flex flex-col items-center justify-center border sm:border-none rounded-md py-3 sm:py-0">
            <dt class="mb-2 text-2xl md:text-3xl font-extrabold uppercase">
              {{ currencyCode }}
            </dt>
            <dd class="text-xl sm:text-2xl font-normal text-gray-500 dark:text-gray-400">
              Currency
            </dd>
          </div>
          <div class="flex flex-col items-center justify-center border sm:border-none rounded-md py-3 sm:py-0">
            <dt class="mb-2 text-2xl md:text-3xl font-extrabold uppercase">
              {{ country.tld?.[0] }}
            </dt>
            <dd class="text-xl sm:text-2xl font-normal text-gray-500 dark:text-gray-400">
              TL Domain
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <CurrenciesList class="bg-white mt-8 dark:bg-slate-800 rounded-xl py-4" :currencies="currenciesRatesList" />

    <div v-if="neighbours.length" class="flow-root mt-8">
      <h2 class="px-4 mb-4 text-2xl font-semibold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
        Borders
      </h2>
      <CountriesList :countries="neighbours" />
    </div>
  </div>
</template>
