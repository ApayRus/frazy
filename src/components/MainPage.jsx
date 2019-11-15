import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import * as moment from 'moment'
import ButtonWithAuthPopover from './ButtonWithAuthPopover'

function MainPage(props) {
  const { events } = props
  let eventList = null

  if (isLoaded(events)) {
    eventList = (
      <List>
        {events.map(event => {
          const { id, materialId, lang, trLang, title, trTitle, time, unit } = event
          const primaryText = `${lang}: ${title}`
          const secondaryText = `${trLang}: ${trTitle}, unit: ${unit}, time: ${moment(
            time
          ).fromNow()}`
          return (
            <ListItem
              key={id}
              component={Link}
              to={`/material/${materialId}/${trLang}`}
              button
              divider
            >
              <ListItemText primary={primaryText} secondary={secondaryText} />
            </ListItem>
          )
        })}
      </List>
    )
  }
  const materialAddLink = 'material/add'
  const AddButton = () => {
    return (
      <div style={{ position: 'fixed', bottom: 2, zIndex: 1, right: 2 }}>
        <ButtonWithAuthPopover
          redirectUrl={materialAddLink}
          message={`You should login before add a material. `}
          buttonIcon={<AddIcon />}
        />
      </div>
    )
  }

  return (
    <div>
      {eventList}
      <AddButton />
    </div>
  )
}

const mapStateToProps = state => {
  return { events: state.firestore.ordered.events }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    //   const { materialId, trLang } = props.match.params
    return [{ collection: 'events' }]
  })
)(MainPage)
