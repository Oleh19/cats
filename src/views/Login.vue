<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Log in</h1>
      <form @submit.prevent="handleLogin" class="login-form" novalidate>
        <div class="form-group">
          <label for="username">Name</label>
          <input
            id="username"
            v-model="username"
            type="text"
            :class="{ error: hasError }"
            :aria-invalid="hasError"
            :aria-describedby="hasError ? 'username-error' : undefined"
            placeholder="Enter your name"
            @input="clearError"
          />
          <div class="error-container">
            <span v-if="hasError" id="username-error" class="error-message" role="alert">
              {{ errorMessage }}
            </span>
          </div>
        </div>
        <button type="submit" class="login-button">Log in</button>
      </form>
    </div>
  </div>
</template>

<script>
import { validateUsername, trimUsername } from '@/utils/validation'
import { saveAuthData, isAuthenticated } from '@/utils/auth'
import { eventBus } from '@/utils/eventBus'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      errorMessage: '',
    }
  },
  computed: {
    hasError() {
      return !!this.errorMessage
    },
  },
  mounted() {
    if (isAuthenticated()) {
      this.$router.push('/facts')
    }
  },
  methods: {
    clearError() {
      this.errorMessage = ''
    },
    handleLogin() {
      this.clearError()

      const validationError = validateUsername(this.username)
      if (validationError) {
        this.errorMessage = validationError
        return
      }

      const trimmedUsername = trimUsername(this.username)
      saveAuthData(trimmedUsername)
      eventBus.$emit('auth-updated')
      this.$router.push('/facts')
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/shared/styles/variables.scss' as *;
@use '@/shared/styles/mixins.scss' as *;

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: var(--bg-color);
}

.login-container {
  width: 100%;
  max-width: $container-max-width;

  h1 {
    @include login-heading;
  }
}

.login-form {
  margin-top: $spacing-xxxl;

  .form-group {
    @include form-group;

    label {
      @include login-form-label;
    }

    input {
      @include input-base;
      @include input-base-states;
      border: 1px solid transparent;
      box-sizing: border-box;

      &:focus {
        border-color: $input-focus-color;
      }

      &.error {
        border-color: $error-color;
      }
    }

    .error-container {
      min-height: 1.5em;
      margin-top: 2px;
    }

    .error-message {
      @include error-message;
    }
  }
}

.login-button {
  @include login-button;
}
</style>
