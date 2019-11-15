import React from 'react'
import { Fab } from '@material-ui/core'
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Edit as EditIcon,
  Home as HomeIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoginPopover from '../LoginPopover'
import { useFirebase } from 'react-redux-firebase'

import { toggleHeadingDrawer, toggleSettingsDrawer } from '../../store/appStateActions'

const useStyles = makeStyles(theme => ({
  bottom: {
    position: 'fixed',
    bottom: 2,
    zIndex: 1
  },
  menu: {
    left: 3
  },
  home: {
    left: 58
  },
  settings: {
    right: 3
  },
  help: {
    right: 55
  },
  edit: {
    right: 110
  }
}))

function Appbar(props) {
  const { toggleHeadingDrawer, toggleSettingsDrawer, materialId, trLang } = props
  const firebase = useFirebase()
  const classes = useStyles()
  const auth = useSelector(state => state.firebase.auth)
  const history = useHistory()

  const materialEditLink = materialId ? `/material/edit/${materialId}/${trLang}` : `/material/edit/`

  //start POPOVER
  const [anchorEl, setAnchorEl] = React.useState(null)
  const loginPopoverOpen = Boolean(anchorEl)
  const loginPopoverId = loginPopoverOpen ? 'simple-popover' : undefined

  const handleCloseLoginPopover = () => {
    setAnchorEl(null)
  }

  const popoverProps = {
    loginPopoverId,
    loginPopoverOpen,
    anchorEl,
    handleCloseLoginPopover,
    firebase,
    history,
    redirectUrl: materialEditLink,
    message: 'You should login before edit the material.'
  }
  //end Popover

  const onClickEdit = event => {
    console.log('auth', auth)
    if (auth.uid) {
      history.push(materialEditLink)
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  return (
    <div>
      <Fab
        className={`${classes.bottom} ${classes.menu}`}
        onClick={() => {
          toggleHeadingDrawer({ showHeadingDrawer: true })
        }}
        color='primary'
        size='medium'
      >
        <MenuIcon />
      </Fab>

      <Fab
        className={`${classes.bottom} ${classes.home}`}
        component={Link}
        to='/'
        color='primary'
        size='medium'
      >
        <HomeIcon />
      </Fab>

      <Fab className={`${classes.bottom} ${classes.help}`} color='primary' size='medium'>
        <HelpIcon />
      </Fab>
      <Fab
        onClick={onClickEdit}
        className={`${classes.bottom} ${classes.edit}`}
        color='primary'
        size='medium'
      >
        <EditIcon />
      </Fab>
      <Fab
        className={`${classes.bottom} ${classes.settings}`}
        onClick={() => {
          toggleSettingsDrawer({ showSettingsDrawer: true })
        }}
        color='primary'
        size='medium'
      >
        <SettingsIcon />
      </Fab>
      <LoginPopover {...popoverProps} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    materialId: state.pageContent.materialId,
    trLang: state.pageContent.trLang
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleHeadingDrawer: payload => dispatch(toggleHeadingDrawer(payload)),
    toggleSettingsDrawer: payload => dispatch(toggleSettingsDrawer(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appbar)
