from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()  # Reads values from .env file

# Get API key from environment variable
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("OPENAI_API_KEY is not set!")

# Initialize client
client = OpenAI(api_key=api_key)

# Test chat completion
def test_openai():
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # Free-tier accessible model
        messages=[
            {"role": "user", "content": "Hello from Vercel Python environment!"}
        ]
    )
    print("Response from OpenAI:")
    print(response.choices[0].message.content)

if __name__ == "__main__":
    test_openai()
