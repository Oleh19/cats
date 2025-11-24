<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer v-if="showFooter" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { themeManager } from './utils/theme'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  computed: {
    showFooter() {
      return this.$route.path !== '/login'
    },
  },
  mounted() {
    themeManager.init()
  },
}
</script>

<style lang="scss">
@use '@/shared/styles/index.scss';

#app {
  font-family: var(--font-family);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color var(--transition-base), color var(--transition-base);
}

#app > :nth-child(2) {
  flex: 1;
}
</style>
