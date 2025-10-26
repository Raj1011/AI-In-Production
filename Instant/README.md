# Instant AI Project

This project demonstrates how to deploy an OpenAI-powered AI application on Vercel, showcasing a simple but practical implementation of AI capabilities in a serverless environment.

## Project Overview

The Instant project is a Python-based application that integrates with OpenAI's API to provide AI functionality through serverless functions on Vercel. It includes a basic implementation of chat completions using GPT-3.5-turbo.

## Prerequisites

- Python 3.6 or higher
- Vercel CLI
- OpenAI API key
- Git (for version control)

## Project Structure

```
Instant/
├── api/
│   └── test_openai.py    # OpenAI API integration test
├── requirements.txt      # Python dependencies
├── vercel.json          # Vercel configuration
└── .env                 # Environment variables (local development)
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <your-repository-url>
   cd Instant
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   Note: Keep your `.env` file in `.gitignore` to protect sensitive information.

4. **Local Development**
   - Run the test script locally:
     ```bash
     python api/test_openai.py
     ```
   - This will test the OpenAI API integration using the GPT-3.5-turbo model

## API Endpoints

### `/api/test_openai`
- **Method**: POST
- **Description**: Tests OpenAI integration by sending a simple message
- **Response**: Returns the AI's response to "Hello from Vercel Python environment!"

## Deployment on Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy the Project**
   ```bash
   vercel
   ```

4. **Environment Variables on Vercel**
   - Go to your project settings on Vercel dashboard
   - Add `OPENAI_API_KEY` as an environment variable
   - Value should be your OpenAI API key

## Configuration Files

### vercel.json
```json
{
  "version": 2,
  "builds": [
    { "src": "api/**/*.py", "use": "@vercel/python" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "api/$1" }
  ]
}
```

### requirements.txt
Contains the necessary Python packages:
- openai
- python-dotenv

## Security Considerations

1. Never commit your `.env` file or expose your API keys
2. Always use environment variables for sensitive information
3. Implement proper rate limiting and error handling in production

## Troubleshooting

1. **API Key Issues**
   - Ensure `OPENAI_API_KEY` is properly set in your environment
   - Verify the API key is valid and has sufficient credits
   - Check if the key is correctly configured in Vercel's environment variables

2. **Deployment Issues**
   - Verify all dependencies are listed in `requirements.txt`
   - Check Vercel deployment logs for any Python version conflicts
   - Ensure `vercel.json` configuration is correct

## Contributing

Feel free to submit issues and enhancement requests!

## License

[Add your chosen license here]

---

Created with ❤️ using OpenAI and Vercel