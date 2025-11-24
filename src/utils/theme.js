const THEME_STORAGE_KEY = 'theme'

export const themes = {
  light: {
    name: 'light',
    headerBg: '#EBECFF',
    primaryColor: '#2c3e50',
    textColor: '#434343',
    bgColor: '#ffffff',
    headingColor: '#232323',
    logoutButtonBg: '#EBECFF',
    logoutButtonText: '#434343',
    inputBg: '#ebecff',
    inputTextColor: '#434343',
    inputPlaceholderColor: '#434343',
    cardHoverBg: '#ebecff',
    filterArrowColor: '#434343',
    filterDropdownBg: '#ebecff',
    filterOptionColor: '#434343',
    filterOptionHoverBg: '#d6d8ff',
    filterSelectedColor: '#6e72ec',
  },
  dark: {
    name: 'dark',
    headerBg: '#1a1a2e',
    primaryColor: '#ffffff',
    textColor: '#FFFFFF',
    bgColor: '#202020',
    headingColor: '#DCDCDC',
    logoutButtonBg: '#313247',
    logoutButtonText: '#FFFFFF',
    inputBg: '#4D4E69',
    inputTextColor: '#E2E2E2',
    inputPlaceholderColor: '#E2E2E2',
    cardHoverBg: '#313247',
    filterArrowColor: '#ffffff',
    filterDropdownBg: '#4d4e69',
    filterOptionColor: '#c6c6c6',
    filterOptionHoverBg: '#313247',
    filterSelectedColor: '#ffffff',
  },
}

export const themeManager = {
  getCurrentTheme() {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
      if (savedTheme && themes[savedTheme]) {
        return savedTheme
      }
      return 'light'
    } catch (error) {
      return 'light'
    }
  },

  setTheme(themeName) {
    if (!themes[themeName]) {
      return
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeName)
      this.applyTheme(themeName)
    } catch (error) {
      void error
    }
  },

  applyTheme(themeName) {
    const theme = themes[themeName]
    if (!theme) {
      return
    }

    const root = document.documentElement
    root.style.setProperty('--header-bg', theme.headerBg)
    root.style.setProperty('--primary-color', theme.primaryColor)
    root.style.setProperty('--text-color', theme.textColor)
    root.style.setProperty('--bg-color', theme.bgColor)
    root.style.setProperty('--heading-color', theme.headingColor)
    root.style.setProperty('--logout-button-bg', theme.logoutButtonBg)
    root.style.setProperty('--logout-button-text', theme.logoutButtonText)
    root.style.setProperty('--input-bg', theme.inputBg)
    root.style.setProperty('--input-text-color', theme.inputTextColor)
    root.style.setProperty('--input-placeholder-color', theme.inputPlaceholderColor)
    root.style.setProperty('--card-hover-bg', theme.cardHoverBg)
    root.style.setProperty('--filter-arrow-color', theme.filterArrowColor)
    root.style.setProperty('--filter-dropdown-bg', theme.filterDropdownBg)
    root.style.setProperty('--filter-option-color', theme.filterOptionColor)
    root.style.setProperty('--filter-option-hover-bg', theme.filterOptionHoverBg)
    root.style.setProperty('--filter-selected-color', theme.filterSelectedColor)
    root.setAttribute('data-theme', themeName)
  },

  init() {
    const currentTheme = this.getCurrentTheme()
    this.applyTheme(currentTheme)
  },

  toggle() {
    const currentTheme = this.getCurrentTheme()
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    this.setTheme(newTheme)
    return newTheme
  },

  clearTheme() {
    try {
      localStorage.removeItem(THEME_STORAGE_KEY)
    } catch (error) {
      void error
    }
  },
}
