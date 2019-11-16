import React from 'react'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { toggleHeadingDrawer } from '../../store/appStateActions'
import { Link } from 'react-router-dom'
import orderBy from 'lodash/orderBy'
import { actionTypes } from 'redux-firestore'

function Heading(props) {
  const { toggleHeadingDrawer, clearCachedDocs } = props
  const { title, author, heading, logo, background, trLang } = props
  const headingOrdered = orderBy(heading, ['order'], ['asc'])

  const useStyles = makeStyles(theme => ({
    header: {
      textAlign: 'center',
      padding: 20,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7)), url(${background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'round',
      backgroundPosition: 'center center'
    },
    listItem: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: '12px',
      lineHeight: 1
    }
  }))

  const classes = useStyles()

  const handleClick = () => {
    toggleHeadingDrawer({ showHeadingDrawer: false })
    clearCachedDocs()
  }

  return (
    <div>
      <div className={classes.header}>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='subtitle1'>{author}</Typography>
        <img style={{ maxWidth: 200 }} alt={title} src={logo} />
      </div>
      <List>
        {headingOrdered.map(elem => {
          return (
            <ListItem
              component={Link}
              to={`/material/${elem.id}/${trLang}`}
              className={classes.listItem}
              button
              divider
              onClick={handleClick}
              key={`heading-${elem.id}`}
            >
              <ListItemText primary={elem.title} /* secondary={elem.title.ru} */ />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

const mapStateToProps = state => {
  const { title, author, heading, logo, background } = state.menu
  const { trLang } = state.pageContent
  return { title, author, heading, logo, background, trLang }
}

const mapDispatchToProps = dispatch => ({
  toggleHeadingDrawer: payload => dispatch(toggleHeadingDrawer(payload)),
  clearCachedDocs: () => dispatch({ type: actionTypes.CLEAR_DATA, preserve: { ordered: true } })
})

export default connect(mapStateToProps, mapDispatchToProps)(Heading)
