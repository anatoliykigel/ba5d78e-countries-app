<script setup lang="ts">

const props = defineProps<{
  currencies: ICurrenciesRecords
}>();

</script>

<template>
  <section v-if="Object.keys(props.currencies).length > 0" class="bg-white dark:bg-gray-900 xborder-y py-2">
    <div class="max-w-screen-xl px-4 py-4 mx-auto text-center">
      <h2 class="mb-4 text-2xl text-left font-semibold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
        Currency Rates
      </h2>

      <CurrenciesListItem v-for="item in props.currencies" :key="item.code" :rates-data="item" />
    </div>
  </section>
</template>
