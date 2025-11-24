<template>
  <div class="filter-wrapper" ref="filterWrapper">
    <button class="filter-button" @click="toggleDropdown">
      <span class="filter-button-text">{{ selectedText }}</span>
      <ArrowIcon class="arrow-icon" :class="{ 'is-open': isOpen }" />
    </button>

    <div v-if="isOpen" class="filter-dropdown">
      <button
        v-for="option in options"
        :key="option.value"
        class="filter-option"
        :class="{ 'is-selected': value === option.value }"
        @click.stop="selectOption(option.value)"
      >
        <span class="filter-option-text">{{ option.label }}</span>
        <CheckIcon v-if="value === option.value" class="check-icon" />
      </button>
    </div>
  </div>
</template>

<script>
import ArrowIcon from '@/shared/assets/icons/arrow.vue'
import CheckIcon from '@/shared/assets/icons/check.vue'
import { useClickOutside } from '@/shared/mixins/useClickOutside'

export default {
  name: 'FilterDropdown',
  components: {
    ArrowIcon,
    CheckIcon,
  },
  mixins: [useClickOutside],
  props: {
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true,
      validator(value) {
        return value.every(opt => opt.value !== undefined && opt.label !== undefined)
      },
    },
  },
  data() {
    return {
      isOpen: false,
      clickOutsideConfig: {
        ref: 'filterWrapper',
        stateProperty: 'isOpen',
      },
    }
  },
  computed: {
    selectedText() {
      const selected = this.options.find(opt => opt.value === this.value)
      return selected?.label || this.options[0]?.label || ''
    },
  },
  methods: {
    toggleDropdown(event) {
      event.stopPropagation()
      this.isOpen = !this.isOpen
    },
    selectOption(value) {
      this.$emit('input', value)
      this.isOpen = false
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/shared/styles/mixins.scss' as *;
@use '@/shared/styles/variables.scss' as *;
@use '@/shared/styles/facts.scss' as *;

.filter-wrapper {
  position: relative;
  width: $filter-width;

  @media (max-width: $breakpoint-mobile) {
    width: 100%;
  }
}

.filter-button {
  @include input-base;
  @include button-text-left;
  width: 100%;
  padding: $input-padding-vertical $filter-button-right-padding $input-padding-vertical
    $input-padding-horizontal;
  background-color: var(--input-bg);
  color: var(--input-text-color);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: $breakpoint-mobile) {
    padding: $mobile-filter-button-padding;
  }
}

.filter-button-text {
  @include flex-text;
}

.arrow-icon {
  @include icon-base($icon-size-small);
  color: var(--filter-arrow-color);
  transition: transform $transition-base, color $transition-base;

  &.is-open {
    transform: rotate(180deg);
  }
}

.filter-dropdown {
  position: absolute;
  top: calc(100% + #{$dropdown-gap});
  left: 0;
  right: 0;
  background-color: var(--filter-dropdown-bg);
  border-radius: $radius-sm;
  overflow: hidden;
  z-index: $dropdown-z-index;
  box-shadow: $dropdown-shadow;
}

.filter-option {
  @include button-text-left;
  width: 100%;
  padding: $input-padding-vertical $input-padding-horizontal;
  background: none;
  color: var(--filter-option-color);
  font-family: $font-family-hind;
  font-weight: $font-weight-regular;
  font-size: $font-size-base;
  line-height: $line-height-label;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color $transition-base;

  &:hover {
    background-color: var(--filter-option-hover-bg);
  }

  &.is-selected {
    color: var(--filter-selected-color);
    font-weight: $font-weight-medium;
  }
}

.filter-option-text {
  @include flex-text;
}

.check-icon {
  @include icon-base($icon-size-medium);
  color: var(--filter-selected-color);
}
</style>
