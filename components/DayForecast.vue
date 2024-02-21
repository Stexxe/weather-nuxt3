<script setup lang="ts">
const props = defineProps({
  weather: Object
})

const weekday = computed(() => {
  return new Date(props.weather?.dt * 1000).toLocaleDateString(undefined, {weekday: 'long'})
})

const dayMonth = computed(() => {
  const date = new Date(props.weather?.dt * 1000)
  return `${date.getUTCDate()}.${(date.getMonth() + 1).toString().padStart(2, '0')}`
})
</script>

<template>
  <div class="forecast-row">
    <div class="day">
      <span class="day-month">{{ dayMonth }}</span>
      <span class="weekday">{{ weekday }}</span>
    </div>

    <i :class="`icon-medium icon-weather-${props.weather?.weather.toLowerCase()}`" :title="props.weather?.weather"/>

    <div class="temp">{{ props.weather.temp.toFixed(0) }}°</div>
  </div>


</template>

<style scoped lang="scss">
  .forecast-row {
    @include row();
    justify-content: space-between;
    align-items: center;
  }

  .day {
    font-size: 14px;
    font-family: "SF Pro Display Thin", sans-serif;
    width: 120px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .day-month {
    margin-right: 8px;
    color: $secondary-color;
  }

  .weekday {
    color: $main-color;
  }

  .temp {
    font-family: "SF Pro Text", sans-serif;
    font-size: 13px;
    color: $main-color;
  }
</style>