#!/usr/bin/env python3
"""
AI-based Local LLM with RAG System using Gemma3:270m
Main script for question answering with document retrieval
"""

import os
import sys
from typing import Optional

def clear_environment_variables():
    """Clear any environment variables that might interfere with model selection"""
    print("🧹 Clearing potentially conflicting environment variables...")
    cleared_vars = []
    
    for key in list(os.environ.keys()):
        if 'OLLAMA' in key.upper() or 'MODEL' in key.upper():
            cleared_vars.append(key)
            del os.environ[key]
    
    if cleared_vars:
        print(f"   Cleared: {cleared_vars}")
    else:
        print("   No conflicting variables found.")

def check_ollama_server():
    """Check if Ollama server is running"""
    import requests
    try:
        response = requests.get("http://localhost:11434/api/tags", timeout=5)
        if response.status_code == 200:
            models = response.json().get('models', [])
            model_names = [model['name'] for model in models]
            print(f"🟢 Ollama server is running. Available models: {model_names}")
            
            if 'gemma3:270m' not in model_names:
                print("⚠️  Warning: gemma3:270m not found in available models.")
                print("   Run: ollama pull gemma3:270m")
                return False
            return True
    except requests.exceptions.RequestException:
        print("❌ Ollama server is not running or not accessible at localhost:11434")
        print("   Please start Ollama server first: ollama serve")
        return False

def setup_model():
    """Initialize the Gemma3:270m model"""
    try:
        from langchain_ollama.llms import OllamaLLM
        
        print("🤖 Setting up Gemma3:270m model...")
        
        # Simple model setup
        model = OllamaLLM(
            model="gemma3:270m",
            base_url="http://localhost:11434"
        )
        
        print(f"   ✅ Model: {model.model}")
        print(f"   ✅ Base URL: {model.base_url}")
        
        return model
        
    except ImportError as e:
        print(f"❌ Missing dependencies: {e}")
        print("   Install with: pip install langchain-ollama langchain-core")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Model setup failed: {e}")
        sys.exit(1)

def create_prompt_template():
    """Create a simple prompt template"""
    from langchain_core.prompts import ChatPromptTemplate
    
    template = """Answer based on the context below.

Context: {reviews}
Question: {question}
Answer:"""
    
    return ChatPromptTemplate.from_template(template)

def test_model_connection(model):
    """Simple model test"""
    print("\n🧪 Testing model...")
    
    try:
        result = model.invoke("Hello, respond with 'working'")
        print(f"✅ Model test: {result.strip()[:50]}")
        return True
    except Exception as e:
        print(f"❌ Model test failed: {e}")
        return False

def load_vector_retriever():
    """Import and initialize the vector retriever"""
    print("\n🔍 Loading vector retriever...")
    
    try:
        # Check if sample.txt exists
        if not os.path.exists("sample.txt"):
            print("❌ sample.txt not found!")
            print("   Please create a sample.txt file with your documents.")
            return None
            
        from vector import retriever
        print("   ✅ Vector retriever loaded successfully")
        return retriever
        
    except ImportError as e:
        print(f"❌ Failed to import vector.py: {e}")
        print("   Make sure vector.py is in the same directory")
        return None
    except Exception as e:
        print(f"❌ Vector setup error: {e}")
        return None

def main():
    """Main function"""
    print("🚀 Starting Gemma3:270m RAG System")
    print("="*50)
    
    # Clear environment and check server
    clear_environment_variables()
    if not check_ollama_server():
        sys.exit(1)
    
    # Setup components
    model = setup_model()
    prompt = create_prompt_template()
    chain = prompt | model
    
    # Test model
    if not test_model_connection(model):
        sys.exit(1)
    
    # Load retriever
    retriever = load_vector_retriever()
    if retriever is None:
        sys.exit(1)
    
    # Start chat
    print("\n✅ Ready! Ask questions (q to quit)")
    
    while True:
        question = input("\n❓ Question: ").strip()
        
        if question.lower() == 'q':
            break
        if not question:
            continue
        
        try:
            reviews = retriever.invoke(question)
            result = chain.invoke({"reviews": reviews, "question": question})
            print(f"\n💡 {result.strip()}")
            
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()