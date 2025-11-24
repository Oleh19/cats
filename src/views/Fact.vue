<template>
  <div class="fact-page-wrapper">
    <button @click="goBack" class="back-button-top">
      <ArrowLeft />
      Back
    </button>
    <div class="fact-page">
      <Loader v-if="loading" />

      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-else-if="fact" class="fact-container">
        <img :src="fact.imageUrl" :alt="fact.fact" class="fact-image" />
        <p
          class="fact-text"
          :class="{
            'is-short': getFactLength(fact) < factLengthThreshold,
            'is-long': getFactLength(fact) >= factLengthThreshold,
          }"
        >
          {{ fact.fact }}
        </p>
      </div>

      <div v-else class="no-fact">
        <p>Fact not found</p>
        <button @click="goBack" class="back-button">Go back to facts</button>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import ArrowLeft from '@/shared/assets/icons/arrowLeft.vue'
import { FACT_LENGTH_THRESHOLD, getFactLength, loadFactById } from '@/utils/facts'

export default {
  name: 'Fact',
  components: {
    Loader,
    ArrowLeft,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fact: null,
      loading: false,
      error: null,
    }
  },
  computed: {
    factLengthThreshold() {
      return FACT_LENGTH_THRESHOLD
    },
  },
  mounted() {
    this.loadFact()
  },
  methods: {
    getFactLength(fact) {
      return getFactLength(fact)
    },
    loadFact() {
      this.loading = true
      this.error = null

      try {
        const fact = loadFactById(this.id)
        if (fact) {
          this.fact = fact
        } else {
          this.error = 'Fact data not found'
        }
      } catch (err) {
        this.error = 'Failed to load fact. Please try again later.'
      } finally {
        this.loading = false
      }
    },
    goBack() {
      this.$router.push('/facts')
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/shared/styles/mixins.scss' as *;
@use '@/shared/styles/variables.scss' as *;
@use '@/shared/styles/facts.scss' as *;

.fact-page-wrapper {
  padding: $fact-page-padding-top $page-content-padding-horizontal $fact-page-padding-bottom
    $page-content-padding-horizontal;

  @media (max-width: $breakpoint-mobile) {
    padding: $fact-page-padding-top $mobile-padding-horizontal $card-padding
      $mobile-padding-horizontal;
  }
}

.back-button-top {
  @include back-button;
  display: flex;
  align-items: center;
  gap: $spacing-xs;
}

.fact-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.fact-container {
  margin-top: $spacing-xxxl;
  max-width: $fact-container-max-width;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $card-gap;

  @media (max-width: $breakpoint-mobile) {
    margin-top: $spacing-lg;
    gap: $spacing-sm;
  }
}

.fact-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: $radius-sm;
}

.fact-text {
  @include fact-text-base;

  &.is-short {
    @include short-fact-text;
  }

  &.is-long {
    @include long-fact-text;
  }
}

.error-message {
  @include error-message-full;
}

.no-fact {
  margin-top: $spacing-xl;
  text-align: center;
  font-family: $font-family-hind;

  p {
    font-size: $font-size-lg;
    color: var(--text-color);
    margin-bottom: $spacing-lg;
  }
}

.back-button {
  @include text-button;
}
</style>
