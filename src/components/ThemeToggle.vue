<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :class="{ 'dark-theme': currentTheme === 'dark' }"
  >
    <span class="toggle-slider"></span>
    <Sun class="icon-sun" />
    <Moon class="icon-moon" />
  </button>
</template>

<script>
import { useTheme } from '@/shared/mixins/useTheme'
import Moon from '@/shared/assets/icons/moon.vue'
import Sun from '@/shared/assets/icons/sun.vue'

export default {
  name: 'ThemeToggle',
  components: {
    Moon,
    Sun,
  },
  mixins: [useTheme],
}
</script>

<style lang="scss" scoped>
@use '@/shared/styles/variables.scss' as *;
@use '@/shared/styles/mixins.scss' as *;

.theme-toggle {
  @include theme-toggle;
}

.icon-moon {
  color: $theme-icon-moon-color;
}

.icon-sun {
  color: $theme-icon-sun-color;
}
</style>
