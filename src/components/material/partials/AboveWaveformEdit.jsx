import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import MaterialInfo from '../../materialForm/MaterialFormInfo'
import YoutubePlayer from '../../YoutubePlayer'

export default function MaterialForm(props) {
  const { uploadProgress } = useSelector(state => state.pageContent)
  const {
    material: { youtubeId }
  } = useSelector(state => state.data)

  const { sticked: playerSticked } = useSelector(state => state.playerSettings)

  return (
    <div style={{ textAlign: 'left' }}>
      <MaterialInfo />
      {uploadProgress > 0 && uploadProgress < 100 ? (
        <div style={{ textAlign: 'center' }}>
          <Typography variant='body2' color='textSecondary'>
            File uploading ...
          </Typography>
          <CircularProgress value={uploadProgress} variant='static' />
        </div>
      ) : null}
      <div
        style={{
          position: playerSticked ? 'sticky' : 'unset',
          top: 0,
          backgroundColor: 'white',
          zIndex: 2
        }}
      >
        {youtubeId && (
          <div>
            <YoutubePlayer videoId={youtubeId} />
          </div>
        )}
      </div>
    </div>
  )
}
