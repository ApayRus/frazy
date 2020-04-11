import React from 'react'
import QuestionIcon from '@material-ui/icons/Help'
import { Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  tooltip: (props) => ({
    fontSize: props.fontSize,
    maxWidth: 'none',
  }),

  icon: (props) => ({
    fontSize: props.iconSize,
    color: props.color,
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
  const { color = blue[100], fontSize = 14, buttonSize = 'small', iconSize = 14 } = props
  const classes = useStyles({ fontSize, color, iconSize })
  return (
    <Tooltip classes={classes} interactive title={props.title}>
      <IconButton size={buttonSize}>
        <QuestionIcon className={classes.icon} />
      </IconButton>
    </Tooltip>
  )
}

export default HelperIconTooltip
