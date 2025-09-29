
# Local RAG with Gemma3 (270M) using Ollama + LangChain

This project demonstrates how to run a local LLM (**Gemma3:270m**) with **Retrieval-Augmented Generation (RAG)** using [Ollama](https://ollama.ai/), [LangChain](https://www.langchain.com/), and [ChromaDB](https://www.trychroma.com/).  

It consists of two main files:
- `vector.py` → Handles document ingestion and builds a Chroma vector database.
- `main.py` → Runs the chatbot with retrieval and LLM responses.


## Prerequisites

1. **Install Ollama**  
   Download and install from [Ollama website](https://ollama.ai/).  
   Make sure the server is running locally (`http://localhost:11434`).  

   Pull the required Gemma3 model:
   ```bash
   ollama pull gemma3:270m
````

2. **Python Environment**
   Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Linux/Mac
   venv\Scripts\activate      # On Windows
   ```

3. **Dependencies**
   Save the following into `requirements.txt`:

   ```txt
   langchain
   langchain-ollama
   langchain-chroma
   pandas
   ```

   Then install:

   ```bash
   pip install -r requirements.txt
   ```

---

## File Overview

### `vector.py`

* Loads your dataset (CSV or PDF).
* Uses `OllamaEmbeddings` with `gemma3:270m` to create embeddings.
* Stores embeddings in a persistent Chroma vector store (`./chrome_langchain_db`).
* Exposes a retriever to fetch relevant documents during queries.

### `main.py`

* Initializes the Ollama LLM (`gemma3:270m`) pointing to `http://localhost:11434`.
* Loads the retriever from `vector.py`.
* Uses LangChain’s `ChatPromptTemplate` to combine retrieved context with user queries.
* Provides an interactive loop where you can ask questions and receive AI-generated answers.
* Type `q` to exit.

---

## Running the Project

1. Start the Ollama server (default: `http://localhost:11434`):

   ```bash
   ollama serve
   ```

2. Run the chatbot:

   ```bash
   python main.py
   ```

3. Example flow:

   ```
   -------------------------------
   Ask your question (q to quit): What are the top reviews?
   ```

   The model will fetch relevant context from the vector store and generate a response.

---

## Notes

* Ensure the model name in `main.py` is set correctly:

  ```python
  model="gemma3:270m"
  ```
* The Chroma vector DB is stored locally in `./chrome_langchain_db`. Delete this folder if you want to rebuild the database.
* Extend `vector.py` to support other file types (e.g., PDFs with `PyPDFLoader` from LangChain).
* The setup is fully local — no external API calls are required.

---

## Project Structure

```
.
├── main.py          # Main chatbot script
├── vector.py        # RAG vector store setup
├── requirements.txt # Python dependencies
└── README.md        # Project documentatimo
