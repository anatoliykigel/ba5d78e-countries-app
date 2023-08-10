<script setup lang="ts">

import { useCountriesStore } from '../stores/countries';

const store = useCountriesStore();

useHead({
  title: 'Countries App',
  meta: [
    { name: 'description', content: 'Detailed information about all countries of the world' }
  ]
});

</script>

<template>
  <div>
    <div class="relative w-full my-4">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input
        id="default-search"
        v-model="store.searchFilter"
        type="search"
        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        required
      >
      <button v-show="store.searchFilter.length" type="submit" class="absolute right-2.5 bottom-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" @click="store.searchFilter = ''">
        <Icon size="24px" name="mdi:delete-forever-outline" />
      </button>
    </div>

    <CountriesList :countries="store.filtredCountriesInfoList" />
  </div>
</template>

<style scoped>
    .scroller {
        height: 100%;
        border: 1px solid red;
    }
</style>
