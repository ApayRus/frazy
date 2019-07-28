import React from 'react'
import { heading } from '../content/GENERATEDheading.js'
import { units } from '../content/GENERATEDunits.js'
import { translations } from '../content/GENERATEDtranslations.js'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { setPhrasesArray, setMediaLink } from '../store/pageContentActions'
import { connect } from 'react-redux'
import { joinPhrasesAndTranslations } from '../utils/joinPhrasesAndTranslations'
import { toggleHeadingDrawer } from '../store/appStateActions'
function Heading(props) {
  const { setPhrasesArray, setMediaLink, toggleHeadingDrawer } = props

  const handleClick = unitId => event => {
    const unit = units[`hobbit${unitId}_en`]
    const translation = translations[`hobbit${unitId}_ru`]
    const phrasesArray = joinPhrasesAndTranslations(unit, translation)
    const mediaLink = unit.mediaLink
    toggleHeadingDrawer({ showHeadingDrawer: false })
    setPhrasesArray(phrasesArray)
    setMediaLink(mediaLink)
  }

  return (
    <div>
      <h1>Heading!</h1>
      <List>
        {heading.map(elem => {
          return (
            <ListItem button onClick={handleClick(elem.id)} key={`heading-${elem.id}`}>
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
