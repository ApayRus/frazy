import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { setPageParameters } from '../../store/pageContentActions'

const useStyles = makeStyles(theme => ({
  button: { fontWeight: 100, textTransform: 'none', padding: '0px 10px' }
}))

export default function InputsViewSwitcher() {
  const classes = useStyles()
  const { showOriginalInputs, showTranslationInputs } = useSelector(state => state.pageContent)
  const dispatch = useDispatch()

  const handleClickOriginal = () => {
    dispatch(setPageParameters({ showOriginalInputs: !showOriginalInputs }))
    //if both are empty, make other true
    if (!(showOriginalInputs && showTranslationInputs)) {
      dispatch(setPageParameters({ showTranslationInputs: true }))
    }
  }

  const handleClickTranslation = () => {
    dispatch(setPageParameters({ showTranslationInputs: !showTranslationInputs }))
    //if both are empty, make other true
    if (!(showOriginalInputs && showTranslationInputs)) {
      dispatch(setPageParameters({ showOriginalInputs: true }))
    }
  }

  return (
    <div>
      <ButtonGroup size='small' color='default'>
        <Button
          onClick={handleClickOriginal}
          className={classes.button}
          variant={clsx({ contained: showOriginalInputs })}
          title='show/hide original text'
        >
          Original
        </Button>
        <Button
          onClick={handleClickTranslation}
          className={classes.button}
          variant={clsx({ contained: showTranslationInputs })}
          title='show/hide translation text'
        >
          Translation
        </Button>
      </ButtonGroup>
    </div>
  )
}
