<template>
  <header class="app-header">
    <div class="header-content">
      <div class="header-left">
        <Logo class="logo-img" />
      </div>
      <div class="header-right">
        <ThemeToggle />
        <UserProfile />
      </div>
    </div>
  </header>
</template>

<script>
import ThemeToggle from './ThemeToggle.vue'
import UserProfile from './UserProfile.vue'
import Logo from '@/shared/assets/icons/logo.vue'

export default {
  name: 'Header',
  components: {
    ThemeToggle,
    UserProfile,
    Logo,
  },
}
</script>

<style lang="scss" scoped>
@use '@/shared/styles/variables.scss' as *;
@use '@/shared/styles/mixins.scss' as *;

.app-header {
  height: $header-height;
  background-color: var(--header-bg);
  position: sticky;
  top: 0;
  z-index: $header-z-index;
  transition: background-color $transition-base;
}

.header-content {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include header-content-padding;
  position: relative;
}

.header-left {
  .logo-img {
    color: $app-primary-color;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: $spacing-md-lg;
}
</style>
