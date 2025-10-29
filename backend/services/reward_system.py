from flask import jsonify
from models import db, User, Achievement
from datetime import datetime

class RewardSystem:
    POINT_MULTIPLIERS = {
        'beginner': 1,
        'intermediate': 1.5,
        'advanced': 2
    }
    
    ACHIEVEMENT_CRITERIA = {
        'Quick Learner': {'points': 100},
        'Knowledge Explorer': {'courses_started': 3},
        'Course Master': {'courses_completed': 1},
        'Quiz Champion': {'quiz_score': 100},
        'Dedication Badge': {'streak_days': 7},
        'Math Wizard': {'math_problems': 50},
        'Science Explorer': {'wolfram_queries': 25},
        'Study Streak': {'daily_logins': 5},
        'Perfect Score': {'perfect_quizzes': 3},
        'Helper': {'collaborations': 5}
    }

    @staticmethod
    def calculate_points(activity_type, difficulty, performance=1.0):
        """Calculate points based on activity type, difficulty, and performance"""
        base_points = {
            'quiz_completion': 50,
            'course_progress': 30,
            'daily_login': 10,
            'problem_solving': 40,
            'collaboration': 20
        }
        
        multiplier = RewardSystem.POINT_MULTIPLIERS.get(difficulty, 1)
        return int(base_points.get(activity_type, 0) * multiplier * performance)

    @staticmethod
    def check_achievements(user_id, activity_data):
        """Check and award new achievements based on activity"""
        new_achievements = []
        user = User.query.get(user_id)
        
        current_stats = {
            'points': sum(p.points for p in user.progress),
            'courses_started': len(user.progress),
            'courses_completed': len([p for p in user.progress if p.completion == 100]),
            'quiz_score': activity_data.get('quiz_score', 0),
            'streak_days': activity_data.get('streak_days', 0),
            'math_problems': activity_data.get('math_problems', 0),
            'wolfram_queries': activity_data.get('wolfram_queries', 0),
            'daily_logins': activity_data.get('daily_logins', 0),
            'perfect_quizzes': activity_data.get('perfect_quizzes', 0),
            'collaborations': activity_data.get('collaborations', 0)
        }
        
        for achievement, criteria in RewardSystem.ACHIEVEMENT_CRITERIA.items():
            for stat, required_value in criteria.items():
                if (
                    current_stats[stat] >= required_value and
                    not Achievement.query.filter_by(user_id=user_id, name=achievement).first()
                ):
                    new_achievement = Achievement(
                        user_id=user_id,
                        name=achievement,
                        description=f"Earned for {stat.replace('_', ' ')}",
                        earned_at=datetime.utcnow()
                    )
                    db.session.add(new_achievement)
                    new_achievements.append({
                        'name': achievement,
                        'description': new_achievement.description
                    })
        
        if new_achievements:
            db.session.commit()
        
        return new_achievements

    @staticmethod
    def get_level_info(points):
        """Calculate user level based on points"""
        level = 1
        points_needed = 100
        
        while points >= points_needed:
            level += 1
            points_needed = int(points_needed * 1.5)
        
        next_level_points = points_needed
        current_level_points = int(points_needed / 1.5)
        progress = (points - current_level_points) / (next_level_points - current_level_points) * 100
        
        return {
            'level': level,
            'points': points,
            'progress': progress,
            'next_level': level + 1,
            'points_needed': next_level_points - points
        }

    @staticmethod
    def get_learning_path(user_id):
        """Get personalized learning path with challenges"""
        user = User.query.get(user_id)
        total_points = sum(p.points for p in user.progress)
        level_info = RewardSystem.get_level_info(total_points)
        
        # Generate challenges based on user level and progress
        challenges = [
            {
                'id': 1,
                'title': 'Daily Learning Streak',
                'description': 'Study for 7 consecutive days',
                'reward_points': 100,
                'progress': min(user.current_streak / 7 * 100, 100) if hasattr(user, 'current_streak') else 0
            },
            {
                'id': 2,
                'title': 'Quiz Master',
                'description': 'Complete 5 quizzes with perfect scores',
                'reward_points': 200,
                'progress': min(user.perfect_quizzes / 5 * 100, 100) if hasattr(user, 'perfect_quizzes') else 0
            },
            {
                'id': 3,
                'title': 'Problem Solver',
                'description': 'Solve 20 math problems using Wolfram Alpha',
                'reward_points': 150,
                'progress': min(user.wolfram_queries / 20 * 100, 100) if hasattr(user, 'wolfram_queries') else 0
            }
        ]
        
        return {
            'level_info': level_info,
            'challenges': challenges,
            'achievements': [
                {
                    'name': a.name,
                    'description': a.description,
                    'earned_at': a.earned_at.isoformat()
                }
                for a in user.achievements
            ]
        }