/**
 *
 * @param {array} payload - ['nameOfParam', value]
 * 
 * @example 
 * const setMenuTitleAction = {
  type: 'SET_MENU_PARAMETER',
  {title: "1. Comfortable hole" }
}
 */
export const setMenuParameters = payload => {
    return {
        type: 'SET_MENU_PARAMETERS',
        payload
    }
}