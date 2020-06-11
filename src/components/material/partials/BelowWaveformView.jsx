import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PlayerControls from '../../materialView/PlayerControls'
import Phrases from '../../materialView/Phrases'

import PlayerSlideShow from '../../materialView/PlayerSlideShow'
import { makeStyles } from '@material-ui/core/styles'
import wavesurferModule from '../../../wavesurfer/wavesurfer'
import { setPlayerState } from '../../../store/playerStateActions'
import PrevNextButtons from '../../materialView/PrevNextButtons'
import clsx from 'clsx'
import ControlsPanel from '../../materialForm/ControlsPanel'
import HeadingDrawer from '../../unit/UnitDrawerContainer'

const useStyles = makeStyles(theme => ({
  hidden: { display: 'none' },
  playerControlsPanel: { backgroundColor: 'white', zIndex: 2, position: 'sticky', top: 0 },
  slideshow: { marginBottom: 3 }
}))

export default function MaterialPage(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { currentPhraseId, dictationCurrentRepeat, dictationTimerId } = useSelector(
    state => state.playerState
  )
  const { dictationRepeats, dictationDelay, showSlideshow } = useSelector(
    state => state.playerSettings
  )
  const { phrases } = useSelector(state => state.pageContent)

  const currentPhraseNum = phrases.findIndex(elem => elem.id === currentPhraseId)

  const play = () => {
    wavesurferModule.wavesurfer.play()
    stopDictation()
  }

  const pause = () => {
    wavesurferModule.wavesurfer.pause()
    stopDictation()
  }

  const playPhrase = id => event => {
    wavesurferModule.wavesurfer.regions.list[id].play()
    stopDictation()
  }

  const playPhraseDictation = id => event => {
    wavesurferModule.wavesurfer.regions.list[id].play()
  }

  const playNext = () => {
    const { id: nextId } = phrases[currentPhraseNum + 1]
    playPhrase(nextId)()
  }

  const playPrev = () => {
    const { id: prevId } = phrases[currentPhraseNum - 1]
    playPhrase(prevId)()
  }

  /**
   * repeats phrase N times with phraseLength X*delay
   * @param {Number} phraseNum
   * @param {Number} repeatCount
   * @param {Number} delayX - delaySeconds = delayX * phraseLength
   * @returns {array} repeats - array of setTimeout
   */
  const playPhraseNtimesWithXDelay = (currentRepeatNum, phraseNum, repeatCount, delayX) => {
    if (phraseNum === phrases.length) return
    const phrase = phrases[phraseNum]
    const { id, start, end } = phrase
    const phraseLength = end - start
    const delaySeconds = phraseLength * delayX

    playPhraseDictation(id)()

    const timerId = setTimeout(() => {
      if (currentRepeatNum < repeatCount) {
        playPhraseNtimesWithXDelay(currentRepeatNum + 1, phraseNum, repeatCount, delayX)
      } else {
        playPhraseNtimesWithXDelay(1, phraseNum + 1, repeatCount, delayX)
      }
    }, delaySeconds * 1000)

    dispatch(setPlayerState(['dictationTimerId', timerId]))
    dispatch(setPlayerState(['dictationCurrentRepeat', currentRepeatNum]))
  }

  const stopDictation = () => {
    clearTimeout(dictationTimerId)
    dispatch(setPlayerState(['dictationTimerId', 0]))
  }

  const playDictation = () => {
    const beginFrom = currentPhraseNum < 0 ? 0 : currentPhraseNum
    if (!dictationTimerId) {
      playPhraseNtimesWithXDelay(1, beginFrom, dictationRepeats, dictationDelay)
    } else {
      stopDictation()
    }
  }

  const playerControlsProps = {
    play,
    pause,
    playPhrase,
    playNext,
    playPrev,
    playDictation
  }

  return (
    <>
      <div className={clsx(classes.slideshow, { [classes.hidden]: !showSlideshow })}>
        <PlayerSlideShow currentPhraseNum={currentPhraseNum} />
      </div>
      <div className={classes.playerControlsPanel}>
        <PlayerControls {...playerControlsProps} />
      </div>
      <Phrases playPhrase={playPhrase} />
      <PrevNextButtons />
      <HeadingDrawer />
    </>
  )
}
