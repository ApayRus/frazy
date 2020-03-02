import React from 'react'
import YouTube from 'react-youtube'
import youtubeModule from '../youtube/youtube'

export default function YoutubePlayer(props) {
  const opts = {
    width: '100%',
    height: 200,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      controls: 0,
      autoplay: 0
    }
  }

  const onReady = event => {
    youtubeModule.init(event.target)
  }
  return (
    <div>
      <YouTube videoId={props.videoId} opts={opts} onReady={onReady} />
    </div>
  )
}
