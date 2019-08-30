import React from 'react'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { toggleHeadingDrawer } from '../../store/appStateActions'
import { Link } from 'react-router-dom'
import orderBy from 'lodash/orderBy'

function Heading(props) {
  const { toggleHeadingDrawer } = props
  const { title, author, heading, logo, background } = props
  const headingOrdered = orderBy(heading, ['order'], ['asc'])

  const useStyles = makeStyles(theme => ({
    header: {
      textAlign: 'center',
      padding: 20,
      background: `url(${background})`
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
  }

  return (
    <div>
      <div className={classes.header}>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='subtitle1'>{author}</Typography>
        <img alt={title} src={logo} />
      </div>
      <List>
        {headingOrdered.map(elem => {
          return (
            <ListItem
              component={Link}
              to={`/material/${elem.id}`}
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
  return { title, author, heading, logo, background }
}

const mapDispatchToProps = dispatch => ({
  toggleHeadingDrawer: payload => dispatch(toggleHeadingDrawer(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Heading)
