# 🎵 YouTube Music Integration Feature

## Overview
The AEGIS MUN website now features a comprehensive YouTube Music integration that allows users to listen to background music while browsing the site, complete with synchronized lyrics display.

## Features

### 🎼 Music Search & Playback
- **Smart Search**: Users can search for songs by name and artist
- **Instant Playback**: First matching result plays automatically
- **Background Audio**: Music continues playing while navigating the site
- **YouTube Integration**: Uses YouTube's vast music library

### 🎤 Synchronized Lyrics
- **Real-time Display**: Lyrics appear line by line as the song progresses
- **Smart Positioning**: Lyrics position adapts to current page layout
- **Background Effect**: 70% opacity ensures lyrics don't interfere with content
- **Automatic Detection**: Only shows lyrics when available and space permits

### 🎛️ User Controls
- **Floating Music Button**: Easy access music control on home page
- **Search Interface**: Clean search form with song name and artist fields
- **Now Playing Display**: Shows current song information
- **Stop/Play Toggle**: Simple one-click music control

### 🎨 Visual Integration
- **Page-Aware Positioning**: Lyrics position changes based on current page:
  - **Home**: Center-right area
  - **Team**: Top-left area  
  - **Committees**: Bottom-right area
  - **Agendas**: Center-left area
- **Smooth Animations**: Fade in/out transitions for lyrics
- **Responsive Design**: Works on all device sizes
- **Theme Integration**: Matches AEGIS color scheme

## Technical Implementation

### Core Components
- **`MusicSearchWidget`**: Floating search interface and controls
- **`LyricsDisplay`**: Synchronized lyrics rendering component
- **`MusicProvider`**: Global state management context
- **`useYouTubeMusic`**: Main music management hook

### YouTube Integration
- **YouTube IFrame Player API**: Proper audio playback
- **Hidden Player**: Invisible player for background audio
- **State Management**: Tracks playback state and time
- **Error Handling**: Graceful fallbacks for API failures

### Lyrics System
- **Mock Database**: Demo lyrics for common songs
- **Time Synchronization**: Precise timing with song playback
- **Smart Display**: Only shows when space is available
- **Production Ready**: Designed for real lyrics API integration

### State Management
- **Global Context**: Music state shared across all pages
- **React Hooks**: Modern state management patterns
- **Memory Efficient**: Proper cleanup and resource management
- **Performance Optimized**: Minimal re-renders and updates

## Usage Instructions

### For Users
1. **Navigate to Home Page**: Music button appears in bottom-left corner
2. **Click Music Button**: Opens search interface
3. **Enter Song Details**: Type song name and optionally artist name
4. **Automatic Playback**: First matching song plays immediately
5. **Enjoy Lyrics**: Synchronized lyrics appear in background (if available)
6. **Stop Anytime**: Click the red stop button to end playback

### For Developers
1. **API Integration**: Replace mock search with real YouTube Data API
2. **Lyrics Service**: Integrate with Genius, Musixmatch, or LyricFind API
3. **Customization**: Modify positioning and styling in `LyricsDisplay`
4. **Extension**: Add playlist functionality or user preferences

## Configuration

### YouTube API Setup
```typescript
// In src/utils/youtubeMusic.ts
const YOUTUBE_API_KEY = 'YOUR_ACTUAL_API_KEY'
```

### Lyrics API Integration
```typescript
// Example integration with lyrics service
const getLyricsFromAPI = async (songTitle: string, artist: string) => {
  // Implement real lyrics API call
  return await lyricsAPI.search(songTitle, artist)
}
```

### Positioning Customization
```typescript
// In src/components/LyricsDisplay.tsx
const getPositionClasses = () => {
  // Customize lyrics positioning per page
  switch (onCurrentPage) {
    case '/custom-page':
      return 'top-20 right-10 text-center'
    // ... other cases
  }
}
```

## Browser Compatibility

### Supported Features
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Support**: iOS Safari, Chrome Mobile
- **Autoplay**: Works where browser policies allow
- **Background Audio**: Continues during navigation

### Limitations
- **Autoplay Restrictions**: Some browsers require user interaction
- **Mobile Limitations**: Background audio may pause on mobile
- **API Rate Limits**: YouTube API has usage quotas
- **Copyright**: Some content may be region-restricted

## Future Enhancements

### Planned Features
- **Playlist Support**: Create and manage music playlists
- **User Preferences**: Save favorite songs and settings
- **Volume Control**: Adjustable audio levels
- **Equalizer**: Audio enhancement options
- **Social Features**: Share songs with other users

### Advanced Integration
- **Real Lyrics APIs**: Genius, Musixmatch, LyricFind integration
- **Music Recognition**: Shazam-like song identification
- **Recommendation Engine**: Suggest music based on page content
- **Offline Support**: Cache popular songs for offline playback

## Performance Considerations

### Optimization
- **Lazy Loading**: YouTube API loads only when needed
- **Memory Management**: Proper cleanup of audio resources
- **Efficient Updates**: Minimal DOM manipulation for lyrics
- **Bandwidth Aware**: Respects user's data preferences

### Monitoring
- **Error Tracking**: Comprehensive error handling and logging
- **Usage Analytics**: Track popular songs and features
- **Performance Metrics**: Monitor load times and responsiveness
- **User Feedback**: Collect feedback for improvements

---

*This feature enhances the AEGIS MUN experience by adding an immersive musical dimension to the website, making browsing more engaging while maintaining focus on the primary content.* 