import { getAuthData, STORAGE_KEYS } from '@/utils/auth'
import { eventBus } from '@/utils/eventBus'

export const useAuth = {
  data() {
    return {
      authData: {
        isAuthenticated: false,
        username: '',
      },
    }
  },
  computed: {
    isAuthenticated() {
      return this.authData.isAuthenticated
    },
    username() {
      return this.authData.username || 'User'
    },
    userInitial() {
      const name = this.username.trim()
      return name ? name.charAt(0).toUpperCase() : 'U'
    },
  },
  mounted() {
    this.updateAuthData()
    this.setupAuthListeners()
  },
  beforeDestroy() {
    this.removeAuthListeners()
  },
  methods: {
    setupAuthListeners() {
      window.addEventListener('storage', this.handleAuthStorageChange)
      eventBus.$on('auth-updated', this.updateAuthData)
    },
    removeAuthListeners() {
      window.removeEventListener('storage', this.handleAuthStorageChange)
      eventBus.$off('auth-updated', this.updateAuthData)
    },
    updateAuthData() {
      const newAuthData = getAuthData()
      if (
        this.authData.isAuthenticated !== newAuthData.isAuthenticated ||
        this.authData.username !== newAuthData.username
      ) {
        this.authData = { ...newAuthData }
      }
    },
    handleAuthStorageChange(event) {
      if (event.key === STORAGE_KEYS.IS_AUTHENTICATED || event.key === STORAGE_KEYS.USERNAME) {
        this.updateAuthData()
      }
    },
    handleLogout() {
      localStorage.clear()
      this.updateAuthData()
      eventBus.$emit('auth-updated')
      this.$router?.push('/login')
    },
  },
}
