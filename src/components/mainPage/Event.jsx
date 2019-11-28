import React, { useState } from 'react'
import { Avatar, Typography, IconButton, Collapse } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  materialEvent: {
    boxShadow: '0px 1px 5px lightgrey',
    margin: 5,
    padding: 5,
    position: 'relative'
  },
  firstLine: {
    position: 'relative'
  },
  secondLine: {
    position: 'relative'
  },
  translations: {
    position: 'absolute',
    right: 1,
    bottom: 1
  },
  detailedInfoExpand: {
    position: 'absolute',
    top: 0,
    right: 5,
    height: 20,
    width: 20,
    zIndex: 20
  },
  title: {
    display: 'inline',
    marginLeft: 5
    // fontFamily: theme.typography.fontFamily,
    // fontSize: theme.typography.fontSize,
  },
  detailedInfo: {
    backgroundColor: theme.palette.grey[100],
    minHeight: 200,
    marginTop: 10,
    padding: 20
  }
}))

const RoundButton = props => (
  <IconButton size='small' edge='start' style={{ padding: 2, marginRight: 0, display: 'inline' }}>
    <Avatar
      style={{
        width: props.size,
        height: props.size,
        fontSize: 12,
        background: props.color
      }}
    >
      {props.lang}
    </Avatar>
  </IconButton>
)

const Translations = props =>
  props.langs.map(lang => (
    <RoundButton
      key={lang}
      lang={lang}
      size={20}
      color={props.activeLang === lang ? 'skyblue' : 'lightgray'}
    />
  ))

const Event = props => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  return (
    <div className={classes.materialEvent}>
      <div className={classes.detailedInfoExpand}>
        <IconButton size='small' edge='start' onClick={() => setExpanded(!expanded)}>
          <ExpandMoreIcon />
        </IconButton>
      </div>
      <div className={classes.firstLine}>
        <RoundButton lang='en' size={30} color='skyblue' />
        <Typography className={classes.title} variant='body1'>
          {props.title}
        </Typography>
      </div>
      <div className={classes.secondLine}>
        <Typography color='textSecondary' display='inline' variant='body2'>
          {props.action} {props.trTitle}
        </Typography>
        <div className={classes.translations}>
          <Translations activeLang={props.trLang} langs={props.avaliableTranslations} />
        </div>
      </div>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <div className={classes.detailedInfo}>
          <Typography variant='body2'>detailed info about updates</Typography>
        </div>
      </Collapse>
    </div>
  )
}

export default Event
