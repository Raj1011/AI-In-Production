import os
from fastapi import FastAPI, Depends  # type: ignore
from fastapi.responses import StreamingResponse  # type: ignore
from fastapi_clerk_auth import ClerkConfig, ClerkHTTPBearer, HTTPAuthorizationCredentials  # type: ignore
from openai import OpenAI  # type: ignore

app = FastAPI()

jwksurl = os.getenv("CLERK_JWKS_URL")
print("Environment CLERK_JWKS_URL:", jwksurl) 
if not jwksurl:  
    jwksurl = "https://clerk.com/.well-known/jwks.json"

clerk_config = ClerkConfig( jwks_url=jwksurl )
clerk_gaurd = ClerkHTTPBearer(clerk_config)

@app.get("/api")
def idea( creds: HTTPAuthorizationCredentials = Depends(clerk_gaurd)):
    user_id = creds.decoded["sub"] # User ID from Clerk token- can be used for further user-specific logic
    client = OpenAI()
    prompt = [{"role": "user", "content": "Reply with a new business idea for AI Agents, formatted with headings, sub-headings and bullet points"}]
    stream = client.chat.completions.create(model="gpt-5-nano", messages=prompt, stream=True)

    def event_stream():
        for chunk in stream:
            text = chunk.choices[0].delta.content
            if text:
                lines = text.split("\n")
                for line in lines:
                    yield f"data: {line}\n"
                yield "\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")