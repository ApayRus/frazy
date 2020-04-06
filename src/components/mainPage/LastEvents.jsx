import React from 'react'
import Event from './Event'
import { orderBy, map } from 'lodash'
import Typography from '@material-ui/core/Typography'

function LastEvents(props) {
  const { lastEventsDoc } = props

  let lastEvents = map(lastEventsDoc, (elem, key) => {
    return {
      unit: key,
      ...elem,
    }
  })

  lastEvents = orderBy(lastEvents, 'time').reverse()

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ textAlign: 'center' }}>
        <Typography align='center' style={{ marginLeft: 10 }} variant='subtitle'>
          Latest updates
        </Typography>
      </div>
      {lastEvents.map((event) => (
        <Event key={event.unit} {...event} />
      ))}
    </div>
  )
}

export default LastEvents
