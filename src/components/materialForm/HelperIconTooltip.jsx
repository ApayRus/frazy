import React, { useState } from 'react'
import QuestionIcon from '@material-ui/icons/Help'
import { Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const useStyles = makeStyles((theme) => ({
  icon: (props) => ({
    fontSize: props.iconSize,
    color: props.color,
  }),
}))

const useStylesTooltip = makeStyles((theme) => ({
  tooltip: (props) => ({
    fontSize: props.fontSize,
    maxWidth: 'none',
  }),
}))

/**
 *
 * @param {string} props.buttonSize - small or medium
 * @param {string} props.color - iconColor
 * @param {number} props.iconSize - in px
 * @param {number} props.fontSize - in px
 */
function HelperIconTooltip(props) {
  const [open, setOpen] = useState(false)
  const toggleTooltip = () => setOpen(!open)
  const closeTooltip = () => setOpen(false)
  const { color = blue[100], fontSize = 14, buttonSize = 'small', iconSize = 14 } = props
  const classes = useStyles({ color, iconSize })
  const classesTooltip = useStylesTooltip({ fontSize })
  return (
    <ClickAwayListener onClickAway={closeTooltip}>
      <Tooltip
        open={open}
        onClose={toggleTooltip}
        classes={classesTooltip}
        interactive
        title={props.title}
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <IconButton onClick={toggleTooltip} size={buttonSize}>
          <QuestionIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
    </ClickAwayListener>
  )
}

export default HelperIconTooltip
