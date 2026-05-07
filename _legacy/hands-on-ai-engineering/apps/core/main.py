from fastapi import FastAPI

app = FastAPI(title="Agentic Alpha Core")

@app.get("/")
async def root():
    return {"message": "Agentic Alpha Core API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
