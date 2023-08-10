<script setup lang="ts">

import { useCountriesStore } from '~/stores/countries';

await useCountriesStore().fetchCountriesInfoList();

useHead({
  script: [{ children: '(()=>{const e=localStorage.getItem("vueuse-color-scheme")||"",a=window.matchMedia("(prefers-color-scheme: dark)").matches;(!e||e==="auto"?a:e==="dark")&&document.documentElement.classList.add("dark")})();' }]
});

</script>

<template>
  <NuxtLayout class="bg-white dark:bg-slate-900">
    <div>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.25s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
