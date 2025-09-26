#!/usr/bin/env python3
"""
Pomodoro Timer - Main Entry Point
Professional Student-Friendly Pomodoro Timer Desktop Application

Run this file to start the application:
python main.py

Features:
- Standard Pomodoro technique (25min work, 5min break, 15min long break)
- Beautiful background images with fallback gradients
- Customizable timer colors and fonts
- LoFi music integration with playlist support
- Student-friendly progress tracking and motivational messages
- Distraction-free, aesthetic interface
- Keyboard shortcuts for all functions
- Settings persistence

Controls:
- SPACE: Start/Pause timer
- R: Reset timer
- B: Change background
- M: Toggle music
- N: Next track
- P: Previous track
- H: Toggle help
- F: Toggle fullscreen
- ESC: Quit application
"""

import sys
import os

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    import pygame
    from ui import UI
    
    def main():
        """Main entry point for the Pomodoro Timer application"""
        print("=" * 60)
        print("🍅 POMODORO TIMER - FOCUS & STUDY 🍅")
        print("=" * 60)
        print("Welcome to your personal study companion!")
        print("This app will help you maintain focus using the Pomodoro Technique.")
        print()
        print("📚 How it works:")
        print("• 25 minutes of focused work")
        print("• 5 minute short breaks")
        print("• 15 minute long break after 4 work sessions")
        print()
        print("🎮 Controls:")
        print("• SPACE - Start/Pause timer")
        print("• R - Reset timer")
        print("• B - Change background")
        print("• M - Toggle music")
        print("• H - Show/hide help")
        print("• ESC - Quit")
        print()
        print("🎵 Music:")
        print("• Add .mp3, .wav, or .ogg files to this folder for background music")
        print("• Music will automatically loop during work sessions")
        print()
        print("Starting application...")
        print("=" * 60)
        
        try:
            # Initialize and run the application
            app = UI()
            app.run()
            
        except Exception as e:
            print(f"Error running application: {e}")
            print("Please make sure pygame is installed: pip install pygame")
            return 1
            
        print("Thank you for using Pomodoro Timer! Stay focused! 🌟")
        return 0
        
    if __name__ == "__main__":
        sys.exit(main())
        
except ImportError as e:
    print("Error: Required dependencies not found!")
    print(f"Import error: {e}")
    print()
    print("Please install the required dependencies:")
    print("pip install pygame")
    print()
    print("Or install from requirements.txt:")
    print("pip install -r requirements.txt")
    sys.exit(1)
