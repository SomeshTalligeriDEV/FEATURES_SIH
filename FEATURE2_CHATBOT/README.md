# Educational Assistant Bot (Terminal Version)
**By Shreya P Shetty**

A lightweight, terminal-based educational assistant powered by OpenAI’s API. This bot offers accurate and context-aware answers to educational queries through an intuitive command-line interface, making learning easily accessible from your terminal.

## Description
The Educational Assistant Bot is designed to support students and learners by providing precise answers to their questions based on available educational context. Leveraging advanced natural language processing models from Hugging Face and OpenAI, the bot understands user queries and generates relevant, informative responses while maintaining context awareness.

## Features
- Clean and minimal terminal interface
- OpenAI-powered responses for accuracy
- Context-aware educational assistance
- Fast setup and simple usage
- Secure management of API keys
- Interactive question-and-answer sessions

## Tech Stack
- Python 3.11 or later
- OpenAI Python SDK
- python-dotenv for environment configuration
- Optional extensions:
  - Flask (for web-based interface)
  - python-telegram-bot (for Telegram integration)

## Prerequisites
- Python 3.11 or higher installed on your system
- A valid OpenAI API key
- Familiarity with using the terminal or command line
- `pip` package manager for Python

## Installation
1. Clone the repository:
   ```bash
   git clone <>
   cd edu-bot

# Create virtual environment
python -m venv venv

# Activate virtual environment

# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install the required dependencies:
pip install -r requirements.txt


# create a .env file in the project root directory with the following content:

OPENAI_API_KEY=your_openai_api_key_here.
Optional: Include these if using extensions.
TELEGRAM_TOKEN=your_telegram_bot_token.
HUGGINGFACE_API_KEY=your_huggingface_api_key.


 # Running the Application

Activate the virtual environment:

source venv/bin/activate  
# On Windows: venv\Scripts\activate


# Run the assistant:

python app.py


