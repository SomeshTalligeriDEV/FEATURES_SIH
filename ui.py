"""
UI Module for Pomodoro Timer
Handles all visual rendering, user interface, and interactions.
"""

import pygame
import os
import math
import time
from typing import Tuple, List, Optional
from pomodoro_app import Timer, Settings, MusicPlayer, TimerState
from settings_menu import SettingsMenu

class UI:
    """Main UI class handling all visual elements and user interactions"""
    
    def __init__(self):
        # Initialize components
        self.settings = Settings()
        self.timer = Timer()
        self.music_player = MusicPlayer()
        
        # Set up display
        self.screen_width = self.settings.get("window_width", 1200)
        self.screen_height = self.settings.get("window_height", 800)
        
        if self.settings.get("fullscreen", False):
            self.screen = pygame.display.set_mode((0, 0), pygame.FULLSCREEN)
            self.screen_width, self.screen_height = self.screen.get_size()
        else:
            self.screen = pygame.display.set_mode((self.screen_width, self.screen_height), pygame.RESIZABLE)
            
        pygame.display.set_caption("Pomodoro Timer - Focus & Study")
        
        # Load resources
        self.backgrounds, self.background_files = self._load_backgrounds()
        self.current_background = 0
        # Select background from settings if available
        desired_bg = self.settings.get("background_file", None)
        if desired_bg and desired_bg in self.background_files:
            self.current_background = self.background_files.index(desired_bg)
        self.fonts = self._load_fonts()
        self.sounds = self._load_sounds()
        
        # UI state
        self.show_settings = False
        self.show_controls = False
        self.clock = pygame.time.Clock()
        self.running = True
        
        # Initialize settings menu with available backgrounds
        self.settings_menu = SettingsMenu(self.screen, self.settings, self.fonts, background_choices=self.background_files)

        # Background crossfade state
        self._fade_active = False
        self._fade_from = None
        self._fade_to = None
        self._fade_start = 0.0
        self._fade_duration = 0.6

        # Track last applied settings to detect changes
        self._applied = {
            "background_file": self.settings.get("background_file"),
            "timer_font_family": self.settings.get("timer_font_family", "sans"),
            "custom_font_file": self.settings.get("custom_font_file", ""),
            "timer_size": self.settings.get("timer_size", 72),
            "timer_color": tuple(self.settings.get("timer_color", [255, 255, 255])),
            "music_volume": self.settings.get("music_volume", 0.7),
            "music_pause_on_breaks": self.settings.get("music_pause_on_breaks", True),
            "work_duration": self.settings.get("work_duration", 25),
            "short_break_duration": self.settings.get("short_break_duration", 5),
            "long_break_duration": self.settings.get("long_break_duration", 15),
        }
        
        # Motivational messages
        self.break_messages = [
            "Great job! Time for a break 🌟",
            "You're doing amazing! Stretch and hydrate 💧",
            "Well done! Take a moment to breathe 🌸",
            "Excellent focus! Enjoy your break 🎯",
            "You're on fire! Rest and recharge ⚡",
            "Fantastic work! Step away and relax 🌺",
            "Keep it up! Your brain deserves a break 🧠",
            "Outstanding! Time to refresh yourself 🌿"
        ]
        
        # Apply timer settings
        self.timer.work_duration = self.settings.get("work_duration", 25) * 60
        self.timer.short_break_duration = self.settings.get("short_break_duration", 5) * 60
        self.timer.long_break_duration = self.settings.get("long_break_duration", 15) * 60
        
    def _load_backgrounds(self) -> Tuple[List[pygame.Surface], List[str]]:
        """Load background images with fallback options and return (surfaces, filenames)"""
        backgrounds: List[pygame.Surface] = []
        files: List[str] = []
        # Supported filenames to look for commonly
        candidate_files = ["ocean.webp", "ocean.png", "ocean.jpg",
                           "mountain.webp", "mountain.png", "mountain.jpg",
                           "night.jpg", "night.png", "night.webp",
                           "morning.jpeg", "morning.jpg", "morning.png",
                           "beach.png", "beach.jpg", "beach.webp"]
        
        seen = set()
        for bg_file in candidate_files:
            try:
                if bg_file in seen:
                    continue
                if os.path.exists(bg_file):
                    # Load and scale background to screen size
                    bg_surface = pygame.image.load(bg_file)
                    bg_surface = pygame.transform.smoothscale(bg_surface, (self.screen_width, self.screen_height))
                    backgrounds.append(bg_surface)
                    files.append(bg_file)
                    seen.add(bg_file)
                    print(f"Loaded background: {bg_file}")
            except Exception as e:
                print(f"Error loading background {bg_file}: {e}")
                
        # Create fallback backgrounds if no images loaded
        if not backgrounds:
            backgrounds = self._create_fallback_backgrounds()
            files = ["Ocean (generated)", "Mountain (generated)", "Night (generated)", "Morning (generated)"]
            
        return backgrounds, files
        
    def _create_fallback_backgrounds(self) -> List[pygame.Surface]:
        """Create gradient backgrounds as fallback"""
        backgrounds = []
        
        # Ocean theme - blue gradient
        ocean_bg = pygame.Surface((self.screen_width, self.screen_height))
        for y in range(self.screen_height):
            color_intensity = int(50 + (y / self.screen_height) * 100)
            color = (0, color_intensity, min(255, color_intensity + 50))
            pygame.draw.line(ocean_bg, color, (0, y), (self.screen_width, y))
        backgrounds.append(ocean_bg)
        
        # Mountain theme - purple gradient
        mountain_bg = pygame.Surface((self.screen_width, self.screen_height))
        for y in range(self.screen_height):
            color_intensity = int(30 + (y / self.screen_height) * 80)
            color = (color_intensity + 20, color_intensity, color_intensity + 40)
            pygame.draw.line(mountain_bg, color, (0, y), (self.screen_width, y))
        backgrounds.append(mountain_bg)
        
        # Night theme - dark gradient
        night_bg = pygame.Surface((self.screen_width, self.screen_height))
        for y in range(self.screen_height):
            color_intensity = int(10 + (y / self.screen_height) * 40)
            color = (color_intensity, color_intensity, color_intensity + 20)
            pygame.draw.line(night_bg, color, (0, y), (self.screen_width, y))
        backgrounds.append(night_bg)
        
        # Morning theme - warm gradient
        morning_bg = pygame.Surface((self.screen_width, self.screen_height))
        for y in range(self.screen_height):
            color_intensity = int(80 + (y / self.screen_height) * 100)
            color = (min(255, color_intensity + 30), color_intensity, color_intensity - 20)
            pygame.draw.line(morning_bg, color, (0, y), (self.screen_width, y))
        backgrounds.append(morning_bg)
        
        print("Created fallback gradient backgrounds")
        return backgrounds
        
    def _sysfont_name(self, family: str) -> str:
        mapping = {
            "sans": ["arial", "helvetica", "dejavusans"],
            "serif": ["timesnewroman", "times", "dejavuserif"],
            "mono": ["couriernew", "courier", "dejavusansmono"],
        }
        for name in mapping.get(family, ["arial"]):
            return name
        return "arial"

    def _load_fonts(self) -> dict:
        """Load fonts for different UI elements based on settings"""
        fonts = {}
        family = self.settings.get("timer_font_family", "sans")
        custom_path = self.settings.get("custom_font_file", "")
        size = self.settings.get("timer_size", 72)
        try:
            if family == "custom" and custom_path and os.path.exists(custom_path):
                timer_font = pygame.font.Font(custom_path, size)
                timer_font_large = pygame.font.Font(custom_path, max(96, size))
            else:
                sysname = self._sysfont_name(family)
                timer_font = pygame.font.SysFont(sysname, size)
                timer_font_large = pygame.font.SysFont(sysname, max(96, size))
            fonts['timer'] = timer_font
            fonts['timer_large'] = timer_font_large

            # UI fonts use a readable sans-serif
            ui_font_name = self._sysfont_name("sans")
            fonts['ui'] = pygame.font.SysFont(ui_font_name, 36)
            fonts['ui_small'] = pygame.font.SysFont(ui_font_name, 24)
            fonts['ui_large'] = pygame.font.SysFont(ui_font_name, 48)
        except Exception as e:
            print(f"Error loading fonts: {e}")
            fonts['timer'] = pygame.font.Font(None, size)
            fonts['timer_large'] = pygame.font.Font(None, max(96, size))
            fonts['ui'] = pygame.font.Font(None, 36)
            fonts['ui_small'] = pygame.font.Font(None, 24)
            fonts['ui_large'] = pygame.font.Font(None, 48)
        return fonts
    def _load_sounds(self) -> dict:
        """Load sound effects (soft chime) with safe fallbacks"""
        sounds = {}
        try:
            # Attempt to load a bundled chime file if present
            for candidate in ("chime.wav", "chime.ogg"):
                if os.path.exists(candidate):
                    sounds['chime'] = pygame.mixer.Sound(candidate)
                    break
            else:
                # No chime available; disable silently
                sounds['chime'] = None
        except Exception as e:
            print(f"Error loading chime sound: {e}")
            sounds['chime'] = None
        return sounds

    def draw_timer_text_with_glow(self, text: str, x: int, y: int, color: Tuple[int, int, int]):
        """Draw timer text with a glowing/cloudy effect"""
        font = self.fonts['timer_large'] if len(text) <= 5 else self.fonts['timer']
        
        # Create glow effect by drawing multiple layers
        glow_color = (color[0] // 3, color[1] // 3, color[2] // 3)
        
        # Draw glow layers (outer to inner)
        for offset in range(8, 0, -1):
            alpha = 30 - (offset * 3)
            glow_surface = font.render(text, True, glow_color)
            glow_surface.set_alpha(alpha)
            
            # Draw glow in multiple directions
            for dx in [-offset, 0, offset]:
                for dy in [-offset, 0, offset]:
                    if dx != 0 or dy != 0:
                        self.screen.blit(glow_surface, (x + dx, y + dy))
        
        # Draw main text centered at (x, y)
        text_surface = font.render(text, True, color)
        text_rect = text_surface.get_rect(center=(x, y))
        self.screen.blit(text_surface, text_rect)
        
    def draw_progress_bar(self, x: int, y: int, width: int, height: int, progress: float):
        """Draw a progress bar for the current session"""
        # Background
        pygame.draw.rect(self.screen, (50, 50, 50), (x, y, width, height))
        pygame.draw.rect(self.screen, (100, 100, 100), (x, y, width, height), 2)
        
        # Progress fill
        if progress > 0:
            fill_width = int(width * (progress / 100))
            color = (100, 200, 100) if self.timer.state == TimerState.WORK else (100, 150, 200)
            pygame.draw.rect(self.screen, color, (x, y, fill_width, height))
            
    def draw_pomodoro_tracker(self):
        """Draw completed Pomodoro count and current cycle"""
        y_pos = 50
        
        # Completed Pomodoros
        completed_text = f"Completed: {self.timer.completed_pomodoros}"
        text_surface = self.fonts['ui'].render(completed_text, True, (255, 255, 255))
        text_rect = text_surface.get_rect(topleft=(50, y_pos))
        
        # Add semi-transparent background
        bg_rect = text_rect.inflate(20, 10)
        bg_surface = pygame.Surface(bg_rect.size)
        bg_surface.set_alpha(128)
        bg_surface.fill((0, 0, 0))
        self.screen.blit(bg_surface, bg_rect)
        self.screen.blit(text_surface, text_rect)
        
        # Current cycle indicator
        cycle_text = f"Cycle: {self.timer.current_cycle}/4"
        cycle_surface = self.fonts['ui'].render(cycle_text, True, (255, 255, 255))
        cycle_rect = cycle_surface.get_rect(topleft=(50, y_pos + 40))
        
        bg_rect = cycle_rect.inflate(20, 10)
        bg_surface = pygame.Surface(bg_rect.size)
        bg_surface.set_alpha(128)
        bg_surface.fill((0, 0, 0))
        self.screen.blit(bg_surface, bg_rect)
        self.screen.blit(cycle_surface, cycle_rect)
        
    def draw_controls_help(self):
        """Draw control instructions"""
        if not self.show_controls:
            return
            
        controls = [
            "SPACE - Start/Pause",
            "R - Reset Timer",
            "B - Change Background",
            "M - Toggle Music",
            "N - Next Track",
            "P - Previous Track",
            "S - Settings Menu",
            "F - Toggle Fullscreen",
            "H - Toggle Help",
            "ESC - Quit"
        ]
        
        # Calculate help panel size
        panel_width = 300
        panel_height = len(controls) * 30 + 40
        panel_x = self.screen_width - panel_width - 20
        panel_y = 20
        
        # Draw semi-transparent background
        bg_surface = pygame.Surface((panel_width, panel_height))
        bg_surface.set_alpha(180)
        bg_surface.fill((0, 0, 0))
        self.screen.blit(bg_surface, (panel_x, panel_y))
        
        # Draw border
        pygame.draw.rect(self.screen, (255, 255, 255), (panel_x, panel_y, panel_width, panel_height), 2)
        
        # Draw controls
        for i, control in enumerate(controls):
            text_surface = self.fonts['ui_small'].render(control, True, (255, 255, 255))
            self.screen.blit(text_surface, (panel_x + 10, panel_y + 20 + i * 30))
            
    def draw_state_message(self):
        """Draw current state message and motivational text"""
        center_x = self.screen_width // 2
        message_y = self.screen_height // 2 + 100
        
        # State message
        if self.timer.state == TimerState.WORK:
            message = "Focus Time! 🎯"
            color = (255, 255, 255)
        elif self.timer.state == TimerState.SHORT_BREAK:
            message = random.choice(self.break_messages)
            color = (150, 255, 150)
        elif self.timer.state == TimerState.LONG_BREAK:
            message = "Long Break! You've earned it! 🌟"
            color = (150, 200, 255)
        elif self.timer.state == TimerState.PAUSED:
            message = "Paused ⏸️"
            color = (255, 255, 150)
        else:
            message = "Ready to start? Press SPACE 🚀"
            color = (200, 200, 200)
            
        text_surface = self.fonts['ui_large'].render(message, True, color)
        text_rect = text_surface.get_rect(center=(center_x, message_y))
        
        # Add background for better readability
        bg_rect = text_rect.inflate(40, 20)
        bg_surface = pygame.Surface(bg_rect.size)
        bg_surface.set_alpha(128)
        bg_surface.fill((0, 0, 0))
        self.screen.blit(bg_surface, bg_rect)
        self.screen.blit(text_surface, text_rect)
        
    def draw_music_info(self):
        """Draw current music information"""
        if not self.music_player.playlist:
            return
            
        y_pos = self.screen_height - 80
        
        # Current track
        track_name = self.music_player.get_current_track_name()
        if len(track_name) > 30:
            track_name = track_name[:27] + "..."
            
        status = "♪ Playing" if self.music_player.is_playing else "⏸ Paused"
        music_text = f"{status}: {track_name}"
        
        text_surface = self.fonts['ui_small'].render(music_text, True, (255, 255, 255))
        text_rect = text_surface.get_rect(center=(self.screen_width // 2, y_pos))
        
        # Add background
        bg_rect = text_rect.inflate(20, 10)
        bg_surface = pygame.Surface(bg_rect.size)
        bg_surface.set_alpha(128)
        bg_surface.fill((0, 0, 0))
        self.screen.blit(bg_surface, bg_rect)
        self.screen.blit(text_surface, text_rect)
        
    def handle_events(self):
        """Handle all pygame events"""
        for event in pygame.event.get():
            # Let settings menu handle events first
            if self.settings_menu.handle_event(event):
                continue  # Event was consumed by settings menu
                
            if event.type == pygame.QUIT:
                self.running = False
                
            elif event.type == pygame.KEYDOWN:
                self._handle_keydown(event.key)
                
            elif event.type == pygame.VIDEORESIZE:
                self.screen_width, self.screen_height = event.size
                self.screen = pygame.display.set_mode((self.screen_width, self.screen_height), pygame.RESIZABLE)
                self.backgrounds, self.background_files = self._load_backgrounds()  # Reload backgrounds for new size
                self.settings_menu = SettingsMenu(self.screen, self.settings, self.fonts, background_choices=self.background_files)  # Recreate settings menu
                
    def _handle_keydown(self, key):
        """Handle keyboard input"""
        if key == pygame.K_SPACE:
            # Start/Pause timer
            if self.timer.state == TimerState.STOPPED or self.timer.state == TimerState.PAUSED:
                self.timer.start()
                if self.settings.get("music_enabled", True):
                    self.music_player.play()
            else:
                self.timer.pause()
                self.music_player.pause()
                
        elif key == pygame.K_r:
            # Reset timer
            self.timer.reset()
            self.music_player.stop()
            
        elif key == pygame.K_b:
            # Change background (cycle) with crossfade and persist setting
            next_index = (self.current_background + 1) % len(self.backgrounds)
            self._start_background_fade(self.current_background, next_index)
            self.current_background = next_index
            # Persist filename if it's a real file
            if self.background_files and self.current_background < len(self.background_files):
                self.settings.set("background_file", self.background_files[self.current_background])
            
        elif key == pygame.K_m:
            # Toggle music
            if self.music_player.is_playing:
                self.music_player.pause()
            else:
                self.music_player.resume()
                
        elif key == pygame.K_n:
            # Next track
            self.music_player.next_track()
            
        elif key == pygame.K_p:
            # Previous track
            self.music_player.previous_track()
            
        elif key == pygame.K_h:
            # Toggle help
            self.show_controls = not self.show_controls
            
        elif key == pygame.K_s:
            # Toggle settings menu
            self.settings_menu.toggle_visibility()
            
        elif key == pygame.K_ESCAPE:
            # Quit
            self.running = False
            
        elif key == pygame.K_f:
            # Toggle fullscreen
            self.settings.set("fullscreen", not self.settings.get("fullscreen", False))
            if self.settings.get("fullscreen"):
                self.screen = pygame.display.set_mode((0, 0), pygame.FULLSCREEN)
                self.screen_width, self.screen_height = self.screen.get_size()
            else:
                self.screen = pygame.display.set_mode((1200, 800), pygame.RESIZABLE)
                self.screen_width, self.screen_height = 1200, 800
            # Reload backgrounds and refresh settings menu choices
            self.backgrounds, self.background_files = self._load_backgrounds()
            self.settings_menu = SettingsMenu(self.screen, self.settings, self.fonts, background_choices=self.background_files)
            
    def update(self):
        """Update game state"""
        prev_state = self.timer.state
        self.timer.update()
        # Auto music pause/resume on state changes if enabled
        if self.timer.state != prev_state and self.settings.get("music_pause_on_breaks", True):
            if self.timer.state in (TimerState.SHORT_BREAK, TimerState.LONG_BREAK):
                if self.music_player.is_playing:
                    self.music_player.pause()
            elif self.timer.state == TimerState.WORK:
                if self.settings.get("music_enabled", True):
                    self.music_player.resume()

        # Apply settings updates live if changed
        self._apply_settings_if_changed()
        
        # Play chime when timer completes
        if hasattr(self, '_last_time_remaining'):
            if self._last_time_remaining > 0 and self.timer.time_remaining <= 0:
                if self.sounds['chime']:
                    self.sounds['chime'].play()
        self._last_time_remaining = self.timer.time_remaining
        
    def draw(self):
        """Draw all UI elements"""
        # Draw background, handle crossfade if active
        if self.backgrounds:
            if self._fade_active and self._fade_from is not None and self._fade_to is not None:
                progress = min(1.0, (time.time() - self._fade_start) / self._fade_duration)
                # Draw from
                self.screen.blit(self._fade_from, (0, 0))
                # Overlay to with alpha
                overlay = self._fade_to.copy()
                overlay.set_alpha(int(255 * progress))
                self.screen.blit(overlay, (0, 0))
                if progress >= 1.0:
                    self._fade_active = False
            else:
                self.screen.blit(self.backgrounds[self.current_background], (0, 0))
        else:
            self.screen.fill((30, 30, 50))  # Fallback color
            
        # Draw timer
        center_x = self.screen_width // 2
        center_y = self.screen_height // 2 - 50
        
        timer_text = self.timer.get_formatted_time()
        timer_color = tuple(self.settings.get("timer_color", [255, 255, 255]))
        self.draw_timer_text_with_glow(timer_text, center_x, center_y, timer_color)
        
        # Draw progress bar
        progress = self.timer.get_progress_percentage()
        bar_width = 400
        bar_height = 10
        bar_x = center_x - bar_width // 2
        bar_y = center_y + 80
        self.draw_progress_bar(bar_x, bar_y, bar_width, bar_height, progress)
        
        # Draw other UI elements
        self.draw_pomodoro_tracker()
        self.draw_state_message()
        self.draw_music_info()
        self.draw_controls_help()
        
        # Draw settings menu last (on top)
        self.settings_menu.draw()
        
        pygame.display.flip()
        
    def run(self):
        """Main game loop"""
        print("Starting Pomodoro Timer...")
        print("Press H for help, SPACE to start/pause, ESC to quit")
        
        while self.running:
            self.handle_events()
            self.update()
            self.draw()
            self.clock.tick(60)  # 60 FPS
            
        # Save settings before quitting
        self.settings.save_settings()
        pygame.quit()

    def _start_background_fade(self, from_idx: int, to_idx: int):
        """Begin a smooth crossfade between two background indices.
        This does not change the timer or any UI element; it only prepares
        the transition surfaces and timestamps used by draw().
        """
        if 0 <= from_idx < len(self.backgrounds) and 0 <= to_idx < len(self.backgrounds):
            self._fade_from = self.backgrounds[from_idx]
            self._fade_to = self.backgrounds[to_idx]
            self._fade_start = time.time()
            self._fade_active = True

    def _apply_settings_if_changed(self):
        """Apply user settings live (background, fonts, colors, durations, volume).
        No UI layout or behavior is changed here—only existing controls and visuals
        are updated to reflect the current preferences stored in Settings.
        """
        # Background file change
        bg_file = self.settings.get("background_file")
        if bg_file != self._applied.get("background_file") and self.background_files:
            if bg_file in self.background_files:
                new_idx = self.background_files.index(bg_file)
                self._start_background_fade(self.current_background, new_idx)
                self.current_background = new_idx
                self._applied["background_file"] = bg_file

        # Fonts and sizes
        size = self.settings.get("timer_size", 72)
        family = self.settings.get("timer_font_family", "sans")
        custom = self.settings.get("custom_font_file", "")
        if (size != self._applied.get("timer_size") or
            family != self._applied.get("timer_font_family") or
            custom != self._applied.get("custom_font_file")):
            self.fonts = self._load_fonts()
            self._applied["timer_size"] = size
            self._applied["timer_font_family"] = family
            self._applied["custom_font_file"] = custom

        # Timer color
        color = tuple(self.settings.get("timer_color", [255, 255, 255]))
        if color != self._applied.get("timer_color"):
            self._applied["timer_color"] = color

        # Music volume
        vol = self.settings.get("music_volume", 0.7)
        if vol != self._applied.get("music_volume"):
            self.music_player.set_volume(vol)
            self._applied["music_volume"] = vol

        # Durations
        wd = self.settings.get("work_duration", 25)
        sd = self.settings.get("short_break_duration", 5)
        ld = self.settings.get("long_break_duration", 15)
        if wd != self._applied.get("work_duration") or sd != self._applied.get("short_break_duration") or ld != self._applied.get("long_break_duration"):
            self.timer.work_duration = wd * 60
            self.timer.short_break_duration = sd * 60
            self.timer.long_break_duration = ld * 60
            self._applied["work_duration"] = wd
            self._applied["short_break_duration"] = sd
            self._applied["long_break_duration"] = ld

if __name__ == "__main__":
    app = UI()
    app.run()
