export const FACT_LENGTH_THRESHOLD = 100
export const FACT_TRUNCATE_LENGTH = 304
export const SHORT_FACT_MAX_LENGTH = 99
export const DEFAULT_LIMIT = 10
export const FACT_ID_PREFIX_LENGTH = 20

export const FILTER_OPTIONS = [
  { value: 'all', label: 'All facts' },
  { value: 'long_first', label: 'Show long ones first' },
  { value: 'short_first', label: 'Show short ones first' },
  { value: 'short_only', label: 'Short ones only' },
  { value: 'long_only', label: 'Long ones only' },
]

export const FILTER_MAX_LENGTH_MAP = {
  short_only: SHORT_FACT_MAX_LENGTH,
  long_only: null,
  all: null,
  long_first: null,
  short_first: null,
}

export function getFactLength(fact) {
  return fact.length || (fact.fact ? fact.fact.length : 0)
}

export function truncateFact(text) {
  if (!text) return ''
  if (text.length > FACT_TRUNCATE_LENGTH) {
    return text.substring(0, FACT_TRUNCATE_LENGTH) + '...'
  }
  return text
}

export function assignImageToFact(fact, index, images) {
  const imageIndex = index % images.length
  return {
    ...fact,
    imageUrl: images[imageIndex],
  }
}

export function createFactId(fact, index) {
  return (
    fact.id ||
    `fact-${index}-${fact.fact?.substring(0, FACT_ID_PREFIX_LENGTH).replace(/\s/g, '-')}` ||
    `fact-${index}`
  )
}

const FACT_STORAGE_PREFIX = 'fact-'

export function saveFactToStorage(factId, fact) {
  localStorage.setItem(`${FACT_STORAGE_PREFIX}${factId}`, JSON.stringify(fact))
}

export function getFactFromStorage(factId) {
  const savedFact = localStorage.getItem(`${FACT_STORAGE_PREFIX}${factId}`)
  return savedFact ? JSON.parse(savedFact) : null
}

export function loadFactById(factId) {
  return getFactFromStorage(factId)
}
