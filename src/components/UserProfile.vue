<template>
  <div v-if="isAuthenticated" ref="userSection" class="user-section">
    <div @click.stop="toggleLogoutMenu" class="user-avatar" :class="{ active: showLogoutMenu }">
      <span class="user-avatar-text">{{ userInitial }}</span>
    </div>
    <button v-if="showLogoutMenu" @click.stop="onLogout" class="logout-button">Log out</button>
  </div>
</template>

<script>
import { useAuth } from '@/shared/mixins/useAuth'
import { useClickOutside } from '@/shared/mixins/useClickOutside'

export default {
  name: 'UserProfile',
  mixins: [useAuth, useClickOutside],
  data() {
    return {
      showLogoutMenu: false,
      clickOutsideConfig: {
        ref: 'userSection',
        stateProperty: 'showLogoutMenu',
      },
    }
  },
  methods: {
    toggleLogoutMenu() {
      this.showLogoutMenu = !this.showLogoutMenu
    },
    onLogout() {
      this.showLogoutMenu = false
      this.handleLogout()
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/shared/styles/variables.scss' as *;
@use '@/shared/styles/mixins.scss' as *;

.user-section {
  position: relative;
  display: inline-block;
  line-height: 0;
}

.user-avatar {
  @include user-avatar;
  cursor: pointer;
  vertical-align: top;
}

.logout-button {
  @include logout-button;
}
</style>
