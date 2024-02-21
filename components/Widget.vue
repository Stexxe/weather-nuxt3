<script setup lang="ts">
  const city = ref("Limassol");
  const geoUrl = computed(() =>`/api/geo?q=${city.value}`)
  const geoResponse = await useFetch(geoUrl, {watch: [geoUrl]})
  const geo = computed(() => geoResponse.data.value)
  const forecastUrl = computed(() => `/api/forecast?lat=${geo.value?.lat}&lon=${geo.value?.lon}`)
  const forecastResponse = await useFetch(forecastUrl, {watch: [forecastUrl]})
  const data = computed(() => forecastResponse.data.value)
  const loading = computed(() => geoResponse.pending.value || forecastResponse.pending.value)
  const hasErrors = computed(() => geoResponse.error.value || forecastResponse.error.value)
  const errorCode = computed(() => hasErrors.value ? geoResponse.error.value?.statusCode || forecastResponse.error.value?.statusCode : null)

  function onCityChanged(c: string) {
    city.value = c
  }
</script>

<template>
  <div class="widget">
    <div class="main">
      <CurrentWeather :city="city" :weather="data && data.current" @city-edited="onCityChanged"/>
      <Forecast v-if="data" :forecast="data.forecast"/>
    </div>
    <Status :loading="loading" :error-code="hasErrors && errorCode" :city="city"/>
  </div>
</template>

<style scoped lang="scss">
  .widget {
    @include column();
    white-space:nowrap;
    padding: 24px 16px;
    width: 329px;
    height: 250px;
    border-radius: 21px;
    background: #fff;
    justify-content: space-between;
  }

  .main {
    @include column()
  }
</style>