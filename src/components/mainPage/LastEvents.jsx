import React from 'react'
import Event from './Event'
import { orderBy, map } from 'lodash'
import { useSelector } from 'react-redux'

function LastEvents(props) {
  const { langsUserInterestedIn = [] } = useSelector((state) => state.appState)

  const { lastEventsDoc } = props

  let lastEvents = map(lastEventsDoc, (elem, key) => {
    return {
      unit: key,
      ...elem,
    }
  })

  if (langsUserInterestedIn.length > 0) {
    lastEvents = lastEvents.filter((elem) => langsUserInterestedIn.includes(elem.lang))
  }
  lastEvents = orderBy(lastEvents, 'time').reverse()

  return (
    <div>
      {lastEvents.map((event) => (
        <Event key={event.unit} {...event} />
      ))}
    </div>
  )
}

export default LastEvents
