<script setup lang="ts">

const props = defineProps<{
  country: ICountryInfo
}>();

</script>

<template>
  <div v-once class="cursor-pointer p-3 shadow rounded dark:divide-gray-700 dark:bg-gray-800 dark:border-gray-700 border-[1px]" @click.stop.prevent="navigateTo(useCountryLink(props.country))">
    <div class="flex items-center space-x-4">
      <div class="flex-shrink-0">
        <img class="w-14 h-14 rounded-full delay-100 object-cover transition duration-200 border-2 border-gray-300 shadow-xl" loading="lazy" :src="props.country.flags.svg" alt="Neil image">
      </div>
      <div class="flex-1 min-w-0">
        <NuxtLink :to="useCountryLink(props.country)" @click.stop>
          <h3 class="text-sm font-medium text-gray-900 truncate dark:text-white leading-[1.4]">
            {{ props.country.name.common }}
          </h3>
        </NuxtLink>

        <NuxtLink :to="useCountryLink(props.country)" @click.stop>
          <p class="text-[12px] font-normal text-gray-500 truncate dark:text-white leading-[1.4] flex items-center gap-1">
            <Icon size="14px" name="majesticons:badge-check-line" />
            {{ props.country.name.official }}
          </p>
        </NuxtLink>

        <p class="text-sm text-gray-500 truncate dark:text-gray-400 leading-[1.6]">
          <strong> {{ props.country.cca2 }} / {{ props.country.cca3 }} </strong>
        </p>

        <p class="my-0.5 text-sm text-gray-500 truncate dark:text-gray-400 flex flex-wrap gap-2 items-center">
          <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"> {{ props.country.region }}</span>

          <span v-if="country.subregion" class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400"> {{ props.country.subregion }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
