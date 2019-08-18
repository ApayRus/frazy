const initState = {
  title: {}, //{ en: {}, es: {}, ch: {} }
  lang: '',
  unit: '',
  order: '',
  phrases: [],
  text: [],
  trText: [],
  mediaLink: '', // saved in db, folder/filename.mp3
  mediaLinkDownloadUrl: '', // current active link, long,  with tokens
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
    default:
      return state
  }
}

export default pageContentReducer
