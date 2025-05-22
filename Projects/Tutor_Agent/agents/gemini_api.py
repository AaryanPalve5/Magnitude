import os
from langchain_google_genai import GoogleGenerativeAI

GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY")

llm = GoogleGenerativeAI(model="models/gemini-1.5-flash", google_api_key=GOOGLE_API_KEY)

def ask_gemini(subject, question):
    prompt = (
        f"You are an expert {subject} tutor. Answer the following student question in a clear, concise way:\n\n"
        f"{question}\n"
        "Answer:"
    )
    return llm(prompt)
