<template>
  <div class="facts-page">
    <div class="test">Facts About Cats To Share With Kids!</div>
    <div class="controls-row">
      <div class="search-wrapper">
        <SearchIcon class="search-icon" />
        <input
          id="search-facts-input"
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="Search facts here"
        />
      </div>
      <FilterDropdown v-model="filterBy" :options="filterOptions" />
    </div>

    <Loader v-if="loading" />

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="facts.length > 0" class="facts-grid">
      <div
        v-for="(fact, index) in filteredFacts"
        :key="fact.id || fact.fact || index"
        class="fact-card"
        @click="goToFact(fact, index)"
      >
        <img :src="fact.imageUrl" :alt="fact.fact" class="fact-image" />
        <p
          class="fact-text"
          :class="{
            'is-short': getFactLength(fact) < factLengthThreshold,
            'is-long': getFactLength(fact) >= factLengthThreshold,
          }"
        >
          {{ truncateFact(fact.fact) }}
        </p>
      </div>
    </div>

    <div v-else class="no-facts">No facts found</div>

    <div v-if="!loading && facts.length > 0 && filteredFacts.length > 0" class="load-more-wrapper">
      <button @click="loadMore" class="load-more-button" :disabled="loadingMore">
        {{ loadingMore ? 'Loading...' : 'Load more facts' }}
      </button>
    </div>
  </div>
</template>

<script>
import SearchIcon from '@/shared/assets/icons/search.vue'
import FilterDropdown from '@/components/FilterDropdown.vue'
import Loader from '@/components/Loader.vue'
import { fetchFacts } from '@/utils/api'
import {
  FACT_LENGTH_THRESHOLD,
  DEFAULT_LIMIT,
  FILTER_OPTIONS,
  FILTER_MAX_LENGTH_MAP,
  getFactLength,
  truncateFact,
  assignImageToFact,
  createFactId,
  saveFactToStorage,
} from '@/utils/facts'
import { FACT_IMAGES } from '@/shared/assets/images'

