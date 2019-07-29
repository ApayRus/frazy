import React from 'react'
import { bookInfo } from '../content/GENERATEDheading.js'
import { units } from '../content/GENERATEDunits.js'
import { translations } from '../content/GENERATEDtranslations.js'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { setPhrasesArray, setMediaLink } from '../store/pageContentActions'
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
  const { setPhrasesArray, setMediaLink, toggleHeadingDrawer } = props
  const classes = useStyles()
  const heading = bookInfo.heading
  const bookTitle = bookInfo.title.ru
  const bookAuthor = bookInfo.author.ru

  const handleClick = unitId => event => {
    const unit = units[`hobbit${unitId}_en`]
    const translation = translations[`hobbit${unitId}_ru`]
    const phrasesArray = joinPhrasesAndTranslations(unit, translation)
    const mediaLink = unit.mediaLink
    toggleHeadingDrawer({ showHeadingDrawer: false })
    setPhrasesArray(phrasesArray)
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
              <ListItemText>{elem.title.ru}</ListItemText>
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
    toggleHeadingDrawer: payload => dispatch(toggleHeadingDrawer(payload))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Heading)
