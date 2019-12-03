import React from 'react'
import './Phrases.css'
import PlayArrow from '@material-ui/icons/PlayArrow'
// import { audio } from '../howler'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

import { connect } from 'react-redux'

function Phrases(props) {
  const { phrases, playPhrase, currentPhraseId, showOriginalText, showTranslation, trLang } = props

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
              {showTranslation && phrase.translations ? (
                <div className='translation'>
                  <Typography variant='body2'>{phrase.translations[trLang]}</Typography>
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
    phrases: state.pageContent.phrases,
    trLang: state.pageContent.trLang
  }
}

export default connect(mapStateToProps)(Phrases)
