import { makePhrasesArray, addTranslation } from '../utils/phrases'

const initState = {
  materialId: '',
  title: '',
  lang: '',
  unit: '',
  order: '',
  phrases: [],
  trTitle: '',
  trLang: '',
  mediaLink: '', // saved in db, folder/filename.mp3
  duration: 0, // 45.035 (sec)
  translations: [], // ['ru', 'ar', 'ch']
  uploadProgress: -1,
  downloadProgress: -1,
  waveformRenderProgress: -1
}

const pageContentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_PAGE_PARAMETER': {
      const [key, value] = action.payload // ['mediaLink', "hobbit/hobbit1_1.mp3"]
      return { ...state, [key]: value }
    }
    case 'CLEAR_PAGE_CONTENT': {
      return { ...initState }
    }
    case 'FILL_PAGE_CONTENT': {
      //material
      const { materialId, material, translation } = action.payload
      const {
        lang,
        title,
        unit,
        order,
        mediaLink,
        phrases: materialPhrases,
        meta: { translations, duration }
      } = material

      const { meta: { revisions: materialRevisions = {} } = {} } = material

      let phrases = makePhrasesArray(materialPhrases)

      //translations
      const {
        lang: trLang = '',
        title: trTitle = '',
        phrases: translationPhrases = {},
        for: forMaterial = ''
      } = translation || {}
      const { meta: { revisions: translationRevisions = {} } = {} } = translation || {}

      if (translation) {
        if (translation.phrases) {
          phrases = addTranslation(phrases, translation)
        }
      }

      return {
        ...state,
        materialId,
        lang,
        title,
        unit,
        order,
        mediaLink,
        materialPhrases,
        translations,
        duration,
        materialRevisions,
        trLang,
        trTitle,
        translationPhrases,
        for: forMaterial,
        translationRevisions,
        phrases
      }
    }
    case 'UPDATE_FROM_MATERIAL': {
      console.log('action', action)
      const { title, lang, mediaLink, unit, order, phrases: phrasesRevision } = action.payload.doc

      const newInfo = { title, lang, mediaLink, unit, order }
      let { phrases } = state
      //rewrite text
      phrases = phrases.map(elem => {
        const { text: newText = '' } = phrasesRevision[elem.id] || {}
        return {
          ...elem,
          text: newText
        }
      })

      //delete not exist in revision
      phrases = phrases.filter(elem => Object.keys(phrasesRevision).includes(elem.id))

      return { ...state, ...newInfo, phrases }
    }
    case 'UPDATE_FROM_TRANSLATION': {
      const { title: trTitle, lang: trLang, phrases: phrasesRevision } = action.payload.doc
      let { phrases } = state
      //rewrite text
      phrases = phrases.map(elem => {
        const { translations: oldTranslations } = elem
        const { text: newText = '' } = phrasesRevision[elem.id] || {}
        const newTranslation = { [trLang]: newText }
        return {
          ...elem,
          translations: { ...oldTranslations, ...newTranslation }
        }
      })

      const stateAfter = { ...state, trLang, trTitle, phrases }

      return stateAfter
    }
    // when we update from revision, we don't rewrite "revisions" cause they'll be actual
    // when we update from TranslationSwitcher, we update revisions too,
    // because for each language they are different
    case 'UPDATE_TRANSLATION_REVISIONS': {
      const { meta: { revisions: translationRevisions = {} } = {} } = action.payload.doc || {}
      return { ...state, translationRevisions }
    }

    default:
      return state
  }
}

export default pageContentReducer
