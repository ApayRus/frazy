import React from 'react'
import PlayArrow from '@material-ui/icons/PlayArrow'
import ButtonBase from '@material-ui/core/ButtonBase'
import { makeStyles } from '@material-ui/core/styles'
import { setPageParameter } from '../../store/pageContentActions'
import wavesurferModule from '../../wavesurfer/wavesurfer'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { map } from 'lodash'

const useStyles = makeStyles(theme => ({
  phrases: {
    verticalAlign: 'top',
    display: 'inline-block',
    minWidth: 40,
    marginTop: -15
  },
  phraseCell: {
    display: 'flex',
    alignItems: 'center',
    width: 40,
    height: 15
  },
  playButton: {
    color: 'gray',
    width: '100%'
  },

  id: { fontSize: 9 },
  playArrow: { fontSize: 9 },
  current: {
    color: 'red'
  }
}))

function Phrases(props) {
  const { phrases, selectedPhrases } = useSelector(state => state.pageContent)

  const { currentPhraseId } = useSelector(state => state.playerState)
  const dispatch = useDispatch()
  const classes = useStyles()

  const playPhrase = id => event => {
    wavesurferModule.wavesurfer.regions.list[id].play()
  }

  const onSelect = id => event => {
    const { checked: isChecked } = event.target
    const newSelectedPhrases = isChecked
      ? selectedPhrases.concat(id)
      : selectedPhrases.filter(elem => elem !== id)
    dispatch(setPageParameter(['selectedPhrases', newSelectedPhrases]))
  }
  const onSelectAll = event => {
    const { checked: isChecked } = event.target
    const newSelectedPhrases = isChecked ? map(phrases, 'id') : []
    dispatch(setPageParameter(['selectedPhrases', newSelectedPhrases]))
  }

  return (
    <div className={classes.phrases}>
      <div className={classes.phraseCell} style={{ justifyContent: 'center' }}>
        <input
          onChange={onSelectAll}
          type='checkbox'
          title='select all phrases'
          style={{ display: 'inline-block', padding: 0, margin: 0 }}
        />
      </div>
      {phrases.map((phrase, index) => {
        const isCurrentPhrase = currentPhraseId === phrase.id
        const isSelected = selectedPhrases.includes(phrase.id)
        return (
          <div
            className={classes.phraseCell}
            key={`phrase-${phrase.id}`}
            style={{ backgroundColor: phrase.color }}
          >
            <input
              onChange={onSelect(phrase.id)}
              type='checkbox'
              checked={isSelected}
              style={{ display: 'inline-block', padding: 0, margin: 0 }}
            />
            <ButtonBase
              component='div'
              onClick={playPhrase(phrase.id)}
              className={clsx(classes.playButton, { [classes.current]: isCurrentPhrase })}
            >
              <div className={classes.id}>{index + 1}</div>
              <div className={classes.playArrow}>
                <PlayArrow fontSize='inherit' />
              </div>
            </ButtonBase>
          </div>
        )
      })}
    </div>
  )
}

export default Phrases
