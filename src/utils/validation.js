export const VALIDATION_RULES = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 15,
  LATIN_LETTERS_REGEX: /^[a-zA-Z]+$/,
}

export const ERROR_MESSAGES = {
  EMPTY: 'Enter your name',
  LENGTH: 'Name length must be between 3 and 15 characters',
  LATIN_ONLY: 'Name can only contain Latin letters',
}

export function trimUsername(username) {
  return username?.trim() || ''
}

export function validateUsername(username) {
  const trimmedUsername = trimUsername(username)

  if (!trimmedUsername) {
    return ERROR_MESSAGES.EMPTY
  }

  if (
    trimmedUsername.length < VALIDATION_RULES.MIN_LENGTH ||
    trimmedUsername.length > VALIDATION_RULES.MAX_LENGTH
  ) {
    return ERROR_MESSAGES.LENGTH
  }

  if (!VALIDATION_RULES.LATIN_LETTERS_REGEX.test(trimmedUsername)) {
    return ERROR_MESSAGES.LATIN_ONLY
  }

  return null
}
