import React, { useRef } from 'react'
import PlayPauseButton from '../PlayPauseButton'
import IconButton from '@material-ui/core/IconButton'
import CopyIcon from '@material-ui/icons/FileCopy'
import DeleteIcon from '@material-ui/icons/Delete'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { useSelector, useDispatch } from 'react-redux'
import { clonePhrases, movePhrases, deletePhrases } from '../../store/pageContentActions'

function ControlsPanel() {
  const { selectedPhrases } = useSelector(state => state.pageContent)
  const dispatch = useDispatch()
  const deltaInput = useRef()

  const handleMovePhrases = direction => event => {
    const deltaValue = deltaInput.current.value
    const delta = direction === 'back' ? +deltaValue * -1 : +deltaValue
    dispatch(movePhrases({ delta, selectedPhrases }))
  }

  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <PlayPauseButton />
      </div>
      {selectedPhrases.length > 0 && (
        <div style={{ display: 'inline-block' }}>
          <IconButton
            title='clone selected phrases'
            onClick={() => dispatch(clonePhrases({ selectedPhrases }))}
          >
            <CopyIcon />
          </IconButton>
          <IconButton
            title='delete selected phrases'
            onClick={() => dispatch(deletePhrases({ selectedPhrases }))}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton title='move selected phrases back' onClick={handleMovePhrases('back')}>
            <ArrowBackIcon />
          </IconButton>
          <div style={{ display: 'inline-block' }} title='step for moving phrases (in seconds)'>
            <input
              defaultValue='1'
              min={0}
              step='0.1'
              ref={deltaInput}
              type='number'
              style={{ width: 50 }}
            />
          </div>
          <IconButton title='move selected phrases forward' onClick={handleMovePhrases('forward')}>
            <ArrowForwardIcon />
          </IconButton>
        </div>
      )}
    </div>
  )
}

export default ControlsPanel
