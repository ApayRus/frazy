import React from 'react'
import { map } from 'lodash'
import * as moment from 'moment'

function Revisions(props) {
  const { revisions: revisionsDoc } = props

  let revisions = map(revisionsDoc, (elem, key) => {
    const { userName, time } = elem
    return {
      id: key,
      userName,
      time
    }
  })

  return revisions.map(elem => (
    <div key={elem.id}>
      {elem.userName}, {moment(elem.time).fromNow()}
    </div>
  ))
}

export default Revisions
