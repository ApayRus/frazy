import React from 'react'
import YouTube from 'react-youtube'

export default function YoutubePlayer(props) {
  const opts = {
    width: '100%',
    height: 200,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  }

  const onReady = event => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo()
    console.log('onReady, event.target', event.target)
  }
  return (
    <div>
      <YouTube videoId={props.videoId} opts={opts} onReady={onReady} />
    </div>
  )
}
