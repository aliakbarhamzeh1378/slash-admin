# Perche Admin Backend

This is the backend service for the Perche Admin application, built with FastAPI and SQLite.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the backend directory with the following content:
```
SECRET_KEY=your-secret-key-here
BACKEND_CORS_ORIGINS=["http://localhost:5173"]  # Add your frontend URL
```

## Running the Application

1. Start the server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Swagger UI documentation: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- POST `/api/v1/auth/signin` - Sign in
- POST `/api/v1/auth/signup` - Sign up
- POST `/api/v1/auth/logout` - Log out

### Users
- GET `/api/v1/users/{user_id}` - Get user by ID

### Organizations
- GET `/api/v1/org` - List organizations 