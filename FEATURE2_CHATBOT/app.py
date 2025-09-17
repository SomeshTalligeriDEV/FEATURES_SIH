import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Load OpenAI API key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Configure OpenAI
openai.api_key = OPENAI_API_KEY

print("Educational Assistant Bot (Local Terminal Version)")
print("Type 'exit' to quit.\n")

def get_answer(question, context):
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",  # or "gpt-4" if you have access
            messages=[
                {"role": "system", "content": "You are an educational assistant."},
                {"role": "user", "content": f"Question: {question}\nContext: {context}"}
            ],
            max_tokens=150,
            temperature=0.7
        )
        answer = response.choices[0].message.content
        return answer.strip()
    except Exception as e:
        return f"Error: {str(e)}"

def main():
    context_text = "Photosynthesis is a process by which plants convert sunlight into energy."
    
    while True:
        question = input("Enter your question: ")
        
        if question.lower() == 'exit':
            print("Exiting the assistant. Goodbye!")
            break
        
        answer = get_answer(question, context_text)
        print(f"Answer: {answer}\n")

if __name__ == "__main__":
    main()
