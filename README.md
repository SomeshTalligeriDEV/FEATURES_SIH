# 🍅 Pomodoro Timer — Focus, Calm, Study

Welcome! This is a student-friendly Pomodoro timer built with Python and Pygame. It’s designed to feel calm and aesthetic while helping you study in focused bursts. Think minimal UI, dreamy timer glow, lofi vibes, and gentle breaks.

![Pomodoro Timer](https://img.shields.io/badge/Python-3.7+-blue.svg)
![Pygame](https://img.shields.io/badge/Pygame-2.1+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## Why you’ll like it

- **Clean & calm look.** Soft backgrounds, glowing timer, distraction-free.
- **Works out of the box.** Drop your lofi tracks into the folder and press play.
- **Built for students.** Encouraging messages, easy shortcuts, and saved preferences.

---

## Quick start

1. Open a terminal in the `pomodro_app/` folder.
2. Create the virtual environment once (we’ve already done this for you in most setups):
   ```bash
   python3 -m venv venv
   ```
3. Install dependencies:
   ```bash
   venv/bin/pip install -r requirements.txt
   ```
4. Run the app:
   ```bash
   venv/bin/python main.py
   ```
5. Press `H` in the app for a quick help overlay.

---

## Features at a glance

- **Pomodoro flow**
  - 25 min focus → 5 min break → repeat
  - Long break after 4 sessions (15 min by default)
  - Progress bar and completed session count

- **Make it yours**
  - Choose backgrounds (uses your `ocean.webp`, `mountain.webp`, `night.jpg`, `morning.jpeg`; falls back to gentle gradients if missing)
  - Smooth crossfade when switching backgrounds
  - Timer color presets
  - Font family options: `sans`, `serif`, `mono`, or a custom `.ttf`
  - Resizable window + fullscreen toggle

- **LoFi music**
  - Drop `mp3`, `wav`, or `ogg` files into the folder
  - Play/pause, next/previous track
  - Auto-pause during breaks (optional)
  - Volume control

- **Friendly touches**
  - Minimal, student-friendly UI
  - Encouraging break messages
  - Soft chime support (add `chime.wav` or `chime.ogg` to enable)

---

## Controls you’ll use most

- SPACE — Start/Pause
- R — Reset
- B — Change background
- M — Toggle music
- N/P — Next/Previous track
- S — Settings menu
- F — Fullscreen
- H — Help overlay
- ESC — Quit

---

## Add your own music

1. Put files like `lofi1.mp3`, `lofi2.mp3` in the `pomodro_app/` folder.
2. Supported formats: `mp3`, `wav`, `ogg`.
3. The app auto-detects the playlist at startup.

Optional chime:
- Add a short `chime.wav` or `chime.ogg` in the same folder to hear a soft sound when a session ends.

---

## Backgrounds

Works with your images if available:
- `ocean.webp`, `mountain.webp`, `night.jpg`, `morning.jpeg`

Missing images? No problem — the app draws relaxing gradient backgrounds as a fallback. You can switch backgrounds with `B` or select one in the settings.

---

## Settings and personalization

Your preferences are saved to `pomodoro_config.json`.

What you can change:
- Work / Short break / Long break durations
- Background file
- Timer color and size
- Font family (`sans`, `serif`, `mono`, or `custom .ttf`)
- Music: enabled, volume, auto-pause during breaks
- Window mode: fullscreen or resizable window

---

## Troubleshooting

- Pygame not found:
  ```bash
  venv/bin/pip install pygame
  ```
- No sound/music:
  - Put your audio files in the app folder
  - Use supported formats: `mp3`, `wav`, `ogg`
  - Press `M` to toggle music
- Backgrounds not loading:
  - Keep images in the app folder
  - Supported formats include `png`, `jpg`, `jpeg`, `webp`
  - The app will draw gradients if it can’t find images
- App won’t start:
  - Check your Python version: `python3 --version`
  - Reinstall requirements: `venv/bin/pip install -r requirements.txt`

---

## Project structure

```
pomodro_app/
├── main.py              # Entry point
├── ui.py                # User interface, rendering, inputs
├── pomodoro_app.py      # Timer, Settings, MusicPlayer classes
├── settings_menu.py     # In-app settings panel
├── requirements.txt     # Python dependencies
├── README.md            # This file 😊
├── pomodoro_config.json # Created automatically to save your preferences
└── [background images and music files]
```

---

## FAQ

- Can I use my own font?
  - Yes! Put a `.ttf` file in the folder and select `custom` in Settings. Then set the `Custom Font File` path.
- Will my settings be saved?
  - Yep. They’re written to `pomodoro_config.json` when you exit the app.
- Can I pause music during breaks automatically?
  - Enable “Pause Music On Breaks” in Settings (on by default).

---

## License & credits

- MIT License — do whatever helps you study better.
- Built with [Pygame](https://www.pygame.org/)
- Inspired by the [Pomodoro Technique](https://francescocirillo.com/pages/pomodoro-technique)

---

Happy studying! Stay kind to yourself and keep going. 🌟
