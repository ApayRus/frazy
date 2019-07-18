import React from 'react'
import { PlayArrow, Pause, SkipNext, SkipPrevious, Replay, Edit } from '@material-ui/icons';
import { IconButton } from '@material-ui/core'

function PlayerControls() {
    return (
        <div className="playerControls">
            <IconButton aria-label="Previous">
                <SkipPrevious />
            </IconButton>
            <IconButton aria-label="Play">
                <PlayArrow />
            </IconButton>
            <IconButton aria-label="Pause">
                <Pause />
            </IconButton>
            <IconButton aria-label="Dictation">
                <Edit />
            </IconButton>
            <IconButton aria-label="Replay">
                <Replay />
            </IconButton>
            <IconButton aria-label="Next">
                <SkipNext />
            </IconButton>
        </div>
    )
}

export default PlayerControls
