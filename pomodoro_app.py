#!/usr/bin/env python3
"""
Professional Student-Friendly Pomodoro Timer
A desktop application built with Pygame for focused study sessions.

Features:
- Standard Pomodoro technique (25min work, 5min break, 15min long break)
- Customizable backgrounds, timer colors, and fonts
- LoFi music integration with playlist support
- Student-friendly progress tracking and motivational messages
- Distraction-free, aesthetic interface
"""

import pygame
import sys
import os
import json
import time
import random
from enum import Enum
from typing import Dict, List, Optional, Tuple

# Initialize Pygame
pygame.init()
pygame.mixer.init()

class TimerState(Enum):
    """Enum for different timer states"""
    WORK = "work"
    SHORT_BREAK = "short_break"
    LONG_BREAK = "long_break"
    PAUSED = "paused"
    STOPPED = "stopped"

class Timer:
    """Handles Pomodoro timer logic and state management"""
    
    def __init__(self):
        # Default durations in seconds
        self.work_duration = 25 * 60  # 25 minutes
        self.short_break_duration = 5 * 60  # 5 minutes
        self.long_break_duration = 15 * 60  # 15 minutes
        
        # Timer state
        self.state = TimerState.STOPPED
        self.time_remaining = self.work_duration
        self.start_time = 0
        self.paused_time = 0
        
        # Pomodoro tracking
        self.completed_pomodoros = 0
        self.current_cycle = 1  # 1-4, resets after long break
        
    def start(self):
        """Start or resume the timer"""
        if self.state == TimerState.STOPPED:
            self.state = TimerState.WORK
            self.time_remaining = self.work_duration
        elif self.state == TimerState.PAUSED:
            self.state = TimerState.WORK if self.current_cycle <= 4 else TimerState.SHORT_BREAK
        
        self.start_time = time.time() - self.paused_time
        
    def pause(self):
        """Pause the timer"""
        if self.state in [TimerState.WORK, TimerState.SHORT_BREAK, TimerState.LONG_BREAK]:
            self.paused_time = time.time() - self.start_time
            self.state = TimerState.PAUSED
            
    def reset(self):
        """Reset the timer to initial state"""
        self.state = TimerState.STOPPED
        self.time_remaining = self.work_duration
        self.start_time = 0
        self.paused_time = 0
        
    def update(self):
        """Update timer state and handle transitions"""
        if self.state in [TimerState.WORK, TimerState.SHORT_BREAK, TimerState.LONG_BREAK]:
            elapsed = time.time() - self.start_time
            
            if self.state == TimerState.WORK:
                self.time_remaining = max(0, self.work_duration - elapsed)
            elif self.state == TimerState.SHORT_BREAK:
                self.time_remaining = max(0, self.short_break_duration - elapsed)
            elif self.state == TimerState.LONG_BREAK:
                self.time_remaining = max(0, self.long_break_duration - elapsed)
            
            # Check if timer finished
            if self.time_remaining <= 0:
                self._handle_timer_completion()
                
    def _handle_timer_completion(self):
        """Handle timer completion and state transitions"""
        if self.state == TimerState.WORK:
            self.completed_pomodoros += 1
            self.current_cycle += 1
            
            # Determine next state
            if self.current_cycle > 4:
                self.state = TimerState.LONG_BREAK
                self.time_remaining = self.long_break_duration
                self.current_cycle = 1  # Reset cycle
            else:
                self.state = TimerState.SHORT_BREAK
                self.time_remaining = self.short_break_duration
                
        elif self.state in [TimerState.SHORT_BREAK, TimerState.LONG_BREAK]:
            self.state = TimerState.WORK
            self.time_remaining = self.work_duration
            
        self.start_time = time.time()
        
    def get_formatted_time(self) -> str:
        """Get formatted time string (MM:SS)"""
        minutes = int(self.time_remaining // 60)
        seconds = int(self.time_remaining % 60)
        return f"{minutes:02d}:{seconds:02d}"
        
    def get_progress_percentage(self) -> float:
        """Get current progress as percentage"""
        if self.state == TimerState.WORK:
            total = self.work_duration
        elif self.state == TimerState.SHORT_BREAK:
            total = self.short_break_duration
        elif self.state == TimerState.LONG_BREAK:
            total = self.long_break_duration
        else:
            return 0.0
            
        return (total - self.time_remaining) / total * 100

class Settings:
    """Manages application settings and preferences"""
    
    def __init__(self, config_file: str = "pomodoro_config.json"):
        self.config_file = config_file
        self.settings = self._load_default_settings()
        self.load_settings()
        
    def _load_default_settings(self) -> Dict:
        """Load default settings"""
        return {
            "work_duration": 25,  # minutes
            "short_break_duration": 5,  # minutes
            "long_break_duration": 15,  # minutes
            # Background selection (filename) if present in folder
            "background_file": "ocean.webp",
            "timer_color": (255, 255, 255),  # white
            # Timer font family: 'sans', 'serif', 'mono', or 'custom'
            "timer_font_family": "sans",
            # Optional custom TTF file to use when timer_font_family == 'custom'
            "custom_font_file": "",
            "timer_size": 72,
            "music_enabled": True,
            "music_volume": 0.7,
            "current_playlist": 0,
            # Auto-pause music during breaks
            "music_pause_on_breaks": True,
            "window_width": 1200,
            "window_height": 800,
            "fullscreen": False
        }
        
    def load_settings(self):
        """Load settings from config file"""
        try:
            if os.path.exists(self.config_file):
                with open(self.config_file, 'r') as f:
                    saved_settings = json.load(f)
                    self.settings.update(saved_settings)
        except Exception as e:
            print(f"Error loading settings: {e}")
            
    def save_settings(self):
        """Save current settings to config file"""
        try:
            with open(self.config_file, 'w') as f:
                json.dump(self.settings, f, indent=2)
        except Exception as e:
            print(f"Error saving settings: {e}")
            
    def get(self, key: str, default=None):
        """Get setting value"""
        return self.settings.get(key, default)
        
    def set(self, key: str, value):
        """Set setting value"""
        self.settings[key] = value

class MusicPlayer:
    """Handles background music playback"""
    
    def __init__(self, music_folder: str = "."):
        self.music_folder = music_folder
        self.playlist = self._discover_music_files()
        self.current_track = 0
        self.is_playing = False
        self.volume = 0.7
        
    def _discover_music_files(self) -> List[str]:
        """Discover music files in the folder"""
        music_extensions = ['.mp3', '.wav', '.ogg']
        music_files = []
        
        try:
            for file in os.listdir(self.music_folder):
                if any(file.lower().endswith(ext) for ext in music_extensions):
                    music_files.append(os.path.join(self.music_folder, file))
        except Exception as e:
            print(f"Error discovering music files: {e}")
            
        return music_files
        
    def play(self):
        """Start playing music"""
        if self.playlist and not self.is_playing:
            try:
                pygame.mixer.music.load(self.playlist[self.current_track])
                pygame.mixer.music.set_volume(self.volume)
                pygame.mixer.music.play(-1)  # Loop indefinitely
                self.is_playing = True
            except Exception as e:
                print(f"Error playing music: {e}")
                
    def pause(self):
        """Pause music playback"""
        if self.is_playing:
            pygame.mixer.music.pause()
            self.is_playing = False
            
    def resume(self):
        """Resume music playback"""
        if not self.is_playing:
            pygame.mixer.music.unpause()
            self.is_playing = True
            
    def stop(self):
        """Stop music playback"""
        pygame.mixer.music.stop()
        self.is_playing = False
        
    def next_track(self):
        """Play next track in playlist"""
        if self.playlist:
            self.current_track = (self.current_track + 1) % len(self.playlist)
            if self.is_playing:
                self.stop()
                self.play()
                
    def previous_track(self):
        """Play previous track in playlist"""
        if self.playlist:
            self.current_track = (self.current_track - 1) % len(self.playlist)
            if self.is_playing:
                self.stop()
                self.play()
                
    def set_volume(self, volume: float):
        """Set music volume (0.0 to 1.0)"""
        self.volume = max(0.0, min(1.0, volume))
        pygame.mixer.music.set_volume(self.volume)
        
    def get_current_track_name(self) -> str:
        """Get current track filename"""
        if self.playlist:
            return os.path.basename(self.playlist[self.current_track])
        return "No music available"

if __name__ == "__main__":
    # This will be implemented in the UI class
    print("Pomodoro Timer - Run with UI class")
