/**
 * Unit is a group for materials. Book, or podcast's channel
 */

import React from 'react'

function UnitPage(props) {
  //console.log('props', props)
  const { unitId } = props.match.params
  return <div>This is Unit Page for {unitId}</div>
}

export default UnitPage
