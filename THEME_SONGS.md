# 🎵 AEGIS MUN Theme Songs Feature

## Overview
The AEGIS MUN website now features personalized theme songs for each team member! Click on any team member's profile card to hear their unique theme song.

## Features

### 🎼 Personalized Themes
Each team member has a unique theme song with precise timing:

- **Tony Stark** - Avengers Theme (starts at 1:00, plays for 10 seconds)
- **Daenerys Targaryen** - Game of Thrones Theme (starts at 0:46, plays for 15 seconds)
- **Rhaenyra Targaryen** - House of the Dragon Theme (starts at 1:12, plays for 10 seconds)
- **Alex Dunphy** - Sherlock Theme (starts at 0:00, plays for 10 seconds)
- **Jake Peralta** - Brooklyn Nine-Nine Theme (starts at 0:00, plays for 10 seconds)
- **Paxton Hall-Yoshida** - Never Have I Ever Theme (starts at 0:00, plays for 15 seconds)

### 🎛️ Audio Controls
- **Volume Control** - Adjust playback volume with the slider
- **Mute/Unmute** - Toggle audio on/off
- **Stop** - Stop current theme playback
- **Visual Indicators** - See which member's theme is currently playing

### 🔔 Smart Notifications & Dialogs
- Beautiful notification popup shows current theme information
- Auto-dismisses after theme duration
- Manual close option available
- Continue dialog appears after theme ends asking if user wants to hear the full song
- Options to continue playing or stop

### 🎨 Visual Feedback
- Selected team member cards are highlighted with glowing border
- Animated audio indicator on active member's card
- Hover effects show "Click for theme" hints
- Audio controls appear only when music is playing

## Technical Implementation

### Audio Playback
- Uses actual MP3 theme song files from `/music/` directory
- Precise timestamp control for theme start times
- Customizable duration per character (10-15 seconds)
- Smooth fade in/out transitions
- Continue dialog after theme completion

### State Management
- React hooks for audio state management
- Smooth fade transitions between themes
- Memory-efficient blob URL management
- Error handling for audio playback failures

### User Experience
- Click same member to stop their theme
- Only one theme plays at a time
- Responsive design works on all devices
- Accessibility considerations included

## Usage

1. Navigate to the Team page
2. Click on any team member's profile card
3. Enjoy their personalized theme song (10-15 seconds)
4. Use the floating audio controls to adjust volume, mute, or stop playback
5. When the theme ends, choose to continue listening to the full song or stop
6. Click the same member again to stop their theme

## Future Enhancements

- Add more sophisticated audio effects and equalizer
- Implement playlist functionality for multiple themes
- Add theme song customization options for users
- Include lyrics or theme descriptions
- Add keyboard shortcuts for audio controls
- Implement audio visualization effects

---

*Note: The system now uses actual MP3 theme song files with precise timestamp control for the best user experience.* 