import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

function Event(props) {
  const { id, title, trTitle, lang, trLang, action } = props
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  return (
    <div className={classes.eventContainer}>
      <table cellspacing={0} cellpadding={0} className={classes.eventTable}>
        <tbody>
          <tr>
            <td className={classes.langCell1}>{lang}</td>

            <td className={`${classes.title} ${classes.titleTop}`}>
              <Button
                component={Link}
                to={`/material/${id}/${trLang}`}
                className={`${classes.button}`}
              >
                {title}
              </Button>
            </td>
            <td className={classes.actionHappened} rowspan={2}>
              {action}
            </td>
            <td className={classes.detailedInfoCell} rowspan={2}>
              <IconButton size='small' onClick={() => setExpanded(!expanded)} title='more details'>
                <ExpandMoreIcon className={classes.expandMoreButton} />
              </IconButton>
            </td>
          </tr>
          {trLang && (
            <tr>
              <td className={classes.langCell2}>{trLang}</td>
              <td className={`${classes.title} ${classes.titleBottom}`}>
                <Button className={`${classes.button}`}>{trTitle}</Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <div className={classes.detailedInfo}>
          <Typography variant='body2'>detailed info about updates</Typography>
        </div>
      </Collapse>
    </div>
  )
}

const useStyles = makeStyles(theme => {
  const blue = theme.palette.primary.main
  const red = theme.palette.secondary.main
  return {
    eventContainer: {
      maxWidth: 500
    },
    eventTable: {
      marginTop: 10,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      width: `100%`,
      cellspacing: 0,
      cellpading: 0,
      tableLayout: 'fixed',
      backgroundColor: theme.palette.grey[50],
      border: `1px solid ${blue}`,
      borderRadius: 4
      /* borderCollapse: `collapse` */
    },
    langCell1: {
      width: 20,
      padding: '5px 10px',
      color: `${red}`,
      textAlign: 'center'
    },
    langCell2: {
      width: 20,
      padding: '5px 10px',
      color: `${red}`,
      textAlign: 'center',
      borderTop: `1px solid ${blue}`
    },
    actionHappened: {
      width: 70,
      textAlign: `center`,
      borderLeft: `1px solid ${blue}`,
      padding: 5,
      color: `${red}`,
      lineHeight: '150%'
    },
    detailedInfoCell: {
      width: 30,
      color: `${blue}`,
      textAlign: 'center'
    },
    expandMoreButton: {
      color: `${blue}`
    },
    title: {
      color: `${blue}`,
      borderLeft: `1px solid ${blue}`,
      overflow: 'hidden',
      textAlign: 'left'
    },
    titleBottom: {
      borderTop: `1px solid ${blue}`
    },
    detailedInfo: {
      backgroundColor: theme.palette.grey[100],
      minHeight: 200,
      margin: `0px 12px 5px 12px`,
      padding: 20
    },
    button: {
      textTransform: 'none',
      width: '100%',
      display: 'box',
      padding: '0px 10px',
      margin: 0
      /*  color:blue */
    }
  }
})

export default Event
