/**
 * parsing of xml like  phrase string into object with params:
 *
 * actor
 * text
 * dict
 * comment
 *
 * <actor name="Neil Armostrong" /> Hello, I'm Neil.
 * <dict #1 word1Form1, word1Form2 - translations of word; #2 word2Form1, word2Form2 - translations of word; />
 * <comment Эта фраза встречается только в редких случаях />
 * <actor name="Neil Armostrong" /> Hello, I'm Neil. <dict #0 bla - bla />
 *
 * also available short tags.
 * <Neil>, <Neil /> will be interpreted like <actor name="Nail">
 * <#1 word1 - translation; #2 word2 - translation2;> (with / or without /) - will be interpretted like  <dict>
 *
 * Register of tag always will be changed to lower case. You can youse <ACTOR> and <actor>, both will be the same
 *
 * @param {string} phraseLine - string with xml-like parts : <actor /> <dict /> <comment /> or just plain text
 */
export function phraseTextToObject(phraseLine) {
  const xmlPattern = /<.+?\/*>/g
  // 1) we find all xml-like patterns in the string
  const match = phraseLine.match(xmlPattern) || []
  // 2) if xml tag is with props like name="", src="", we do:
  const phraseObject = match.reduce((obj, elem) => {
    const tagObject = xmlTagToObject(elem)
    return { ...obj, ...tagObject }
  }, {})
  // after we have extracted all xml-tags, we remove them and save the rest like "text"
  phraseObject['text'] = phraseLine.replace(xmlPattern, '')

  return phraseObject
}

/**
   * if tag contains attributes (key="value"), will be return object with all this attributes
   * else, if tag doesn't contain attributes, will return {[tagName]: { text }}
   * in case of tag [dict] will be return more complicated object
   * @example
   * const actorText = `<ACTOR name="Neil Armostrong" src="https://randomuser.me/api/portraits/men/32.jpg" />`;
   * xmlTagToObject(actorText) // will return
   * { actor: {
   *      name: "Neil Armostrong",
   *      src: "https://randomuser.me/api/portraits/men/32.jpg"
   *    } }
   * const dictText = `<DICT #1 word1, word2 - translation of first word; #2 word3, word4 - translation of second word; />`
   *  xmlTagToObject(dictText) // will return
  {"dict": {
    "0": {
     "wordOrder": 1,
     "wordForms": "word1, word2",
     "wordTranslations": "translation of first word; "
    },
    "1": {
     "wordOrder": 2,
     "wordForms": "word3, word4",
     "wordTranslations": "translation of second word; "
    }
   }}
   */
function xmlTagToObject(xmlString) {
  const existingTags = ['actor', 'dict', 'comment']
  let tag = xmlString
    .split(' ')[0]
    .replace(/^\s*</, '')
    .toLowerCase()

  const attributesText = xmlString.match(/\s+.+?=\s*".+?"/g) //key="value"
  if (attributesText) {
    const attributes = attributesText.reduce((obj, elem) => {
      const attributeArray = elem.trim().split('=')
      const [key, value] = attributeArray
      obj[key] = value.replace(/['"]/g, '')
      return obj
    }, {})
    return { [tag]: { ...attributes } }
  } else {
    let text = xmlString.split(' ')
    if (existingTags.includes(tag)) {
      text.shift() //1-st word in xmlString was tag name
    } else {
      // that means we are dealing with shourt tag like <Mike> for actor
      // or <#1 word1, word2 - translation of word; #2 word3, word4 - translation of word; />
      tag = xmlString.match(/#/g) ? 'dict' : 'actor'
    }

    text = text.join(' ').replace(/<*(.+?)\/*\s*>/, '$1') // < >, < />, < / >
    let tagObject = {}
    if (tag === 'dict') {
      tagObject = splitDictString(text)
      return { [tag]: [...tagObject] }
    } else if (tag === 'actor') {
      tagObject = { name: text }
    } else {
      tagObject = { text }
    }
    return { [tag]: { ...tagObject } }
  }
}

/**
 * splits <DICT string /> into separate words,
 * and extracts for each word meaningful pieces:
 * each word substring contains
 * 1) number (order in the phrase) - optional
 * 2) word different forms (like singular and plural)
 * 3) translations
 */
function splitDictString(dictString) {
  const dictStringArray = dictString.split('#')
  dictStringArray.shift()
  const dictArray = dictStringArray.map(wordString => {
    const wordStringArray = wordString.split(/\s+/)
    const hasOrder = !!wordStringArray[0].match(/^\s*\d+/)
    wordString = hasOrder ? wordStringArray.slice(1).join(' ') : wordString
    const wordOrder = hasOrder ? +wordStringArray[0] : null
    const [wordForms, wordTranslations] = wordString.split(' - ')
    return { wordOrder, wordForms, wordTranslations }
  })
  return dictArray
  // console.log(dictStringArray);
}

/* 
const tests = [
  `<ACTOR name="Neil Armostrong" src="url" />Hello, I'm Neil`,
  `<Neil>Hello! Whats up?`,
  `It is a good theme for discussion. <DICT #4 good - translation for good; #5 theme - translation of theme; #7 discussion - translation for discussion  />`
]

console.log(JSON.stringify(phraseTextToObject(tests[0]), null, ' '))
console.log(JSON.stringify(phraseTextToObject(tests[1]), null, ' '))
console.log(JSON.stringify(phraseTextToObject(tests[2]), null, ' '))
 */
