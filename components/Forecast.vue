<script setup lang="ts">
const props = defineProps({
  forecast: Array
})
</script>

<template>
  <ul class="forecast-list">
    <li v-for="f in props.forecast">
      <DayForecast :weather="f"/>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .forecast-list {
    margin: 15px 0 0 0;
    padding: 0;
    list-style: none;
  }
</style>