import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

function RoundButton(props) {
  console.log(props)
  return (
    <IconButton
      size='small'
      edge='start'
      style={{ padding: 2, marginRight: 0, display: 'inline' }}
      onClick={props.onClick(props.lang)}
      title={props.title}
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

export default RoundButton
