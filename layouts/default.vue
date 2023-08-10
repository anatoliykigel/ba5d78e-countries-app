<script setup lang="ts">

import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useDebounceFn(useToggle(isDark), 50);

</script>

<template>
  <div>
    <div class="container px-2 lg:px-0 min-h-screen flex flex-col">
      <header class="py-2 pr-2 dark:text-gray-400 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-[100] shadow-slate-400">
        <h2 class="text-2xl sm:text-4xl p-2 font-bold">
          <NuxtLink to="/">
            <Icon name="ph:globe-stand-bold" />
            Countries App
          </NuxtLink>
        </h2>

        <button type="button" class="py-2.5 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" @click="toggleDark()">
          <Icon v-if="isDark" size="22px" class="cursor-pointer" name="ic:round-nights-stay" />
          <Icon v-else size="22px" class="cursor-pointer" name="ic:outline-wb-sunny" />
        </button>

        <!-- <div>

          <button @click="toggleDark()">
            <i inline-block align-middle i="dark:carbon-moon carbon-sun" />

          </button>

          <Icon size="22px" class="cursor-pointer" name="ic:round-nights-stay" @click="toggleDark()" />
        <Icon size="22px" class="cursor-pointer" name="ic:outline-wb-sunny" @click="toggleDark()" />
      </div> -->

        <!-- <div class="flex items-center gap-2">
          <Icon size="22px" class="cursor-pointer" name="ic:round-nights-stay" @click="debouncedToggleDark()" />

          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" :checked="!isDark" @click="debouncedToggleDark()">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
          </label>
          <Icon size="22px" class="cursor-pointer" name="ic:outline-wb-sunny" @click="debouncedToggleDark()" />
        </div> -->
      </header>

      <main class="grow">
        <slot />
      </main>

      <footer class="dark:text-gray-400 pt-8">
        <h3 class="text-center text-2xl font-bold pt-2">
          Countries App &copy; {{ (new Date()).getFullYear() }}
        </h3>
        <h5 class="text-sm sm:text-lg text-center pb-3">
          Made with <a target="_blank" class="font-bold underline" href="https://restcountries.com/">restcountries.com</a> &amp; <a target="_blank" class="font-bold underline" href="https://www.floatrates.com/">floatrates.com</a>
        </h5>
      </footer>
    </div>
  </div>
</template>
