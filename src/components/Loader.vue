<template>
  <div class="loader">
    <LoaderIcon class="loader-icon" />
  </div>
</template>

<script>
import LoaderIcon from '@/shared/assets/icons/loader.vue'

export default {
  name: 'Loader',
  components: {
    LoaderIcon,
  },
}
</script>

<style lang="scss" scoped>
@use '@/shared/styles/variables.scss' as *;

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: $spacing-xxl;
}

.loader-icon {
  width: $loader-icon-width;
  height: $loader-icon-height;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
