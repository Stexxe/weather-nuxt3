<script setup lang="ts">

</script>

<template>
  <div class="widget">
    <div class="content">
      <div class="info">
        <div class="date">
          <div class="weekday">Tuesday</div>
          <div class="day">22</div>
        </div>
        <main>
          <h3 class="city">Saint Petersburg</h3>
          <div class="main-data">
            <span class="temp">-9°</span>
            <i class="state icon-weather-snow" title="Snow"/>
          </div>
        </main>
      </div>
      <div class="data">
        <p class="data-item">76<span class="unit">%</span></p>
        <p class="data-item">5 <span class="unit">m/s</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use "~/assets/scss/fonts.scss";

  .widget {
    padding: 24px 16px;
    width: 329px;
    height: 345px;
    border-radius: 21px;
    background: #fff;
  }

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
    line-height: 0.9;
  }

  .temp {
    font-family: "SF Pro Display Thin", sans-serif;
    font-size: 40px;
    color: $main-color;
  }

  .icon-weather-snow {
    width: 38px;
    height: 38px;
    background: url('~/assets/icons/snow.svg') no-repeat;
  }

  .data {
    display: flex;
    flex-direction: column;
  }
  .data-item {
    margin: 0;
    font-family: "SF Pro Display Light", sans-serif;
    color: $main-color;
    font-size: 12px;
    line-height: 125%;
    letter-spacing: 0.04em;
  }

  .unit {
    color: $secondary-color;
  }

  .state {
    margin-right: 18px;
  }
</style>