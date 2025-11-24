import { themeManager } from '@/utils/theme'

export const useTheme = {
  data() {
    return {
      currentTheme: 'light',
    }
  },
  mounted() {
    this.currentTheme = themeManager.getCurrentTheme()
    this.setupThemeListeners()
  },
  beforeDestroy() {
    this.removeThemeListeners()
  },
  methods: {
    setupThemeListeners() {
      window.addEventListener('storage', this.handleThemeStorageChange)
    },
    removeThemeListeners() {
      window.removeEventListener('storage', this.handleThemeStorageChange)
    },
    toggleTheme() {
      this.currentTheme = themeManager.toggle()
    },
    handleThemeStorageChange(event) {
      if (event.key === 'theme') {
        this.currentTheme = themeManager.getCurrentTheme()
        themeManager.applyTheme(this.currentTheme)
      }
    },
  },
}
