# MindScape - AI-Powered Learning Platform

MindScape is an innovative learning platform that combines AI-powered study tools, gamification, and Wolfram technology to create an engaging and effective learning experience.

## Features

- 🤖 AI-powered content summarization and quiz generation
- 🎮 Gamified learning experience with achievements and progress tracking
- 📊 Interactive visualizations using Wolfram technology
- 📱 Responsive and intuitive user interface
- 🎯 Personalized learning recommendations
- 🧩 Interactive problem-solving challenges

## Tech Stack

### Backend
- Python/Flask
- OpenAI GPT-4
- Wolfram Alpha API
- SQLAlchemy
- PostgreSQL

### Frontend
- React
- Chakra UI
- Recharts
- Framer Motion

## Setup Instructions

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file in the backend directory with:
```
OPENAI_API_KEY=your_openai_api_key
WOLFRAM_APP_ID=your_wolfram_app_id
DATABASE_URL=your_database_url
```

4. Run the backend server:
```bash
python app.py
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Project Structure

```
mindscape/
├── backend/
│   ├── services/
│   │   ├── ai_service.py
│   │   ├── wolfram_service.py
│   │   └── gamification_service.py
│   ├── models.py
│   ├── app.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.js
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request