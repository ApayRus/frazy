import React, { useState, Fragment } from 'react'
import { PlayArrow, ExpandMore } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Actor from './Actor'
import { ButtonBase, Collapse } from '@material-ui/core'
import { langDirection } from '../../theme/functions'
import { map } from 'lodash'

const useStyles = makeStyles(theme => ({
  phrase: props => ({
    boxShadow: `0px 1px 5px ${props.isCurrentPhrase ? theme.palette.primary.main : 'lightgrey'}`,
    textAlign: 'left',
    padding: '10px 10px 10px 10px',
    position: 'relative',
    margin: 5
  }),
  wordFromDict: {
    borderBottom: '1px dashed skyblue',
    cursor: 'pointer'
  },
  translation: {
    color: 'gray'
  },
  id: props => {
    const { direction } = props
    const endElementsStyle =
      direction === 'rtl' ? { left: 1, paddingRight: 15 } : { right: 1, paddingLeft: 15 }
    return {
      position: 'absolute',
      bottom: 1,

      ...endElementsStyle,

      fontSize: 9,
      color: 'gray',
      paddingTop: 15
    }
  },
  expandButton: props => {
    const { direction } = props
    const endElementsStyle =
      direction === 'rtl' ? { left: 1, paddingRight: 15 } : { right: 1, paddingLeft: 15 }
    return {
      position: 'absolute',
      top: 1,

      ...endElementsStyle,

      fontSize: 20,
      color: 'gray',
      paddingBottom: 15
    }
  },
  closed: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  opened: {
    transform: 'rotate(180deg)'
  },
  detailedInfo: {
    marginTop: 10,
    backgroundColor: theme.palette.grey[100],
    padding: 20,
    borderRadius: 5
  }
}))

function Phrases(props) {
  const {
    showOriginalText,
    showTranslation,
    isCurrentPhrase,
    trLang,
    lang,
    num,
    phrase,
    playPhrase
  } = props
  const [isExpanded, setIsExpanded] = useState(false)

  const direction = langDirection(lang)

  const classes = useStyles({ direction, isCurrentPhrase })

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const { dict, actor, comment, translations = {} } = phrase

  const { dict: trDict, actor: trActor, comment: trComment } = translations[trLang] || {}

  const phraseHasHiddenParts = Boolean(dict || trDict || comment || trComment)

  const phraseWordByWord = () => {
    const { text } = phrase
    const wordIdsInDict = map(trDict, 'wordOrder')
    const phraseTextArray = text.split(' ')
    return (
      <Fragment>
        {phraseTextArray.map((word, index) => {
          return (
            <Fragment key={`word-${index}`}>
              <span
                className={clsx({
                  [classes.wordFromDict]: wordIdsInDict.includes(index + 1)
                })}
              >
                {word}
              </span>{' '}
            </Fragment>
          )
        })}
      </Fragment>
    )
  }

  const dictBlock = dictArray => (
    <div>
      {dictArray.map((elem, index) => {
        const { /* wordOrder, */ wordForms, wordTranslations } = elem
        return (
          <div key={index}>
            <Typography display='inline' variant='body1'>
              {wordForms}
            </Typography>
            <Typography display='inline' variant='body1'>
              {' '}
              -{' '}
            </Typography>
            <Typography display='inline' variant='body2'>
              {wordTranslations}
            </Typography>
          </div>
        )
      })}
    </div>
  )

  return (
    <div>
      {phrase.actor && <Actor actor={actor} trActor={trActor} />}
      <div className={classes.phrase}>
        <ButtonBase onClick={playPhrase(phrase.id)} className={classes.id}>
          {num}
          <PlayArrow fontSize='inherit' />{' '}
        </ButtonBase>
        {phraseHasHiddenParts && (
          <ButtonBase className={clsx(classes.expandButton)} onClick={handleExpand}>
            <ExpandMore
              className={clsx({
                [classes.closed]: !isExpanded,
                [classes.opened]: isExpanded
              })}
              fontSize='inherit'
            />
          </ButtonBase>
        )}
        {showOriginalText ? (
          <div>
            <Typography variant='body1'>{phraseWordByWord()}</Typography>
          </div>
        ) : null}
        {showTranslation && phrase.translations ? (
          <div className={classes.translation}>
            <Typography variant='body2'>{phrase.translations[trLang].text}</Typography>
          </div>
        ) : null}
        {phraseHasHiddenParts && (
          <Collapse in={isExpanded} timeout='auto' unmountOnExit>
            <div className={classes.detailedInfo}>
              {dict && dictBlock(dict)}
              {trDict && dictBlock(trDict)}
              {comment && <div>{comment}</div>}
              {trComment && <div>{trComment}</div>}
            </div>
          </Collapse>
        )}
      </div>
    </div>
  )
}

export default Phrases
