import React from 'react'
import ExpansionPanel from '../layout/ExpansionPanel'
import content from './content_ru'
import PlainTextToParagraphs from '../layout/PlainTextToParagraphs'

function Donate() {
  const { message = '', expansionPanel = [] } = content
  const mainMessage = (
    <div style={{ marginLeft: 20, marginTop: 10 }}>
      <PlainTextToParagraphs text={message} />
    </div>
  )
  return (
    <div>
      {mainMessage}
      <ExpansionPanel content={expansionPanel} />
    </div>
  )
}

export default Donate
