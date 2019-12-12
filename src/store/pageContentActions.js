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
