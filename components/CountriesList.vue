<script setup lang="ts">

const props = defineProps<{
  countries: ICountryInfo[]
}>();

</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-2 mb-3 items-stretch">
    <CountriesListItem v-for="country in props.countries" :key="country.cca3" :country="country" />
  </div>
</template>
