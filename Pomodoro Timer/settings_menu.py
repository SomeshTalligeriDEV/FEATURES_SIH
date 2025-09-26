"""
Settings Menu Module for Pomodoro Timer
Provides an in-game settings interface for customizing the application.
"""

import pygame
from typing import Tuple, List, Dict, Any

class SettingsMenu:
    """Interactive settings menu for the Pomodoro Timer"""
    
    def __init__(self, screen: pygame.Surface, settings, fonts: Dict, background_choices: list | None = None):
        self.screen = screen
        self.settings = settings
        self.fonts = fonts
        self.is_visible = False
        
        # Menu state
        self.selected_option = 0
        self.editing_value = False
        self.temp_value = ""
        self.background_choices = background_choices or []
        
        # Color presets for timer
        self.color_presets = [
            ("White", (255, 255, 255)),
            ("Soft Blue", (173, 216, 230)),
            ("Lavender", (230, 230, 250)),
            ("Mint Green", (152, 251, 152)),
            ("Peach", (255, 218, 185)),
            ("Rose Gold", (255, 192, 203)),
            ("Sky Blue", (135, 206, 235)),
            ("Warm Yellow", (255, 255, 224))
        ]
        
        # Menu options
        self.menu_options = [
            {"name": "Work Duration (min)", "key": "work_duration", "type": "number", "min": 1, "max": 60},
            {"name": "Short Break (min)", "key": "short_break_duration", "type": "number", "min": 1, "max": 30},
            {"name": "Long Break (min)", "key": "long_break_duration", "type": "number", "min": 5, "max": 60},
            {"name": "Background", "key": "background_file", "type": "choice", "choices": self.background_choices},
            {"name": "Timer Color", "key": "timer_color", "type": "color"},
            {"name": "Timer Size", "key": "timer_size", "type": "number", "min": 48, "max": 120},
            {"name": "Font Family", "key": "timer_font_family", "type": "choice", "choices": ["sans", "serif", "mono", "custom"]},
            {"name": "Custom Font File", "key": "custom_font_file", "type": "text"},
            {"name": "Music Volume", "key": "music_volume", "type": "slider", "min": 0.0, "max": 1.0},
            {"name": "Music Enabled", "key": "music_enabled", "type": "boolean"},
            {"name": "Pause Music On Breaks", "key": "music_pause_on_breaks", "type": "boolean"},
            {"name": "Fullscreen", "key": "fullscreen", "type": "boolean"},
            {"name": "Save & Close", "key": "save", "type": "action"}
        ]
        
    def toggle_visibility(self):
        """Toggle settings menu visibility"""
        self.is_visible = not self.is_visible
        if self.is_visible:
            self.selected_option = 0
            self.editing_value = False
            
    def handle_event(self, event) -> bool:
        """Handle input events for the settings menu"""
        if not self.is_visible:
            return False
            
        if event.type == pygame.KEYDOWN:
            if self.editing_value:
                return self._handle_editing_input(event.key)
            else:
                return self._handle_navigation_input(event.key)
                
        return True  # Consume event if menu is visible
        
    def _handle_navigation_input(self, key) -> bool:
        """Handle navigation input when not editing"""
        if key == pygame.K_UP:
            self.selected_option = (self.selected_option - 1) % len(self.menu_options)
        elif key == pygame.K_DOWN:
            self.selected_option = (self.selected_option + 1) % len(self.menu_options)
            self._activate_option()
        elif key == pygame.K_ESCAPE:
            self.is_visible = False
        elif key == pygame.K_LEFT or key == pygame.K_RIGHT:
            self._adjust_value(key == pygame.K_RIGHT)
            
        # Handle background selection
        elif key == pygame.K_PAGEUP or key == pygame.K_PAGEDOWN:
            option = self.menu_options[self.selected_option]
            if option["type"] == "choice" and option["key"] == "background_file":
                choices = option.get("choices", [])
                if choices:
                    current = self.settings.get(option["key"], choices[0] if choices else "")
                    try:
                        idx = choices.index(current)
                    except ValueError:
                        idx = 0
                    idx = (idx + (1 if key == pygame.K_PAGEUP else -1)) % len(choices)
                    self.settings.set(option["key"], choices[idx])
        
        return True
        
    def _handle_editing_input(self, key) -> bool:
        """Handle input when editing a value"""
        if key == pygame.K_RETURN:
            self._confirm_edit()
        elif key == pygame.K_ESCAPE:
            self.editing_value = False
            self.temp_value = ""
        elif key == pygame.K_BACKSPACE:
            self.temp_value = self.temp_value[:-1]
        else:
            # Add character to temp value
            char = pygame.key.name(key)
            # Allow alphanumerics, dot, slash, underscore, hyphen for text paths; digits and dot for numbers
            if len(char) == 1:
                if char.isalnum() or char in ['.', '/', '_', '-']:
                    self.temp_value += char
                
        return True
        
    def _activate_option(self):
        """Activate the currently selected option"""
        option = self.menu_options[self.selected_option]
        
        if option["type"] == "action":
            if option["key"] == "save":
                self.settings.save_settings()
                self.is_visible = False
        elif option["type"] == "boolean":
            current_value = self.settings.get(option["key"], False)
            self.settings.set(option["key"], not current_value)
        elif option["type"] == "color":
            self._cycle_color()
        elif option["type"] in ["number", "slider", "text"]:
            self.editing_value = True
            self.temp_value = str(self.settings.get(option["key"], 0))
            
    def _adjust_value(self, increase: bool):
        """Adjust value with left/right arrows"""
        option = self.menu_options[self.selected_option]
        
        if option["type"] == "slider":
            current = self.settings.get(option["key"], 0.5)
            step = 0.1
            if increase:
                new_value = min(option["max"], current + step)
            else:
                new_value = max(option["min"], current - step)
            self.settings.set(option["key"], round(new_value, 1))
            
        elif option["type"] == "number":
            current = self.settings.get(option["key"], 1)
            step = 1
            if increase:
                new_value = min(option["max"], current + step)
            else:
                new_value = max(option["min"], current - step)
            self.settings.set(option["key"], new_value)
            
        elif option["type"] == "color":
            self._cycle_color()
        elif option["type"] == "choice":
            choices = option.get("choices", [])
            if choices:
                current = self.settings.get(option["key"], choices[0] if choices else "")
                try:
                    idx = choices.index(current)
                except ValueError:
                    idx = 0
                idx = (idx + (1 if increase else -1)) % len(choices)
                self.settings.set(option["key"], choices[idx])
            
    def _cycle_color(self):
        """Cycle through color presets"""
        current_color = tuple(self.settings.get("timer_color", [255, 255, 255]))
        
        # Find current color in presets
        current_index = 0
        for i, (name, color) in enumerate(self.color_presets):
            if color == current_color:
                current_index = i
                break
                
        # Move to next color
        next_index = (current_index + 1) % len(self.color_presets)
        self.settings.set("timer_color", list(self.color_presets[next_index][1]))
        
    def _confirm_edit(self):
        """Confirm the edited value"""
        option = self.menu_options[self.selected_option]
        
        try:
            if option["type"] == "number":
                value = int(self.temp_value)
                value = max(option["min"], min(option["max"], value))
                self.settings.set(option["key"], value)
            elif option["type"] == "slider":
                value = float(self.temp_value)
                value = max(option["min"], min(option["max"], value))
                self.settings.set(option["key"], value)
            elif option["type"] == "text":
                self.settings.set(option["key"], self.temp_value)
        except ValueError:
            pass  # Invalid input, ignore
            
        self.editing_value = False
        self.temp_value = ""
        
    def draw(self):
        """Draw the settings menu"""
        if not self.is_visible:
            return
            
        # Calculate menu dimensions
        menu_width = 600
        menu_height = 500
        menu_x = (self.screen.get_width() - menu_width) // 2
        menu_y = (self.screen.get_height() - menu_height) // 2
        
        # Draw background
        bg_surface = pygame.Surface((menu_width, menu_height))
        bg_surface.set_alpha(220)
        bg_surface.fill((20, 20, 30))
        self.screen.blit(bg_surface, (menu_x, menu_y))
        
        # Draw border
        pygame.draw.rect(self.screen, (100, 100, 150), (menu_x, menu_y, menu_width, menu_height), 3)
        
        # Draw title
        title_surface = self.fonts['ui_large'].render("Settings", True, (255, 255, 255))
        title_rect = title_surface.get_rect(center=(menu_x + menu_width // 2, menu_y + 40))
        self.screen.blit(title_surface, title_rect)
        
        # Draw options
        option_y = menu_y + 80
        option_height = 35
        
        for i, option in enumerate(self.menu_options):
            # Highlight selected option
            if i == self.selected_option:
                highlight_rect = pygame.Rect(menu_x + 10, option_y + i * option_height - 5, 
                                           menu_width - 20, option_height)
                pygame.draw.rect(self.screen, (50, 50, 80), highlight_rect)
                
            # Draw option name
            name_surface = self.fonts['ui'].render(option["name"], True, (255, 255, 255))
            self.screen.blit(name_surface, (menu_x + 20, option_y + i * option_height))
            
            # Draw option value
            value_text = self._get_value_text(option)
            value_surface = self.fonts['ui'].render(value_text, True, (200, 200, 255))
            value_rect = value_surface.get_rect(right=menu_x + menu_width - 20, 
                                              top=option_y + i * option_height)
            self.screen.blit(value_surface, value_rect)
            
        # Draw instructions
        instructions = [
            "↑↓ Navigate  ←→ Adjust  ENTER Select  ESC Close",
            "For numbers: ENTER to edit, type value, ENTER to confirm"
        ]
        
        for i, instruction in enumerate(instructions):
            inst_surface = self.fonts['ui_small'].render(instruction, True, (150, 150, 150))
            inst_rect = inst_surface.get_rect(center=(menu_x + menu_width // 2, 
                                                    menu_y + menu_height - 40 + i * 20))
            self.screen.blit(inst_surface, inst_rect)
            
    def _get_value_text(self, option: Dict[str, Any]) -> str:
        """Get display text for option value"""
        if self.editing_value and option == self.menu_options[self.selected_option]:
            return f"[{self.temp_value}_]"
            
        value = self.settings.get(option["key"])
        
        if option["type"] == "boolean":
            return "ON" if value else "OFF"
        elif option["type"] == "color":
            # Find color name
            color_tuple = tuple(value) if isinstance(value, list) else value
            for name, color in self.color_presets:
                if color == color_tuple:
                    return name
            return "Custom"
        elif option["type"] == "slider":
            return f"{value:.1f}"
        elif option["type"] == "choice":
            return str(value)
        elif option["type"] == "text":
            return str(value)
        elif option["type"] == "action":
            return "→"
        else:
            return str(value)

# Integration with main UI class would require adding this to ui.py:
"""
# Add to UI.__init__():
self.settings_menu = SettingsMenu(self.screen, self.settings, self.fonts)

# Add to UI._handle_keydown():
elif key == pygame.K_s:
    self.settings_menu.toggle_visibility()

# Add to UI.handle_events():
# Process settings menu events first
for event in pygame.event.get():
    if self.settings_menu.handle_event(event):
        continue  # Event was consumed by settings menu
    # ... rest of event handling

# Add to UI.draw():
self.settings_menu.draw()  # Draw after other UI elements
"""
