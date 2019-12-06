import { makePhrasesArray, addTranslation } from '../utils/phrases'

const initState = {
  title: '',
  lang: '',
  unit: '',
  order: '',
  phrases: [],
  trTitle: '',
  trLang: '',
  mediaLink: '', // saved in db, folder/filename.mp3
  mediaLinkDownloadUrl: '', // current active link, long,  with tokens
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
        translations
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
        materialRevisions,
        trLang,
        trTitle,
        translationPhrases,
        for: forMaterial,
        translationRevisions,
        phrases
      }
    }

    default:
      return state
  }
}

export default pageContentReducer
