import React from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import { fillPageContent } from '../../store/pageContentActions'
import { parseImportedSubs } from '../../utils/phrases'

export default function MaterialForm(props) {
  const { mediaLink } = useSelector(state => state.pageContent)

  const dispatch = useDispatch()

  const readSubtitles = () => {
    const { textareaOriginal, materialId: materialIdCurrent } = props
    const { materialId = materialIdCurrent, material, translation } = parseImportedSubs(
      textareaOriginal
    )
    if (!material.mediaLink) material.mediaLink = mediaLink
    dispatch(fillPageContent({ materialId, material, translation }))
  }

  return (
    <>
      <Button style={{ margin: 10 }} onClick={readSubtitles} variant='outlined'>
        Import subtitles
      </Button>
    </>
  )
}
