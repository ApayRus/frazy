let youtube = null
let wavesurfer = null

const init = reference => {
  youtube = reference
  console.log(youtube)
  youtube.mute()
}

const initWavesurfer = reference => {
  wavesurfer = reference
  wavesurfer.on('play', () => {
    youtube.playVideo()
  })
  wavesurfer.on('pause', () => {
    youtube.pauseVideo()
  })
  wavesurfer.on('seek', progress => {
    const duration = youtube.getDuration()
    youtube.seekTo(duration * progress)
  })
  wavesurfer.on('region-click', (region, e) => {
    youtube.seekTo(region.start)
  })
}

export default { init, initWavesurfer, youtube }
