export const STORAGE_KEYS = {
  IS_AUTHENTICATED: 'isAuthenticated',
  USERNAME: 'username',
}

export function saveAuthData(username) {
  localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true')
  localStorage.setItem(STORAGE_KEYS.USERNAME, username)
}

export function getAuthData() {
  return {
    isAuthenticated: localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true',
    username: localStorage.getItem(STORAGE_KEYS.USERNAME) || '',
  }
}

export function clearAuthData() {
  localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED)
  localStorage.removeItem(STORAGE_KEYS.USERNAME)
}

export function isAuthenticated() {
  return getAuthData().isAuthenticated
}
