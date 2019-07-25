import React from 'react'
import './App.css'
import Player from './components/Player'
import Waveform from './components/Waveform'
import AppBar from './components/AppBar'

function App() {
  return (
    <div className='App'>
      <AppBar />
      <Waveform />
      <Player />
    </div>
  )
}

export default App
