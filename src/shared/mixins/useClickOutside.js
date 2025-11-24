export const useClickOutside = {
  mounted() {
    if (this.clickOutsideConfig) {
      document.addEventListener('click', this.handleClickOutside)
    }
  },
  beforeDestroy() {
    if (this.clickOutsideConfig) {
      document.removeEventListener('click', this.handleClickOutside)
    }
  },
  methods: {
    handleClickOutside(event) {
      if (!this.clickOutsideConfig) return

      const { selector, ref, stateProperty } = this.clickOutsideConfig

      if (!stateProperty || this[stateProperty] === undefined || !this[stateProperty]) {
        return
      }

      let element = null

      if (ref) {
        element = this.$refs[ref]
      } else if (selector) {
        element = this.$el?.querySelector(selector)
      }

      if (!element) return

      if (!element.contains(event.target)) {
        if (stateProperty && this[stateProperty] !== undefined) {
          this[stateProperty] = false
        }
      }
    },
  },
}
