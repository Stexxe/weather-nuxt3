<script setup lang="ts">

const props = defineProps({
  loading: Boolean,
  errorCode: Number,
  city: String
})
</script>

<template>
  <div class="status">
    <span v-if="props.loading">Loading weather data...</span>
    <span v-else-if="props.errorCode == 400" class="error">Invalid request to the server.</span>
    <span v-else-if="props.errorCode == 404" class="error">City {{ props.city }} not found.</span>
    <span v-else-if="props.errorCode == 429" class="error">Too many request to the server. Try again later.</span>
    <span v-else-if="props.errorCode == 500" class="error">Server error. Please contact the support team.</span>
    <span v-else-if="props.errorCode == 503" class="error">Service temporarily unavailable. Try again later.</span>
  </div>
</template>

<style scoped lang="scss">
.status {
  font-family: "SF Pro Display Thin", sans-serif;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;

  .error {
    color: $error;
  }
}
</style>