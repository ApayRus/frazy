import React from 'react'
import './Phrases.css'
import { PlayArrow } from '@material-ui/icons'
// import { audio } from '../howler'
import { ButtonBase, Typography } from '@material-ui/core'

import { connect } from 'react-redux'

function Phrases(props) {
  const { phrases, playPhrase, currentPhraseId, showOriginalText, showTranslation } = props

  return (
    <div className='phrases'>
      {phrases.map((phrase, index) => {
        return (
          <ButtonBase
            style={{ display: 'block', width: '100%' }}
            onClick={playPhrase(phrase.id)}
            key={`phrase-${phrase.id}`}
          >
            <div className='phrase' onClick={playPhrase(phrase.id)}>
              <div className={'id ' + (currentPhraseId === phrase.id ? 'current' : '')}>
                {index + 1} <PlayArrow fontSize='inherit' />{' '}
              </div>
              {showOriginalText ? (
                <div className='text'>
                  <Typography variant='body1'>{phrase.text}</Typography>
                </div>
              ) : null}
              {showTranslation ? (
                <div className='translation ru'>
                  <Typography variant='body2'>{phrase.translations.ru}</Typography>
                </div>
              ) : null}
            </div>
          </ButtonBase>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentPhraseId: state.playerState.currentPhraseId,
    showTranslation: state.playerSettings.showTranslation,
    showOriginalText: state.playerSettings.showOriginalText,
    phrases: state.pageContent.phrases
  }
}

export default connect(mapStateToProps)(Phrases)
