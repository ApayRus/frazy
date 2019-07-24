/**
 * Converts line of .ass file (subtitles format, used in AEGISUB) into phraseObject
 * @param {string} assRow -
 * @returns {Object} phraseObject
 * @example
 * assRowToPhraseObject("Dialogue: 0,0:16:03.74,0:16:05.70,Default,,0,0,0,,short practice of surgery")
 * will return { start: 963.74, end: 965.7, text: 'short practice of surgery' }
 */
export function assRowToPhraseObject(assRow) {
  if (assRow) {
    const [, startString, endString, , , , , , , text] = assRow.split(',')
    const start = timeStringToSeconds(startString)
    const end = timeStringToSeconds(endString)
    return { start, end, text }
  } else {
    //we need empty phrases, for empty rows in multiline timing-text
    return { start: '', end: '', text: '' }
  }
}

/**
 * Converts classing time string to number in seconds
 * @param {String} timeString
 * @returns {Number} seconds
 * @example
 * timeStringToSeconds("0:16:03.74")
 * will return 963.74
 */
function timeStringToSeconds(timeString) {
  const [hours, minutes, seconds] = timeString.split(':')
  return +hours * 3600 + +minutes * 60 + +seconds
}
