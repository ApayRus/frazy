export function joinTitle(materialInfo, translationInfo) {
  const { title: titleOriginal } = materialInfo
  const { title: titleTranslation, lang: langTranslation } = translationInfo
  const title = { text: titleOriginal, translations: { [langTranslation]: titleTranslation } }

  return title
}
