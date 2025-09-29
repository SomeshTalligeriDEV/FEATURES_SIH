#!/usr/bin/env python3
"""
Simple vector store setup for Gemma3:270m RAG system
"""

import os
import sys

# Check if sample.txt exists
if not os.path.exists("sample.txt"):
    print("❌ sample.txt not found! Create this file with your documents.")
    sys.exit(1)

try:
    from langchain_ollama import OllamaEmbeddings
    from langchain_chroma import Chroma
    from langchain_core.documents import Document
    from langchain_community.document_loaders import TextLoader
    from langchain_text_splitters import RecursiveCharacterTextSplitter
except ImportError as e:
    print(f"❌ Missing packages: {e}")
    print("Install: pip install langchain-ollama langchain-chroma langchain-community")
    sys.exit(1)

print("📄 Loading documents...")

# Load documents
loader = TextLoader("sample.txt", encoding='utf-8')
documents = loader.load()

# Split into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=100
)
chunks = splitter.split_documents(documents)
print(f"Created {len(chunks)} chunks")

# Setup embeddings (try mxbai first, fallback to nomic)
try:
    embeddings = OllamaEmbeddings(model="mxbai-embed-large")
    print("Using mxbai-embed-large")
except:
    try:
        embeddings = OllamaEmbeddings(model="nomic-embed-text")
        print("Using nomic-embed-text")
    except Exception as e:
        print(f"❌ No embedding model available: {e}")
        print("Install: ollama pull mxbai-embed-large")
        sys.exit(1)

# Create vector store
db_path = "./chroma_db"
vector_store = Chroma(
    persist_directory=db_path,
    embedding_function=embeddings
)

# Add documents if database is empty
if not os.path.exists(db_path) or len(os.listdir(db_path)) == 0:
    print("📝 Adding documents to vector store...")
    vector_store.add_documents(chunks)
    print("✅ Documents added")
else:
    print("📚 Using existing database")

# Create retriever
retriever = vector_store.as_retriever(search_kwargs={"k": 3})

print("✅ Vector store ready!")