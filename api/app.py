import os
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import setup_db, User, Course, Rating, FavouriteList, Like, DisLike, Notification
from seed_data import usersbp
from auth import AuthError, requires_auth_decorator, check_log_in
import datetime
from jose import jwt


secret = 'learning'
algo = 'HS256'  # HMAC-SHA 256
# create and configure the app
app = Flask(__name__)
setup_db(app)
app.register_blueprint(usersbp)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET, POST, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Origin',
                         '*')
    return response


@app.route('/courses', methods=['GET'])
@check_log_in
def get_root(name):
    courseName = request.args.get('courseName', type=str)
    if courseName is not None:
        courses = Course.query.filter(Course.name.ilike(
            f'%{courseName}%') | Course.course_id.ilike(f'%{courseName}%')).all()
    else:
        level = request.args.get('level', 1, type=int)
        courses = Course.query.filter_by(level=level).all()

    courses_format = [course.format() for course in courses]
    result_count = len(courses_format)
    if name != '':
        return jsonify({
            'success': True,
            'loged_in': True,
            'username': name,
            'courses': courses_format,
            'result_count': result_count
        })
    else:
        return jsonify({
            'success': True,
            'log_in': False,
            'courses': courses_format,
            'result_count': result_count
        })


@app.route('/usernames/<string:username>')
def check_username(username):
    users = User.query.filter_by(username=username).count()

    if users != 0:
        return jsonify({
            'success': False
        })
    else:
        return jsonify({
            'success': True
        })


@app.route('/emails/<string:email>')
def check_email(email):
    users = User.query.filter_by(email=email).count()

    if users != 0:
        return jsonify({
            'success': False
        })

    else:
        return jsonify({
            'success': True
        })


@app.route('/signup', methods=['POST'])
def create_user():
    if request.get_json() is None:
        abort(422)
    body = request.get_json()

    if 'username' not in body or 'password' not in body or 'email' not in body:
        return abort(422)

    username = body.get('username')
    password = body.get('password')
    email = body.get('email')

    response_username = check_username(username).get_json()
    response_email = check_username(email).get_json()
    if response_username['success'] and response_email['success']:
        new_user = User(username=username, password=password, email=email)
        new_user.insert()
    else:
        abort(422)

    return jsonify({
        'success': True,
        'username': username
    })


@app.route('/login', methods=['POST'])
def log_in():
    if request.get_json() is None:
        print('no body')
        abort(422)

    body = request.get_json()
    if 'username' not in body or 'password' not in body:
        print('no u p')
        return abort(422)

    username = body.get('username')
    password = body.get('password')

    users = User.query.filter_by(username=username).first()
    if users is None:
        abort(404)
    print(users.password)
    print(password)
    if password != users.password:
        abort(401)

    added_hour = datetime.timedelta(hours=6)
    payload = {'name': username, 'exp': datetime.datetime.now()+added_hour}
    encoded_jwt = jwt.encode(payload, secret, algorithm=algo)

    return jsonify({
        'success': True,
        'username': username,
        'jwt': encoded_jwt

    })


@app.route('/favourite', methods=['GET'])
@requires_auth_decorator
def get_favourite_list(name):
    user = User.query.get(name)

    favourite = user.favourite_courses
    favourite_format = [course.format() for course in favourite]

    return jsonify({
        "username": name,
        "favourite_courses": favourite_format,
        'result_count': len(favourite_format)
    })


@app.route('/favourite', methods=['POST'])
@requires_auth_decorator
def create_favourite_list(name):
    course_id = request.args.get('course', None, type=str)
    if course_id is None:
        abort(422)
    user = User.query.get(name)
    course = Course.query.get(course_id)
    favourite_check = FavouriteList.query.filter(
        FavouriteList.user_id == name, FavouriteList.course_id.ilike(f'%{course_id}%')).first()
    if favourite_check is not None:
        abort(422)
    favourite = FavouriteList(user_id=name, course_id=course_id)

    favourite.insert()
    favourite = user.favourite_courses
    favourite_format = [course.format() for course in favourite]

    return jsonify({
        "username": name,
        'favourite_courses': favourite_format,
        'result_count': len(favourite_format)
    })


@app.route('/favourite', methods=['DELETE'])
@requires_auth_decorator
def delete_favourite_list(name):
    course_id = request.args.get('course', None, type=str)
    if course_id is None:
        abort(422)
    user = User.query.get(name)
    course = Course.query.get(course_id)
    favourite = FavouriteList.query.filter(
        FavouriteList.user_id == name, FavouriteList.course_id.ilike(f'%{course_id}%')).first()
    if favourite is None:
        abort(404)
    favourite.delete()
    favourite = user.favourite_courses
    favourite_format = [course.format() for course in favourite]

    return jsonify({
        "username": name,
        'favourite_courses': favourite_format,
        'result_count': len(favourite_format)
    })


def update_rating(course):
    length = 1
    if len(course.ratings) != 0:
        length = len(course.ratings)
    total_difficulty, total_density, total_update, total_satisfaction, total_rating = 0, 0, 0, 0, 0
    for rating in course.ratings:
        total_difficulty = total_difficulty + rating.difficulty_level
        total_density = total_density + rating.content_density
        total_update = total_update + rating.content_update
        total_satisfaction = total_satisfaction + rating.satisfaction
        total_rating = total_rating + rating.total_rate

    course.difficulty_level = total_difficulty/length
    course.content_density = total_density/length
    course.content_update = total_update/length
    course.satisfaction = total_satisfaction/length
    course.total_rate = total_rating/length

    course.update()


