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
    default:
      return state
  }
}

export default pageContentReducer
