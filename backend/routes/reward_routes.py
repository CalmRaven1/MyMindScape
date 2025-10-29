# Learning Path routes
@app.route('/api/learning-path', methods=['GET'])
@auth_service.token_required
def get_learning_path(current_user):
    """Get user's learning path, challenges, and achievements"""
    return jsonify(reward_system.RewardSystem.get_learning_path(current_user.id))

@app.route('/api/progress/update', methods=['POST'])
@auth_service.token_required
def update_user_progress(current_user):
    """Update user progress and check for achievements"""
    activity_data = request.json.get('activity_data', {})
    
    # Calculate points
    points = reward_system.RewardSystem.calculate_points(
        activity_data.get('activity_type'),
        activity_data.get('difficulty', 'beginner'),
        activity_data.get('performance', 1.0)
    )
    
    # Update progress in database
    progress = Progress.query.filter_by(
        user_id=current_user.id,
        course_id=activity_data.get('course_id')
    ).first()
    
    if not progress:
        progress = Progress(
            user_id=current_user.id,
            course_id=activity_data.get('course_id'),
            points=points
        )
        db.session.add(progress)
    else:
        progress.points += points
    
    # Check for new achievements
    new_achievements = reward_system.RewardSystem.check_achievements(
        current_user.id,
        activity_data
    )
    
    db.session.commit()
    
    # Get updated level info
    level_info = reward_system.RewardSystem.get_level_info(progress.points)
    
    return jsonify({
        'success': True,
        'points_earned': points,
        'total_points': progress.points,
        'level_info': level_info,
        'new_achievements': new_achievements
    })