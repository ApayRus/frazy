import React from 'react'
import ExpansionPanel from '../layout/ExpansionPanel'
import { donate as content } from '../../localization/en'
import PlainTextToParagraphs from '../layout/PlainTextToParagraphs'
import Grid from '@material-ui/core/Grid'

function Donate() {
  const { message = '', expansionPanel = [] } = content

  return (
    <div>
      <Grid container>
        <Grid item sm={2} md={3}></Grid>
        <Grid item xs={12} sm={8} md={6}>
          <div style={{ padding: 10, marginTop: 20 }}>
            <PlainTextToParagraphs text={message} />
          </div>
          <ExpansionPanel content={expansionPanel} />
        </Grid>
        <Grid item sm={2} md={3}></Grid>
      </Grid>
    </div>
  )
}

export default Donate