export default {
  name: 'Facts',
  components: {
    SearchIcon,
    FilterDropdown,
    Loader,
  },
  data() {
    return {
      searchQuery: '',
      filterBy: 'all',
      filterOptions: FILTER_OPTIONS,
      facts: [],
      loading: false,
      loadingMore: false,
      error: null,
      maxLength: null,
      limit: DEFAULT_LIMIT,
      currentPage: 1,
      images: FACT_IMAGES,
    }
  },
  computed: {
    factLengthThreshold() {
      return FACT_LENGTH_THRESHOLD
    },
    filteredFacts() {
      const filtered = this.searchQuery
        ? this.facts.filter(fact =>
            fact.fact?.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        : this.facts

      if (this.filterBy === 'all') {
        return filtered
      }

      const shortFacts = filtered.filter(fact => getFactLength(fact) < FACT_LENGTH_THRESHOLD)
      const longFacts = filtered.filter(fact => getFactLength(fact) >= FACT_LENGTH_THRESHOLD)

      const sortByLength = (facts, descending = true) => {
        return [...facts].sort((a, b) => {
          const lengthA = getFactLength(a)
          const lengthB = getFactLength(b)
          return descending ? lengthB - lengthA : lengthA - lengthB
        })
      }

      const filterStrategies = {
        long_first: () => [...sortByLength(longFacts, true), ...sortByLength(shortFacts, true)],
        short_first: () => [...sortByLength(shortFacts, false), ...sortByLength(longFacts, false)],
        short_only: () => sortByLength(shortFacts, false),
        long_only: () => sortByLength(longFacts, true),
      }

      return filterStrategies[this.filterBy]?.() || filtered
    },
  },
  watch: {
    filterBy(newFilter) {
      this.maxLength = FILTER_MAX_LENGTH_MAP[newFilter] ?? null
      this.loadFacts()
    },
  },
  mounted() {
    this.loadFacts()
  },
  methods: {
    getFactLength(fact) {
      return getFactLength(fact)
    },
    truncateFact(text) {
      return truncateFact(text)
    },
    assignImageToFact(fact, index) {
      return assignImageToFact(fact, index, this.images)
    },
    buildFetchParams() {
      const params = {}
      if (this.maxLength != null) {
        params.max_length = this.maxLength
      }
      params.limit = this.limit
      params.page = this.currentPage
      return params
    },
    async loadFacts() {
      this.loading = true
      this.error = null
      this.currentPage = 1

      try {
        const params = this.buildFetchParams()
        const fetchedFacts = await fetchFacts(params)
        this.facts = fetchedFacts.map((fact, index) => this.assignImageToFact(fact, index))
      } catch (err) {
        this.error = 'Failed to load facts. Please try again later.'
      } finally {
        this.loading = false
      }
    },
    async loadMore() {
      this.loadingMore = true
      this.error = null

      try {
        this.currentPage += 1
        const params = this.buildFetchParams()
        const newFacts = await fetchFacts(params)
        const startIndex = this.facts.length
        const factsWithImages = newFacts.map((fact, index) =>
          this.assignImageToFact(fact, startIndex + index)
        )
        this.facts = [...this.facts, ...factsWithImages]
      } catch (err) {
        this.error = 'Failed to load more facts. Please try again later.'
      } finally {
        this.loadingMore = false
      }
    },
    goToFact(fact, index) {
      const factId = createFactId(fact, index)
      saveFactToStorage(factId, fact)
      this.$router.push(`/fact/${factId}`)
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/shared/styles/mixins.scss' as *;
@use '@/shared/styles/variables.scss' as *;
@use '@/shared/styles/facts.scss' as *;

.facts-page {
  @include page-content-padding;
}

.test {
  @include general-heading;

  @media (max-width: $breakpoint-mobile) {
    font-size: $mobile-heading-font-size;
    line-height: $mobile-heading-line-height;
  }
}

.controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: $spacing-xl;
  gap: $spacing-lg;

  @media (max-width: $breakpoint-mobile) {
    flex-direction: column;
    align-items: stretch;
  }
}

.search-wrapper {
  position: relative;
  width: $search-width;
  display: flex;
  align-items: center;

  @media (max-width: $breakpoint-mobile) {
    width: 100%;
  }
}

.search-icon {
  @include icon-base($icon-size-medium);
  position: absolute;
  left: $search-icon-left-offset;
  color: var(--input-text-color);
  pointer-events: none;
  z-index: 1;
}

.search-input {
  @include input-base;
  width: 100%;
  padding: $input-padding-vertical $input-padding-horizontal $input-padding-vertical
    $search-input-left-padding;
  background-color: var(--input-bg);
  color: var(--input-text-color);
  transition: background-color $transition-base, color $transition-base;
}

.search-input::placeholder {
  color: var(--input-placeholder-color);
  transition: color $transition-base;
}

.search-input::-webkit-input-placeholder {
  color: var(--input-placeholder-color);
  transition: color $transition-base;
}

.search-input::-moz-placeholder {
  color: var(--input-placeholder-color);
  transition: color $transition-base;
}

.search-input:-ms-input-placeholder {
  color: var(--input-placeholder-color);
  transition: color $transition-base;
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, $fact-grid-column-width);
  margin-top: $spacing-xl;
  justify-content: space-between;
  column-gap: $spacing-lg;
  row-gap: $fact-grid-row-gap;

  @media (max-width: $breakpoint-mobile) {
    grid-template-columns: 1fr;
    justify-content: stretch;
  }
}

.fact-card {
  width: $fact-card-width;
  border-radius: $radius-md;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: $card-gap;
  transition: background-color $transition-base;

  @media (max-width: $breakpoint-mobile) {
    width: 100%;
  }

  &:hover {
    background-color: var(--card-hover-bg);
  }
}

.fact-image {
  width: $fact-card-width;
  height: $fact-card-height;
  object-fit: cover;
  border-radius: $radius-sm;

  @media (max-width: $breakpoint-mobile) {
    width: 100%;
    height: auto;
    aspect-ratio: 410 / 254;
  }
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

.no-facts {
  margin-top: $spacing-xl;
  text-align: center;
  font-family: $font-family-hind;
  font-size: $font-size-lg;
  color: var(--text-color);
  transition: color $transition-base;
}

.load-more-wrapper {
  display: flex;
  justify-content: center;
  margin-top: $load-more-wrapper-margin-top;
}

.load-more-button {
  @include text-button;
}
</style>
