# Quiz App

A cross-platform interactive quiz application built with React Native and Expo, featuring a modern UI and real-time quiz functionality.

## Overview

This is a mobile-first quiz application that allows users to join or start quizzes on various topics, answer multiple-choice questions, and track their past quiz performance. The app uses Expo Router for navigation and features a clean, intuitive interface with tab-based navigation.

## Features

- **Quiz Management**: Start or join quizzes on custom topics
- **Interactive Question Flow**: Answer multiple-choice questions with visual feedback
- **Progress Tracking**: Visual progress bar showing quiz completion status
- **Answer Validation**: Immediate feedback on correct/incorrect answers with color-coded responses
- **Quiz History**: View past quiz attempts and scores
- **Tab Navigation**: Easy navigation between Home and Account screens
- **Dynamic Question Loading**: Questions fetched from external API
- **Responsive Design**: Optimized for both iOS and Android devices

## Tech Stack

- **Framework**: React Native 0.81.5
- **Runtime**: Expo SDK 54
- **Navigation**: Expo Router 6.0 with file-based routing
- **Language**: TypeScript 5.9
- **UI Components**: React Native core components
- **Icons**: Expo Vector Icons (Ionicons)
- **Animation**: React Native Reanimated 4.1
- **Gestures**: React Native Gesture Handler 2.28
- **State Management**: React Hooks (useState, useEffect)

## Project Structure

```
app/
├── (tabs)/              # Tab navigation group
│   ├── _layout.tsx      # Tab layout configuration
│   ├── index.tsx        # Home screen (quiz start/join)
│   └── account.tsx      # Account/profile screen
└── quiz/                # Quiz feature
    ├── _layout.tsx      # Quiz layout wrapper
    └── index.tsx        # Quiz question screen
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ReactNative
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality
- `npm run reset-project` - Reset to blank project template

## Development

### Running the App

After starting the development server, you can run the app on:

- **Physical Device**: Scan the QR code with Expo Go app
- **iOS Simulator**: Press `i` in terminal (macOS only)
- **Android Emulator**: Press `a` in terminal
- **Web Browser**: Press `w` in terminal

### Building for Production

The project is configured with EAS Build for production deployments:

```bash
# Development build
eas build --profile development

# Preview build
eas build --profile preview

# Production build
eas build --profile production
```

## App Configuration

- **App Name**: Quiz App
- **Package**: com.raaddalwai.quiz
- **Version**: 1.0.1
- **Orientation**: Portrait only
- **New Architecture**: Enabled
- **Features**: Edge-to-edge display on Android, custom splash screen

## Key Features Implementation

### Home Screen (Quiz Start)
- Topic input field for quiz customization
- Dual action buttons: Join Quiz and Start Quiz
- FlatList displaying past quiz history with scores
- Input validation before quiz navigation

### Quiz Screen
- Dynamic question rendering from API
- Four multiple-choice options per question
- Color-coded answer feedback (green for correct, red for incorrect)
- Progress bar tracking quiz completion
- Next button enabled only after attempting current question
- Auto-loading of new question sets
- Automatic navigation after completing all question sets

### Navigation
- Tab-based navigation with Home and Account tabs
- Custom tab bar icons using Ionicons
- Color-themed navigation elements
- Hidden headers for cleaner UI

## API Integration

The app fetches quiz questions from an external JSON API:
```
https://raaddalwai.github.io/json-testing/myapi.json
```

Later on this can be changed with Gemini API to get new questions based on the topic entered.

Expected JSON structure:
```json
{
  "questions": [
    {
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": "0"  // Index of correct option
    }
  ]
}
```

## Styling

The app uses a custom color scheme:
- Primary: `#1aad9f` (Teal)
- Secondary: `#41cdbfff` (Light Teal)
- Success: `#aaffbeff` (Light Green)
- Error: `#ffe7e6ff` (Light Red)
- Background: `#f9f9f9` (Light Gray)

## Future Enhancements

Potential improvements based on the current codebase:
- Implement user authentication and account management
- Add score tracking and leaderboards
- Persist quiz history locally using AsyncStorage
- Add timer functionality for timed quizzes
- Implement quiz sharing functionality
- Add support for different quiz difficulty levels
- Integrate backend for real-time multiplayer quizzes

## Requirements

- Node.js 16+
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development on macOS)
- Android Studio and Android SDK (for Android development)

## License

This project is private and not licensed for public distribution.

## Contributing

This is a private project. Please contact the repository owner for contribution guidelines.
