"""Initialize the database with sample data"""
from app import app, db
from models import User, Course, Progress, Achievement
from datetime import datetime

def init_db():
    with app.app_context():
        # Drop all tables
        db.drop_all()
        
        # Create all tables
        db.create_all()

        # Create sample users
        users = [
            User(username='john_doe', email='john@example.com'),
            User(username='jane_smith', email='jane@example.com'),
        ]
        db.session.add_all(users)
        db.session.commit()

        # Create sample courses
        courses = [
            Course(
                title='Introduction to Mathematics',
                description='Basic mathematics concepts and problem-solving techniques',
                difficulty='beginner'
            ),
            Course(
                title='Physics Fundamentals',
                description='Core concepts in physics with interactive simulations',
                difficulty='intermediate'
            ),
            Course(
                title='Computer Science Basics',
                description='Introduction to programming and computer science concepts',
                difficulty='beginner'
            ),
        ]
        db.session.add_all(courses)
        db.session.commit()

        # Create sample progress
        progress_entries = [
            Progress(
                user_id=users[0].id,
                course_id=courses[0].id,
                completion=75.0,
                points=150
            ),
            Progress(
                user_id=users[0].id,
                course_id=courses[1].id,
                completion=30.0,
                points=60
            ),
        ]
        db.session.add_all(progress_entries)
        db.session.commit()

        # Create sample achievements
        achievements = [
            Achievement(
                user_id=users[0].id,
                name='Quick Starter',
                description='Completed first lesson'
            ),
            Achievement(
                user_id=users[0].id,
                name='Math Explorer',
                description='Completed 5 math exercises'
            ),
        ]
        db.session.add_all(achievements)
        db.session.commit()

if __name__ == '__main__':
    init_db()
    print('Database initialized with sample data!')