export interface ThemeMapping {
  [memberId: string]: {
    audioSrc: string
    themeName: string
    description: string
    startTime: number // in seconds
    duration: number // in seconds
  }
}

export const themeMapping: ThemeMapping = {
  'tony-stark': {
    audioSrc: '/music/tony.mp3',
    themeName: 'Avengers Theme',
    description: 'Epic heroic theme for the genius inventor',
    startTime: 60, // 1:00
    duration: 10
  },
  'daenerys-targaryen': {
    audioSrc: '/music/daenerys.mp3',
    themeName: 'Game of Thrones Theme',
    description: 'Powerful orchestral theme for the Mother of Dragons',
    startTime: 46, // 0:46
    duration: 15 // Exception: 15 seconds
  },
  'rhaenyra-targaryen': {
    audioSrc: '/music/rhaenyra.mp3',
    themeName: 'House of the Dragon Theme',
    description: 'Regal theme for the rightful heir',
    startTime: 72, // 1:12
    duration: 10
  },
  'alex-dunphy': {
    audioSrc: '/music/alex.mp3',
    themeName: 'Sherlock Theme',
    description: 'Intellectual and mysterious theme for the genius',
    startTime: 0, // 0:00
    duration: 10
  },
  'jake-peralta': {
    audioSrc: '/music/jake.mp3',
    themeName: 'Brooklyn Nine-Nine Theme',
    description: 'Upbeat detective theme',
    startTime: 0, // 0:00 (assuming jake.mp3 exists)
    duration: 10
  },
  'paxton-hall-yoshida': {
    audioSrc: '/music/paxton.mp3',
    themeName: 'Never Have I Ever Theme',
    description: 'Modern teen drama theme',
    startTime: 0, // 0:00
    duration: 15 // Exception: 15 seconds
  }
}

// Fallback theme for members without specific themes
export const defaultTheme = {
  audioSrc: '/music/default.mp3',
  themeName: 'AEGIS Theme',
  description: 'Default diplomatic theme',
  startTime: 0,
  duration: 10
} 