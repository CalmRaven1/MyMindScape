from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from services import ai_service, wolfram_service, gamification_service
from models import db, User, Course, Progress

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///mindscape.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/api/summarize', methods=['POST'])
def summarize_content():
    """AI-powered content summarization"""
    content = request.json.get('content')
    return jsonify(ai_service.summarize(content))

@app.route('/api/generate-quiz', methods=['POST'])
def generate_quiz():
    """Generate quiz from content"""
    content = request.json.get('content')
    difficulty = request.json.get('difficulty', 'medium')
    return jsonify(ai_service.generate_quiz(content, difficulty))

@app.route('/api/analyze', methods=['POST'])
def analyze_with_wolfram():
    """Process mathematical or scientific queries using Wolfram Alpha"""
    query = request.json.get('query')
    return jsonify(wolfram_service.process_query(query))

@app.route('/api/progress', methods=['POST'])
def update_progress():
    """Update user learning progress and achievements"""
    user_id = request.json.get('user_id')
    course_id = request.json.get('course_id')
    progress_data = request.json.get('progress')
    return jsonify(gamification_service.update_progress(user_id, course_id, progress_data))

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    """Get personalized learning recommendations"""
    user_id = request.args.get('user_id')
    return jsonify(ai_service.get_recommendations(user_id))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)