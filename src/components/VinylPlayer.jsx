import React, { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Disc3,
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { useMusic } from '../context/MusicContext.jsx'

export default function VinylPlayer() {
  const {
    isPlaying,
    currentTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    currentTimeFormatted,
    durationFormatted,
    progressPercent,
  } = useMusic()

  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`vinyl-player-dock ${expanded ? 'expanded' : 'collapsed'}`}>
      {/* Vinyl Disc with spin animation */}
      <div className={`vinyl-disc-wrap ${isPlaying ? 'spinning' : ''}`} onClick={togglePlay}>
        <div className="vinyl-disc">
          <div className="vinyl-groove-ring ring-1" />
          <div className="vinyl-groove-ring ring-2" />
          <div className="vinyl-groove-ring ring-3" />
          <div className="vinyl-center-label">
            <span className="vinyl-needle-dot" />
            <Disc3 size={16} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Track Info */}
      <div className="vinyl-track-info" onClick={() => setExpanded(!expanded)}>
        <div className="track-title-row">
          <span className="track-live-pulse" />
          <strong className="track-name">{currentTrack.title}</strong>
        </div>
        <span className="track-artist">{currentTrack.artist}</span>

        {/* Mini progress line */}
        <div className="mini-progress-bar">
          <div className="mini-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Main Play/Pause Button */}
      <button
        className="vinyl-play-btn"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play vinyl track'}
      >
        {isPlaying ? <Pause size={17} /> : <Play size={17} />}
      </button>

      {/* Expand / Collapse toggle */}
      <button
        className="vinyl-expand-btn"
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? 'Minimize player' : 'Expand player controls'}
      >
        {expanded ? <ChevronDown size={17} /> : <ChevronUp size={17} />}
      </button>

      {/* Expanded Deck Controls */}
      {expanded && (
        <div className="vinyl-expanded-controls">
          <div className="expanded-time-row">
            <span>{currentTimeFormatted}</span>
            <div className="expanded-progress-track">
              <div
                className="expanded-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span>{durationFormatted}</span>
          </div>

          <div className="expanded-buttons-row">
            <button
              onClick={prevTrack}
              aria-label="Previous track"
              className="player-control-icon-btn"
            >
              <SkipBack size={16} />
            </button>

            <button
              onClick={togglePlay}
              className="player-main-cta"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              onClick={nextTrack}
              aria-label="Next track"
              className="player-control-icon-btn"
            >
              <SkipForward size={16} />
            </button>

            <div className="volume-control-wrap">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="player-control-icon-btn"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(e.target.value)}
                className="volume-slider"
                aria-label="Volume slider"
              />
            </div>
          </div>
          <span className="ambient-lofi-notice">
            ♫ Audiophile Vinyl Lounge Audio • Non-blocking analog stream
          </span>
        </div>
      )}
    </div>
  )
}
