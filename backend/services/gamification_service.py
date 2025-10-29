from models import db, Progress, Achievement

def update_progress(user_id, course_id, progress_data):
    """Update user progress and check for achievements"""
    progress = Progress.query.filter_by(
        user_id=user_id,
        course_id=course_id
    ).first()

    if not progress:
        progress = Progress(user_id=user_id, course_id=course_id)
        db.session.add(progress)

    # Update progress
    progress.completion = progress_data.get('completion', progress.completion)
    progress.points += progress_data.get('points', 0)
    
    # Check for achievements
    achievements = check_achievements(user_id, progress)
    
    db.session.commit()
    
    return {
        "success": True,
        "progress": {
            "completion": progress.completion,
            "points": progress.points
        },
        "new_achievements": achievements
    }

def check_achievements(user_id, progress):
    """Check and award new achievements based on progress"""
    new_achievements = []
    
    # Achievement criteria
    if progress.points >= 1000:
        new_achievement = create_achievement(
            user_id,
            "Power Learner",
            "Earned 1000 points in learning activities"
        )
        if new_achievement:
            new_achievements.append(new_achievement)
    
    if progress.completion >= 100:
        new_achievement = create_achievement(
            user_id,
            "Course Master",
            "Completed an entire course"
        )
        if new_achievement:
            new_achievements.append(new_achievement)
    
    return new_achievements

def create_achievement(user_id, name, description):
    """Create a new achievement if not already earned"""
    existing = Achievement.query.filter_by(
        user_id=user_id,
        name=name
    ).first()
    
    if not existing:
        achievement = Achievement(
            user_id=user_id,
            name=name,
            description=description
        )
        db.session.add(achievement)
        return {
            "name": name,
            "description": description
        }
    return None