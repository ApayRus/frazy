import React from 'react'
import './Phrases.css'
import { PlayArrow } from '@material-ui/icons'
// import { audio } from '../howler'
import { ButtonBase, Typography } from '@material-ui/core'

function Phrases(props) {
  /*   const playPhrase = id => event => {
    audio.pause()
    audio.play(id)
  } */
  const { phrases, playPhrase } = props

  // console.log('waveformComponent', waveformComponent)

  return (
    <div className='phrases'>
      {phrases.map(phrase => {
        return (
          <ButtonBase
            style={{ display: 'block', width: '100%' }}
            onClick={playPhrase(phrase.id)}
            key={`phrase-${phrase.id}`}
          >
            <div className='phrase' onClick={playPhrase(phrase.id)}>
              <div className='id'>
                {phrase.id} <PlayArrow fontSize='inherit' />{' '}
              </div>
              <div className='text'>
                <Typography variant='body1'>{phrase.text}</Typography>
              </div>
              <div className='translation ru'>
                <Typography variant='body2'>{phrase.text}</Typography>
              </div>
            </div>
          </ButtonBase>
        )
      })}
    </div>
  )
}

export default Phrases