@app.route('/ratings', methods=['GET'])
def get_ratings():
    course_id = request.args.get('course_id', None, type=str)
    if course_id is None:
        abort(422)

    course = Course.query.get(course_id)

    if course is None:
        abort(404)

    return jsonify({
        'ratings': course.format()
    })


@app.route('/ratings', methods=['POST'])
def create_rating():
    body = request.get_json()
    if 'username' not in body:
        abort(422)
    course_id = body.get('course_id')
    username = body.get('username')
    comment = body.get('comment')
    difficulty_level = body.get('difficulty_level')
    content_density = body.get('content_density')
    content_update = body.get('content_update')
    satisfaction = body.get('satisfaction')

    rating = Rating.query.filter(
        Rating.user_id == username, Rating.course_id == course_id).first()
    if rating is not None:
        abort(422)

    course = Course.query.get(course_id)
    user = User.query.get(username)
    if course is None or user is None:
        abort(404)

    total_rate = (difficulty_level+content_density +
                  content_update+satisfaction)/4
    rating = Rating(user_id=username, course_id=course_id, comment=comment,  difficulty_level=difficulty_level,
                    content_density=content_density, content_update=content_update, satisfaction=satisfaction, total_rate=total_rate)

    rating.insert()
    update_rating(course)
    notify(course, username)
    
    return jsonify({
        'ratings': [rating.format() for rating in course.ratings]
    })

def notify(course, user_id):
    course_id = course.course_id
    favs = course.favourite_by
    usernames = [fav.user_id for fav in favs]
    for username in usernames:
        if username != user_id:
            notify = Notification(user_id = username, course_id = course_id)
            notify.insert()


@app.route('/ratings', methods=['PATCH'])
def update_ratings():
    body = request.get_json()

    if 'liked_by' not in body or 'disliked_by' not in body or 'username' not in body or 'course_id' not in body:
        abort(422)

    liked_by = body['liked_by']
    disliked_by = body['disliked_by']
    username = body['username']
    course_id = body['course_id']

    rating = Rating.query.filter(
        Rating.user_id == username, Rating.course_id == course_id).first()
    user = User.query.get(liked_by)
    course = Course.query.get(course_id)
    if rating is None or course is None:
        abort(404)

    if len(disliked_by) == 0:
        user = User.query.get(liked_by)
        if user is None:
            abort(404)
        like = Like.query.get((rating.rating_id, liked_by))
        if like is not None:
            abort(422)
        dislike = DisLike.query.get((rating.rating_id, liked_by))
        if dislike is not None:
            dislike.delete()
        like = Like(rating_id=rating.rating_id, liked_by=liked_by)
        like.insert()


    else:
        user = User.query.get(disliked_by)
        if user is None:
            abort(404)
        dislike = DisLike.query.get((rating.rating_id, disliked_by))
        if dislike is not None:
            abort(422)
        like = Like.query.get((rating.rating_id, disliked_by))
        if like is not None:
            like.delete()
        dislike = DisLike(rating_id=rating.rating_id, disliked_by=disliked_by)
        dislike.insert()

    return jsonify({
        'ratings': [rating.format() for rating in course.ratings]

    })


@app.route('/myRatings', methods=['GET'])
def get_myRatings():
    username = request.args.get('username', None, type=str)

    ratings = User.query.get(username).ratings

    return jsonify({
        'ratings': [rating.format() for rating in ratings]
    })


@app.route('/myRatings', methods=['DELETE'])
def delete_myRatings():
    username = request.args.get('username', None, type=str)
    course_id = request.args.get('course_id', None, type=str)
    if username is None or course_id is None:
        abort(422)
    rating = Rating.query.get((username, course_id))
    course = Course.query.get(course_id)
    user = User.query.get(username)

    if rating is None or course is None:
        abort(404)

    user = User.query.get(username)
    rating.delete()
    update_rating(course)

    favourite = FavouriteList.query.get((username, course_id))
    if favourite is not None:
        notify = Notification.query.get((username, course_id))
        notify.delete()

    return jsonify({
        'success': True,
        'ratings': [rating.format() for rating in user.ratings]
    })
@app.route('/notifications', methods=['GET'])
def get_notifications():
    username = request.args.get('username', None, type=str)
    if username is None:
        abort(422)
    user = User.query.get(username)
    notifications = [notification.format() for notification in user.notifications]

    return jsonify({
        'notifications': notifications,
        'num_of_notifications': len(notifications)
    })
@app.route('/notifications', methods=['DELETE'])
def delete_notification():
    notify = request.args.get('notify_id', None, type=str)
    username = request.args.get('username', None, type=str)

    if notify is None or username is None:
        abort(422)
    user = User.query.get(username)
    notify = Notification.query.get(notify)
    notifications = [notification.format() for notification in user.notifications]

    return jsonify({
        'notifications': notifications,
        'num_of_notifications': len(notifications)
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'error': 404,
        'message': 'RESOURCE NOT FOUND!'

    }), 404


@app.errorhandler(422)
def unproccesable(error):
    return jsonify({
        'success': False,
        'error': 422,
        'message': 'UNPROCESSABLE ENTITY!'

    }), 422


@app.errorhandler(405)
def not_allowed(error):
    return jsonify({
        'success': False,
        'error': 405,
        'message': 'METHOD NOT ALLOWED!'

    }), 405


@app.errorhandler(AuthError)
def auth_error(e):
    return jsonify(e.error), e.status_code


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
