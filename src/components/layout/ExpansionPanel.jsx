import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlainTextToParagraphs from './PlainTextToParagraphs'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey['100'],
    padding: 10,
    borderRadius: 4,
  },
}))

/**
 * takes array with content: [{title, content}, ...] and represents it like expansion panel
 */
export default function SimpleExpansionPanel(props) {
  const classes = useStyles()
  const expansionPanel = (index, title, content) => (
    <ExpansionPanel key={index}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography color='primary' variant='subtitle1'>
          {title}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ display: 'block' }}>
        <PlainTextToParagraphs text={content} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
  return (
    <div className={classes.root}>
      {props.content.map((elem, index) => {
        const { title = '', content = '' } = elem
        return expansionPanel(index, title, content)
      })}
    </div>
  )
}
