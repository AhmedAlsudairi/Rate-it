import os
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import setup_db, User, Course, Rating, FavouriteList 
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
    courseName = request.args.get('courseName', type = str)
    courseId = request.args.get('courseId', type = str)
    if courseName is not None:
        courses = Course.query.filter(Course.name.like(f'%{courseName}%')).all()
    elif courseId is not None:
        print(courseId)
        courses = Course.query.filter(Course.course_id.like(f'%{courseId}%')).all()
    else:
        level = request.args.get('level', 1, type = int)
        courses = Course.query.filter_by(level = level).all()
        
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
    if response_username['success'] and response_email['success'] :
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
    print(body)
    if 'username' not in body or 'password' not in body:
        print('no u p')
        return abort(422)

    username = body.get('username')
    password = body.get('password')

    users = User.query.filter_by(username=username).first()
    if users is None:
        abort(404)
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
