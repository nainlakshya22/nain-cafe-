import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

const MusicContext = createContext(null)

export const TRACKLIST = [
  {
    id: 'trk-1',
    title: 'Barrington St. Blue Note',
    artist: 'The Aashu Smoky Trio',
    album: 'Warm Tubes & Fresh Beans',
    duration: 215, // seconds
    durationFormatted: '3:35',
  },
  {
    id: 'trk-2',
    title: 'Autumn in Halifax',
    artist: 'Analog Vinyl Ensemble',
    album: 'Side A: Slower Days',
    duration: 198,
    durationFormatted: '3:18',
  },
  {
    id: 'trk-3',
    title: 'Slow Drip & Warm Tubes',
    artist: 'Cedar & Brass',
    album: 'Late Afternoon Sessions',
    duration: 242,
    durationFormatted: '4:02',
  },
]

export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const audioContextRef = useRef(null)
  const gainNodeRef = useRef(null)
  const synthIntervalRef = useRef(null)
  const timerRef = useRef(null)

  const currentTrack = TRACKLIST[currentTrackIndex]

  // Setup Web Audio Synthesizer for warm soothing lofi chord progression & vinyl crackle
  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        const ctx = new AudioCtx()
        const gainNode = ctx.createGain()
        gainNode.gain.value = isMuted ? 0 : volume * 0.15
        gainNode.connect(ctx.destination)
        audioContextRef.current = ctx
        gainNodeRef.current = gainNode
      }
    }
  }

  // Generate warm melodic lofi chord progression
  const playLofiChords = () => {
    if (!audioContextRef.current || audioContextRef.current.state === 'suspended') {
      audioContextRef.current?.resume()
    }
    const ctx = audioContextRef.current
    const mainGain = gainNodeRef.current
    if (!ctx || !mainGain) return

    // Soft Rhodes / Jazz chords (Dm9, G13, Cmaj9, A7alt)
    const chords = [
      [146.83, 220.00, 261.63, 329.63], // Dm9
      [196.00, 246.94, 329.63, 392.00], // G13
      [130.81, 196.00, 246.94, 329.63], // Cmaj9
      [220.00, 277.18, 329.63, 392.00], // A7
    ]

    let chordIdx = 0

    const triggerChord = () => {
      if (!audioContextRef.current) return
      const now = ctx.currentTime
      const chord = chords[chordIdx % chords.length]
      chordIdx++

      chord.forEach((freq) => {
        const osc = ctx.createOscillator()
        const filter = ctx.createBiquadFilter()
        const noteGain = ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now)

        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(450, now)
        filter.frequency.exponentialRampToValueAtTime(180, now + 3.5)

        noteGain.gain.setValueAtTime(0, now)
        noteGain.gain.linearRampToValueAtTime(0.08, now + 0.15)
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8)

        osc.connect(filter)
        filter.connect(noteGain)
        noteGain.connect(mainGain)

        osc.start(now)
        osc.stop(now + 4)
      })

      // Soft vinyl crackle sound
      try {
        const bufferSize = ctx.sampleRate * 0.2
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const output = noiseBuffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.015
        }
        const whiteNoise = ctx.createBufferSource()
        whiteNoise.buffer = noiseBuffer
        const crackleFilter = ctx.createBiquadFilter()
        crackleFilter.type = 'bandpass'
        crackleFilter.frequency.value = 1200
        const crackleGain = ctx.createGain()
        crackleGain.gain.value = 0.03
        whiteNoise.connect(crackleFilter)
        crackleFilter.connect(crackleGain)
        crackleGain.connect(mainGain)
        whiteNoise.start(now)
      } catch (e) {
        // audio buffer fallback
      }
    }

    triggerChord()
    synthIntervalRef.current = setInterval(triggerChord, 4000)
  }

  const stopLofiChords = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current)
      synthIntervalRef.current = null
    }
  }

  const togglePlay = () => {
    initAudio()
    if (isPlaying) {
      setIsPlaying(false)
      stopLofiChords()
      if (timerRef.current) clearInterval(timerRef.current)
    } else {
      setIsPlaying(true)
      playLofiChords()
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.duration) {
            nextTrack()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
  }

  const nextTrack = () => {
    setCurrentTime(0)
    setCurrentTrackIndex((idx) => (idx + 1) % TRACKLIST.length)
  }

  const prevTrack = () => {
    setCurrentTime(0)
    setCurrentTrackIndex((idx) => (idx - 1 + TRACKLIST.length) % TRACKLIST.length)
  }

  const handleVolumeChange = (newVol) => {
    const v = parseFloat(newVol)
    setVolume(v)
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : v * 0.15
    }
  }

  const toggleMute = () => {
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = nextMuted ? 0 : volume * 0.15
    }
  }

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  useEffect(() => {
    return () => {
      stopLofiChords()
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  const progressPercent = Math.min(100, (currentTime / currentTrack.duration) * 100)

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        currentTrack,
        currentTrackIndex,
        togglePlay,
        nextTrack,
        prevTrack,
        volume,
        setVolume: handleVolumeChange,
        isMuted,
        toggleMute,
        currentTime,
        currentTimeFormatted: formatTime(currentTime),
        durationFormatted: currentTrack.durationFormatted,
        progressPercent,
        isExpanded,
        setIsExpanded,
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}
