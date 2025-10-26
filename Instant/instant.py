from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from openai import OpenAI

app = FastAPI()
@app.get("/", response_class=HTMLResponse   )
def instant():
    # Get API key from environment variable
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        raise ValueError("OPENAI_API_KEY is not set!")

    client = OpenAI(api_key=api_key)
    message = """
    You are on a website that has just been deployed to production for the first time!
    Please reply with an enthusiastic announcement to welcome visitors to the site, explaining that it is live on production.
    """
    messages = [ {"role": "user", "content": message} ]
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    reply = response.choices[0].message.content.replace("\n", "<br>")
    html = (
        f"<html><body><h1>Welcome to Instant!</h1><p>{reply}</p></body></html>"
    )
    return html
    