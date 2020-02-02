/**
 *
 * @param {array} payload - ['nameOfParam', value]
 * 
 * @example 
 * const setPageTitleAction = {
  type: 'SET_MENU_PARAMETER',
  ['title', "1. Comfortable hole" ]
}
 */
export const setPageParameter = payload => {
  return {
    type: 'SET_PAGE_PARAMETER',
    payload
  }
}

/**
 * @param {object} payload
 * @param {string} payload.materialId
 * @param {string} payload.mediaLinkDownloadUrl
 * @param {Object} payload.material - doc
 * @param {Object} payload.translation - doc
 */
export const fillPageContent = payload => {
  return {
    type: 'FILL_PAGE_CONTENT',
    payload
  }
}

export const clearPageContent = () => {
  return {
    type: 'CLEAR_PAGE_CONTENT'
  }
}

/**
 *
 * @param {object} payload
 * @param {object} payload.materialDoc - loaded from db doc for update
 */
export const updateFromMaterial = payload => {
  return {
    type: 'UPDATE_FROM_MATERIAL',
    payload
  }
}

/**
 *
 * @param {object} payload
 * @param {object} payload.materialDoc - loaded from db doc for update
 */
export const updateFromTranslation = payload => {
  return {
    type: 'UPDATE_FROM_TRANSLATION',
    payload
  }
}

/**
 *
 * @param {object} payload
 * @param {object} payload.materialDoc - loaded from db doc for update
 */
export const updateTranslationRevisions = payload => {
  return {
    type: 'UPDATE_TRANSLATION_REVISIONS',
    payload
  }
}

/**
 *
 * @param {object} payload
 * @param {number} payload.delta - seconds +/- 
 * @example 
  { type: 'MOVE_PHRASES', payload:{ delta: 1.1 } }
  { type: 'MOVE_PHRASES', payload:{ delta: 0.1, selectedPhrases: ['tfor16kt5o'] } }
 */
export const movePhrases = payload => {
  return {
    type: 'MOVE_PHRASES',
    payload
  }
}

/**
 *
 * @param {object} payload
 * @param {number} payload.delta - seconds +/- 
 * @example 
  { type: 'CLONE_PHRASES', payload:{ selectedPhrases: ["2e4sdmgetlo", "l9vhq4ucrm"] } }
 */
export const clonePhrases = payload => {
  return {
    type: 'CLONE_PHRASES',
    payload
  }
}

/**
 *
 * @param {object} payload
 * @param {number} payload.delta - seconds +/- 
 * @example 
  { type: 'DELETE_PHRASES', payload:{ selectedPhrases: ["2e4sdmgetlo", "l9vhq4ucrm"] } }
 */
export const deletePhrases = payload => {
  return {
    type: 'DELETE_PHRASES',
    payload
  }
}
