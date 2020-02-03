import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { setPageParameter } from '../../store/pageContentActions'

const useStyles = makeStyles(theme => ({
  button: { fontWeight: 100, textTransform: 'none', padding: '0px 10px' }
}))

export default function BasicButtonGroup() {
  const classes = useStyles()
  const { showOriginalInputs, showTranslationInputs } = useSelector(state => state.pageContent)
  const dispatch = useDispatch()

  const handleClickOriginal = () => {
    dispatch(setPageParameter(['showOriginalInputs', !showOriginalInputs]))
    //if both are empty, make other true
    if (!(showOriginalInputs && showTranslationInputs)) {
      dispatch(setPageParameter(['showTranslationInputs', true]))
    }
  }

  const handleClickTranslation = () => {
    dispatch(setPageParameter(['showTranslationInputs', !showTranslationInputs]))
    //if both are empty, make other true
    if (!(showOriginalInputs && showTranslationInputs)) {
      dispatch(setPageParameter(['showOriginalInputs', true]))
    }
  }

  return (
    <div>
      <ButtonGroup size='small' color='default'>
        <Button
          onClick={handleClickOriginal}
          className={classes.button}
          variant={clsx({ contained: showOriginalInputs })}
        >
          Original
        </Button>
        <Button
          onClick={handleClickTranslation}
          className={classes.button}
          variant={clsx({ contained: showTranslationInputs })}
        >
          Translation
        </Button>
      </ButtonGroup>
    </div>
  )
}
