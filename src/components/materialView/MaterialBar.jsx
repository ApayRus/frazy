import React from 'react'
import Fab from '@material-ui/core/Fab'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'
import HelpIcon from '@material-ui/icons/Help'
import EditIcon from '@material-ui/icons/Edit'
import HomeIcon from '@material-ui/icons/Home'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ButtonWithAuthPopover from '../auth/ButtonWithAuthPopover'

import { toggleHeadingDrawer, toggleSettingsDrawer } from '../../store/appStateActions'
import local from '../../localization/en'

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
  const classes = useStyles()

  const materialEditLink = materialId ? `/material/edit/${materialId}/${trLang}` : `/material/edit/`

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
      <div className={`${classes.bottom} ${classes.edit}`}>
        <ButtonWithAuthPopover
          redirectUrl={materialEditLink}
          message={local.loginButtonMessageForEditMaterial}
          buttonIcon={<EditIcon />}
        />
      </div>

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
