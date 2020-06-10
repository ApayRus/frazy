import React from 'react'
import MaterialTitle from './Title'
import YoutubePlayer from '../../YoutubePlayer'
import { useSelector } from 'react-redux'

export default function MaterialPage(props) {
  const { youtubeId } = useSelector(state => state.data.material)

  return (
    <>
      <MaterialTitle />
      {youtubeId && (
        <div>
          <YoutubePlayer videoId={youtubeId} />
        </div>
      )}
    </>
  )
}
