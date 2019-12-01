import React, { useState } from 'react'
import { Avatar, Typography, IconButton, Collapse } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

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
    position: 'relative',
    paddingLeft: 36
  },
  translations: {
    position: 'absolute',
    right: 1,
    bottom: 1
  },

  title: {
    display: 'inline',
    marginLeft: 5
    // fontFamily: theme.typography.fontFamily,
    // fontSize: theme.typography.fontSize,
  },
  detailedInfoExpand: {
    position: 'absolute',
    top: -8,
    right: 2,
    height: 20,
    width: 20,
    zIndex: 20
  },
  actions: {
    position: 'absolute',
    top: 1,
    right: 20,
    color: theme.palette.grey[400],
    fontSize: 10
  },
  detailedInfo: {
    backgroundColor: theme.palette.grey[100],
    minHeight: 200,
    marginTop: 10,
    padding: 20
  }
}))

const RoundButton = props => {
  return (
    <IconButton
      size='small'
      edge='start'
      style={{ padding: 2, marginRight: 0, display: 'inline' }}
      onClick={props.redirectTo(props.materialId, props.trLang)}
    >
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
}

const Translations = props => {
  return props.langs.map(lang => (
    <RoundButton
      key={lang}
      lang={lang}
      size={20}
      color={props.activeLang === lang ? 'skyblue' : 'lightgray'}
      materialId={props.materialId}
      trLang={lang}
      redirectTo={props.redirectTo}
    />
  ))
}

const Event = props => {
  const history = useHistory()
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const redirectTo = (materialId, trLang) => event => {
    console.log('materialId, trLang', materialId, trLang)
    history.push(`material/${materialId}/${trLang}`)
  }

  return (
    <div className={classes.materialEvent}>
      <Typography className={classes.actions} variant='body2'>
        {props.actions.join(', ')}
      </Typography>
      <div className={classes.detailedInfoExpand}>
        <IconButton size='small' edge='start' onClick={() => setExpanded(!expanded)}>
          <ExpandMoreIcon />
        </IconButton>
      </div>
      <div className={classes.firstLine}>
        <RoundButton
          lang={props.lang}
          size={30}
          color='skyblue'
          materialId={props.id}
          trLang={''}
          redirectTo={redirectTo}
        />
        <Typography className={classes.title} variant='body1'>
          {props.title}
        </Typography>
      </div>
      <div className={classes.secondLine}>
        <Typography color='textSecondary' variant='body2'>
          {props.trTitle}
        </Typography>

        <div className={classes.translations}>
          <Translations
            redirectTo={redirectTo}
            materialId={props.id}
            activeLang={props.trLang}
            langs={props.translations}
          />
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
