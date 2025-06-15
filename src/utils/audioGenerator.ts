// Utility to generate placeholder audio files for demonstration
// In a real implementation, you would use actual theme songs

export const generatePlaceholderAudio = (frequency: number, duration: number = 5): string => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const sampleRate = audioContext.sampleRate
  const numSamples = sampleRate * duration
  
  const buffer = audioContext.createBuffer(2, numSamples, sampleRate) // Stereo
  const leftChannel = buffer.getChannelData(0)
  const rightChannel = buffer.getChannelData(1)
  
  // Generate a more complex melody pattern
  for (let i = 0; i < numSamples; i++) {
    const time = i / sampleRate
    
    // Main melody line
    const mainNote = Math.sin(2 * Math.PI * frequency * time) * 0.4
    const harmony = Math.sin(2 * Math.PI * (frequency * 1.25) * time) * 0.25
    const bass = Math.sin(2 * Math.PI * (frequency * 0.5) * time) * 0.15
    
    // Add some arpeggiation
    const arpeggio = Math.sin(2 * Math.PI * (frequency * 1.5) * time * (1 + Math.sin(time * 4) * 0.1)) * 0.2
    
    // Create rhythm with envelope
    const beatPattern = Math.floor(time * 4) % 4
    const envelope = beatPattern === 0 ? 1 : (beatPattern === 2 ? 0.7 : 0.4)
    const fadeEnvelope = Math.sin(time * Math.PI / duration) // Fade in/out over duration
    
    // Add some reverb-like effect
    const delay = Math.floor(sampleRate * 0.1) // 100ms delay
    const delayedSample = i > delay ? (leftChannel[i - delay] || 0) * 0.3 : 0
    
    const leftSample = (mainNote + harmony + bass + arpeggio) * envelope * fadeEnvelope + delayedSample
    const rightSample = (mainNote * 0.8 + harmony * 1.2 + arpeggio * 0.9) * envelope * fadeEnvelope + delayedSample * 0.8
    
    leftChannel[i] = Math.max(-1, Math.min(1, leftSample * 0.6))
    rightChannel[i] = Math.max(-1, Math.min(1, rightSample * 0.6))
  }
  
  // Convert to WAV blob URL
  const wavBlob = bufferToWav(buffer)
  return URL.createObjectURL(wavBlob)
}

function bufferToWav(buffer: AudioBuffer): Blob {
  const length = buffer.length
  const numChannels = buffer.numberOfChannels
  const bytesPerSample = 2
  const dataSize = length * numChannels * bytesPerSample
  const arrayBuffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(arrayBuffer)
  
  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }
  
  writeString(0, 'RIFF')
  view.setUint32(4, 36 + dataSize, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true) // PCM format
  view.setUint16(22, numChannels, true)
  view.setUint32(24, buffer.sampleRate, true)
  view.setUint32(28, buffer.sampleRate * numChannels * bytesPerSample, true)
  view.setUint16(32, numChannels * bytesPerSample, true)
  view.setUint16(34, 16, true) // bits per sample
  writeString(36, 'data')
  view.setUint32(40, dataSize, true)
  
  // Convert float samples to 16-bit PCM (interleaved for stereo)
  let offset = 44
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel)
      const sample = Math.max(-1, Math.min(1, channelData[i]))
      view.setInt16(offset, sample * 0x7FFF, true)
      offset += 2
    }
  }
  
  return new Blob([arrayBuffer], { type: 'audio/wav' })
}

// Predefined theme frequencies for different characters
// Using musical scales and chord progressions for more distinctive themes
export const themeFrequencies = {
  'tony-stark': 440,        // A4 - Heroic Avengers-style (A major)
  'daenerys-targaryen': 293.66, // D4 - Powerful and regal (D minor)
  'rhaenyra-targaryen': 329.63, // E4 - Noble and dramatic (E minor)
  'alex-dunphy': 523.25,    // C5 - Bright and intellectual (C major)
  'jake-peralta': 369.99,   // F#4 - Upbeat and quirky (F# major)
  'paxton-hall-yoshida': 261.63 // C4 - Youthful and warm (C major, lower octave)
} 