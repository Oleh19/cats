const API_BASE_URL = 'https://catfact.ninja'

export async function fetchFacts({ max_length, limit, page } = {}) {
  const queryParams = new URLSearchParams()

  if (max_length != null) {
    queryParams.append('max_length', max_length)
  }

  if (limit != null) {
    queryParams.append('limit', limit)
  }

  if (page != null) {
    queryParams.append('page', page)
  }

  const queryString = queryParams.toString()
  const url = `${API_BASE_URL}/facts${queryString ? `?${queryString}` : ''}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch facts: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  return data?.data || data || []
}
