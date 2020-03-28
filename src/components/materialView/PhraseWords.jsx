import React, { Fragment, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Tooltip } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  wordFromDict: {
    borderBottom: '1px dashed skyblue',
    cursor: 'pointer'
  }
}))

function PhraseWords(props) {
  const { phrase, trLang } = props
  const { /* dict = [] */ text, translations = {} } = phrase
  const { dict: trDict = [] } = translations[trLang] || {}
  const classes = useStyles()
  const phraseTextArray = text.split(' ')
  const initStateOpenTooltips = trDict.reduce((obj, item) => {
    obj[item.wordOrder] = false
    return obj
  }, {}) // if we don't generate all key: value, will be error 'controlled/uncontrolled'
  const [openTooltip, setOpenTooltip] = useState(initStateOpenTooltips)

  const toggleTooltip = wordOrder => event => {
    setOpenTooltip({ ...openTooltip, [wordOrder]: !openTooltip[wordOrder] })
  }

  return (
    <Fragment>
      {phraseTextArray.map((word, index) => {
        const wordSpan = <span>{word}</span>

        const wordInDict = trDict.find(elem => elem.wordOrder === index + 1)
        const { wordOrder, wordForms, wordTranslations } = wordInDict || {}

        const wordSpanTooltip = (
          <Tooltip
            arrow
            PopperProps={{ style: { pointerEvents: 'auto' } }}
            placement='top'
            onClose={toggleTooltip(wordOrder)}
            open={openTooltip[wordOrder]}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <div>
                <Typography variant='body1'>{wordForms}</Typography>
                <hr />
                <Typography variant='body2'>{wordTranslations}</Typography>
              </div>
            }
          >
            <span onClick={toggleTooltip(wordOrder)} className={classes.wordFromDict}>
              {word}
            </span>
          </Tooltip>
        )

        const wordDisplay = wordInDict ? wordSpanTooltip : wordSpan

        return <Fragment key={`word-${index}`}>{wordDisplay} </Fragment>
      })}
    </Fragment>
  )
}

export default PhraseWords
