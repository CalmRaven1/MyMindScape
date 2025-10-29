from flask import jsonify
from flask_login import login_user, logout_user, current_user
from models import User, db
from datetime import datetime
import jwt
import os
from functools import wraps

SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[1]
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'message': 'Token is invalid'}), 401
            
        return f(current_user, *args, **kwargs)
    return decorated

def register_user(data):
    """Register a new user"""
    if User.query.filter_by(email=data['email']).first():
        return {'error': 'Email already registered'}, 400
        
    if User.query.filter_by(username=data['username']).first():
        return {'error': 'Username already taken'}, 400
    
    user = User(
        username=data['username'],
        email=data['email']
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    token = generate_token(user)
    
    return {
        'token': token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    }

def login(data):
    """Login user and return token"""
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.check_password(data['password']):
        token = generate_token(user)
        return {
            'token': token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }
    
    return {'error': 'Invalid credentials'}, 401

def generate_token(user):
    """Generate JWT token for user"""
    return jwt.encode(
        {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(days=1)
        },
        SECRET_KEY,
        algorithm='HS256'
    )

def get_user_profile(user_id):
    """Get user profile with progress and achievements"""
    user = User.query.get(user_id)
    if not user:
        return {'error': 'User not found'}, 404
        
    achievements = [
        {
            'name': a.name,
            'description': a.description,
            'earned_at': a.earned_at.isoformat()
        }
        for a in user.achievements
    ]
    
    progress = [
        {
            'course': {
                'id': p.course.id,
                'title': p.course.title,
                'difficulty': p.course.difficulty
            },
            'completion': p.completion,
            'points': p.points,
            'last_activity': p.last_activity.isoformat()
        }
        for p in user.progress
    ]
    
    return {
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'created_at': user.created_at.isoformat()
        },
        'achievements': achievements,
        'progress': progress
    }