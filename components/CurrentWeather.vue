<script setup lang="ts">
  const props = defineProps({
    city: String,
    weather: Object
  })

  const emit = defineEmits(['cityEdited'])

  const weekday = computed(() => {
    return new Date(props.weather?.dt * 1000).toLocaleDateString(undefined, {weekday: 'long'})
  })

  const day = computed(() => {
    return new Date(props.weather?.dt * 1000).toLocaleDateString(undefined, {day: 'numeric'})
  })

  function onLoseFocus(e: FocusEvent) {
    emit('cityEdited', (e.target as HTMLElement).textContent)
  }

  function onPressEnter(e: InputEvent) {
    e.preventDefault();
    (e.target as HTMLElement).blur()
  }
</script>

<template>
  <div class="content">
    <div class="info">
      <div class="date">
        <div class="weekday" v-if="props.weather">{{ weekday }}</div>
        <div class="day" v-if="props.weather">{{ day }}</div>
      </div>
      <main>
        <h3 class="city" spellcheck="false" @blur="onLoseFocus" @keydown.enter="onPressEnter" contenteditable="true">{{ props.city }}</h3>
        <div class="main-data">
          <span class="temp" v-if="props.weather">{{ props.weather?.temp.toFixed(0) }}°</span>
          <i :class="`icon-big icon-weather-${props.weather?.weather.toLowerCase()}`" v-if="props.weather" :title="props.weather?.weather"/>
        </div>
      </main>
    </div>
    <div class="data">
      <p class="data-item" v-if="props.weather">{{ props.weather?.humidity }}<span class="unit">%</span></p>
      <p class="data-item" v-if="props.weather">{{ props.weather?.wind }} <span class="unit">m/s</span></p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use "~/assets/scss/fonts.scss";

  .content {
    @include row();
    justify-content: space-between;
  }

  .info {
    @include row();
  }

  main {
    @include column();
  }

  .main-data {
    @include row();
  }

  .date {
    @include column();
    justify-content: space-between;
    align-items: center;
    margin: 2px 20px 0 0;
  }

  .weekday {
    font-family: "SF Pro Text", sans-serif;
    font-size: 10px;
    color: #EE5C51;
  }

  .day {
    position: relative;
    font-family: "SF Pro Display Thin", sans-serif;
    font-size: 42px;
    color: #000;
  }

  .day:after {
    position: absolute;
    right: -9px;
    top: 11px;
    content: "";
    width: 1px;
    height: 60%;
    background: rgba(154, 204, 255, 0.5);
  }

  .city {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    color: $main-color;
    border: 1px solid $secondary-color;
    outline: none;
    white-space: nowrap;
  }

  .temp {
    font-family: "SF Pro Display Thin", sans-serif;
    font-size: 40px;
    color: $main-color;
  }

  .data {
    @include column();
  }
  .data-item {
    margin: 0;
    font-family: "SF Pro Display Light", sans-serif;
    color: $main-color;
    font-size: 12px;
    line-height: 125%;
    letter-spacing: 0.04em;
    justify-content: right;
    display: flex;
  }

  .unit {
    color: $secondary-color;
  }
</style>