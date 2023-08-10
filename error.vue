<script setup lang="ts">

const props = defineProps<{
  error: any;
}>();

useHead({
  script: [{ children: '(()=>{const e=localStorage.getItem("vueuse-color-scheme")||"",a=window.matchMedia("(prefers-color-scheme: dark)").matches;(!e||e==="auto"?a:e==="dark")&&document.documentElement.classList.add("dark")})();' }]
});

</script>

<template>
  <div class="min-h-screen grid items-center justify-center bg-white dark:bg-slate-900">
    <div class="text-center">
      <h1 class="dark:text-gray-400 font-bold text-4xl">
        Oops, something went wrong
      </h1>
      <h2 class="dark:text-gray-500 font-bold text-2xl mt-4">
        {{ props.error.statusCode }}: {{ props.error.statusMessage }}
      </h2>
      <h3 class="dark:text-gray-600 font-bold text-xl mt-4">
        {{ props.error.message }}
      </h3>

      <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-xl mt-4 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" @click="clearError({ redirect: '/' })">
        Go Homepage
      </button>
    </div>
  </div>
</template>
