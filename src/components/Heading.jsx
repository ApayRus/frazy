import React from 'react'
import bookInfo from '../content/GENERATEDheading.js'
import units from '../content/GENERATEDmaterials.js'
import translations from '../content/GENERATEDtranslations.js'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { setPhrasesArray, setMediaLink, setTitle } from '../store/pageContentActions'
import { connect } from 'react-redux'
import { joinPhrasesAndTranslations } from '../utils/joinPhrasesAndTranslations'
import { toggleHeadingDrawer } from '../store/appStateActions'

const useStyles = makeStyles(theme => ({
  header: {
    textAlign: 'center',
    padding: 20,
    background: 'url("../img/menu-background.jpg")'
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: '12px',
    lineHeight: 1
  }
}))

function Heading(props) {
  const { setPhrasesArray, setMediaLink, setTitle, toggleHeadingDrawer } = props
  const classes = useStyles()
  const heading = bookInfo.heading
  const bookTitle = bookInfo.title.ru
  const bookAuthor = bookInfo.author.ru

  const handleClick = unitId => event => {
    const unit = units[unitId]
    const translation = translations[`${unitId}_ru`]
    const phrasesArray = joinPhrasesAndTranslations(unit, translation)
    const { title: titleOriginal, mediaLink, lang: langOriginal } = unit
    const { title: titleTranslation, lang: langTranslation } = translation
    const title = { [langOriginal]: titleOriginal, [langTranslation]: titleTranslation }

    toggleHeadingDrawer({ showHeadingDrawer: false })
    setPhrasesArray(phrasesArray)
    setTitle(title)
    setMediaLink('') //for unmount old Waveform, and mount new one
    setTimeout(() => {
      setMediaLink(mediaLink)
    }, 1)
  }

  return (
    <div>
      <div className={classes.header}>
        <Typography variant='h6'>{bookTitle}</Typography>
        <Typography variant='subtitle1'>{bookAuthor}</Typography>
        <img alt={bookTitle} src='../img/logo.png' />
      </div>

      <List>
        {heading.map(elem => {
          return (
            <ListItem
              className={classes.listItem}
              button
              divider
              onClick={handleClick(elem.id)}
              key={`heading-${elem.id}`}
            >
              <ListItemText primary={elem.title.en} secondary={elem.title.ru} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setPhrasesArray: payload => dispatch(setPhrasesArray(payload)),
    setMediaLink: payload => dispatch(setMediaLink(payload)),
    setTitle: payload => dispatch(setTitle(payload)),
    toggleHeadingDrawer: payload => dispatch(toggleHeadingDrawer(payload))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Heading)
