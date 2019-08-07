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
