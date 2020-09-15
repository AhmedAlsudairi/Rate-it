import os
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import setup_db, User, Course, Rating, FavouriteList
from jose import jwt
import datetime

class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

algo = 'HS256'  # HMAC-SHA 256
secret = 'learning'

# create and configure the app
app = Flask(__name__)
CORS(app)
setup_db(app)


@app.route('/', methods=['GET'])
def get_root():
    body = request.get_json()
    if 'jwt' in body:
        try:
            token = body.get('jwt')
            print(token)
            decoded_jwt = jwt.decode(token, secret, algorithms = algo)
            name = decoded_jwt.get('name')
            return jsonify({
                'success': True,
                'loged_in': True,
                'username': name
            })
        except jwt.ExpiredSignatureError:
            raise AuthError({
                'code': 'token_expired',
                'description': 'Token expired.'
            }, 401)
            
    return jsonify({
        'success': True,
        'log_in': False
    })


@app.route('/usernames/<string:username>')
def check_username(username):
    users = User.query.filter_by(username=username).count()

    if users != 0:
        return jsonify({
            'success': False,
            'message': 'Username already exists'
        })


@app.route('/emails/<string:email>')
def check_email(email):
    users = User.query.filter_by(email=email).count()

    if users != 0:
        return jsonify({
            'success': False,
            'message': 'email already exists'
        })


@app.route('/signup', methods=['POST'])
def create_user():
    body = request.get_json()

    if 'username' not in body or 'password' not in body or 'email' not in body:
        return abort(422)

    username = body.get('username')
    password = body.get('password')
    email = body.get('email')

    new_user = User(username=username, password=password, email=email)
    new_user.insert()

    return jsonify({
        'success': True,
        'username': username
    })


@app.route('/login', methods=['POST'])
def log_in():
    body = request.get_json()

    if 'username' not in body or 'password' not in body:
        return abort(422)

    username = body.get('username')
    password = body.get('password')

    users = User.query.filter_by(username=username).first()

    if password != users.password:
        return jsonify({
            'success': False,
            'message': 'incorrect password'
        })

    added_hour = datetime.timedelta(hours=6)
    payload = {'name': username, 'exp': datetime.datetime.now()+added_hour}
    encoded_jwt = jwt.encode(payload, secret, algorithm=algo)

    return jsonify({
        'success': True,
        'username': username,
        'jwt': encoded_jwt

    })

@app.errorhandler(AuthError)
def auth_error(e):
    return jsonify(e.error), e.status_code
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
