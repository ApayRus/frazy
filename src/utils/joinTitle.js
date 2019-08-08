export function joinTitle(materialInfo, translationInfo) {
  let title = {}
  const { title: titleOriginal } = materialInfo
  if (translationInfo) {
    const { title: titleTranslation, lang: langTranslation } = translationInfo
    title = { text: titleOriginal, translations: { [langTranslation]: titleTranslation } }
  } else {
    title = { text: titleOriginal }
  }

  return title
}
