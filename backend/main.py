from fastapi import FastAPI
from routers import usersRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  # React dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # allow GET, POST, OPTIONS, etc.
    allow_headers=["*"],  # allow all headers (like Content-Type)
)

app.include_router(usersRouter.router)

@app.get("/")
def root():
    return {"message": "Backend running!"}