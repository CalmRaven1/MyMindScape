# MindScape Deployment Guide

## Prerequisites
- Docker and Docker Compose
- Heroku CLI (for Heroku deployment)
- Git
- Node.js 18+
- Python 3.12+

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```
SECRET_KEY=your_secret_key
OPENAI_API_KEY=your_openai_api_key
WOLFRAM_APP_ID=your_wolfram_app_id
DATABASE_URL=your_database_url
```

## Deployment Options

### 1. Docker Deployment (Recommended)

1. Build and run with Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:80
- Backend: http://localhost:5000

### 2. Manual Deployment

#### Backend Deployment
1. Install dependencies:
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Set up environment variables
3. Initialize the database:
```bash
python init_db.py
```

4. Run the production server:
```bash
gunicorn app:app
```

#### Frontend Deployment
1. Install dependencies:
```bash
cd frontend
npm install
```

2. Build the production bundle:
```bash
npm run build
```

3. Serve using a web server like Nginx

### 3. Heroku Deployment

#### Backend Deployment
1. Create a new Heroku app:
```bash
heroku create mindscape-backend
```

2. Set environment variables:
```bash
heroku config:set SECRET_KEY=your_secret_key
heroku config:set OPENAI_API_KEY=your_openai_api_key
heroku config:set WOLFRAM_APP_ID=your_wolfram_app_id
```

3. Add PostgreSQL addon:
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

4. Deploy:
```bash
git subtree push --prefix backend heroku main
```

#### Frontend Deployment
1. Create a new Heroku app:
```bash
heroku create mindscape-frontend
```

2. Set build pack:
```bash
heroku buildpacks:set mars/create-react-app
```

3. Deploy:
```bash
git subtree push --prefix frontend heroku-frontend main
```

## Post-Deployment Steps

1. Initialize the database:
```bash
# For Heroku
heroku run python init_db.py

# For Docker
docker-compose exec backend python init_db.py
```

2. Verify the deployment:
- Check the frontend is accessible
- Test user registration and login
- Verify API endpoints are working
- Test database connections
- Check third-party integrations (OpenAI, Wolfram)

## Monitoring

1. Check application logs:
```bash
# Docker
docker-compose logs -f

# Heroku
heroku logs --tail
```

2. Monitor database:
```bash
# Heroku
heroku pg:info
```

## Backup

1. Database backup:
```bash
# Heroku
heroku pg:backups:capture
heroku pg:backups:download

# PostgreSQL
pg_dump mindscape > backup.sql
```

## Troubleshooting

1. If the frontend can't connect to the backend:
- Check API URL configuration
- Verify CORS settings
- Check network security groups

2. If database migrations fail:
- Check database connection string
- Verify database permissions
- Review migration logs

3. For authentication issues:
- Verify JWT secret key
- Check token expiration
- Review login endpoints

## Security Considerations

1. Enable HTTPS
2. Set secure cookie flags
3. Implement rate limiting
4. Enable database encryption
5. Regular security updates
6. Implement API key rotation
7. Enable database backups

## Performance Optimization

1. Enable caching
2. Implement CDN for static assets
3. Database indexing
4. API response compression
5. Image optimization
6. Load balancing (for scaling)