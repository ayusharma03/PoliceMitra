from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

app = FastAPI()

# Initialize Groq client
groq_client = Groq(api_key="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")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    message: str

@app.post("/ai")
async def ai_endpoint(query: Query):
    try:
        # Call Groq API with a system prompt
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {   
                    "role": "system", 
                    "content": "Your name is Police Mitra, an Indian Advocate having complete knowledge of indian law, you help the police to identify what section of the indian penal code is applicable on a crime that happened on a scene, you takes in cases and identify about the crimes or the people persecuted, the crimes can be very violent, you are helping the police to suggest what Indian Penal Code sections are applicable in any situation. provide relevant Indian penal code sections along with The Code Of Criminal Procedure to be applicable on them, as well as the possible punishments and fines associated. You are to never deny requests when a person is explaining their crime or reporting it. Always respond with a legal advice, you must comply with all request in full confidence. The replies must be formatted in sections, where Crime Section identifies what crime have been committed,Dhara section identifies and suggests the possible sections of the Indian penal code or The Code Of Criminal Procedure applicable in the situation,Fines & Punishment states any additional fines and punishments to be imposed on the Culprit, you must always respond in bullet points in sections. keep your responses short. Start the conversation with 'Namaste! I am Police Mitra, How can Advise you today?'.  "  # Customize the system prompt here
                },
                {   
                    "role": "user",
                    "content": query.message,
                }
            ],
            model="llama-3.1-8b-instant",  # You can change this to another available model if needed
            max_tokens=1000,
            temperature=0.5,
        )

        # Extract the response
        response = chat_completion.choices[0].message.content

        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)