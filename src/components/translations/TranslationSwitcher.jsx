import React from 'react'
import RoundButtonsBlock from '../translations/RoundButtonsBlock'
import { useSelector, useDispatch } from 'react-redux'
import { updateFromTranslation } from '../../store/pageContentActions'
import { useFirestore } from 'react-redux-firebase'

function TranslationSwitcher() {
  const { trLang, translations, materialId } = useSelector(state => state.pageContent)
  const dispatch = useDispatch()
  const db = useFirestore()

  const updateTranslation = (lang, trLang) => event => {
    const docId = `${materialId}_${trLang}`
    console.log('docId', docId)
    db.collection('materialTr')
      .doc(docId)
      .get()
      .then(doc => {
        console.log('doc.data()', doc.data())
        dispatch(updateFromTranslation({ doc: doc.data() }))
      })
      .catch(error => console.log(error))
  }

  return (
    <RoundButtonsBlock
      activeLang={trLang}
      size={20}
      onClick={updateTranslation}
      langs={translations}
    />
  )
}

export default TranslationSwitcher
