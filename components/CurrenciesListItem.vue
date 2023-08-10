<script setup lang="ts">

const props = defineProps<{
  ratesData: ICurrencyRecord
}>();

const isFilled = computed(() => !!Object.keys(props.ratesData.rates).length);

const sum = ref<number>(100);

const displaySum = computed(():string => `${sum.value.toFixed(2)} ${props.ratesData.code}`);

const selectedCurrencyCode = ref<string>(props!.ratesData.code === 'USD' ? 'EUR' : 'USD');

const selectedCurrencyRate = computed(() => props.ratesData.rates[selectedCurrencyCode.value?.toLowerCase()]?.rate);

const exchangeResult = computed(() => `${(sum.value * selectedCurrencyRate.value).toFixed(2)} ${selectedCurrencyCode.value}`);

const useContinuousProcess = (fn: () => void, interval = 50) => {
  let intertvalId:any;

  return {
    start () {
      intertvalId = setInterval(fn, interval);
    },
    stop () {
      clearInterval(intertvalId);
    }
  };
};

const incProcess = useContinuousProcess(() => sum.value++);
const decProcess = useContinuousProcess(() => sum.value > 0 ? sum.value-- : null);

</script>

<template>
  <div>
    <div v-if="isFilled" class="border-2 p-2 mb-8 rounded-xl flex flex-col md:flex-row gap-2 sm:gap-8 items-center text-xl lg:text-2xl justify-start my-2">
      <div class="flex w-full gap-2">
        <button
          type="button"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xl lg:text-2xl px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          @mousedown="decProcess.start"
          @mouseup="decProcess.stop"
          @touchstart="decProcess.start"
          @touchend="decProcess.stop"
        >
          <Icon name="ic:baseline-minus" />
        </button>
        <input v-model="displaySum" disabled type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-xl lg:text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center font-bold" min="0">
        <button
          ref="incSumBtn"
          type="button"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xl lg:text-2xl px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          @mousedown="incProcess.start"
          @mouseup="incProcess.stop"
          @touchstart="incProcess.start"
          @touchend="incProcess.stop"
        >
          <Icon name="ic:baseline-plus" />
        </button>
      </div>

      <span><Icon size="32px" class="dark:text-gray-400" name="ic:baseline-currency-exchange" /></span>

      <select v-model="selectedCurrencyCode" class="block w-full px-4 py-3 text-xl lg:text-2xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 font-bold focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option v-for="(cc, i) in ratesData.rates" :key="cc.code" :selected="i === 0" :value="cc.code">
          {{ cc.name }}
        </option>
      </select>

      <span class="hidden lg:block"><Icon size="32px" class="dark:text-gray-400" name="ic:baseline-arrow-forward" /></span>
      <span class="lg:hidden"><Icon size="32px" class="dark:text-gray-400" name="ic:round-keyboard-double-arrow-down" /></span>

      <input v-model="exchangeResult" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-xl lg:text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 font-bold block text-center w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
  </div>
</template>
