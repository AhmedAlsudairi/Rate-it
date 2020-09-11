import os
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import setup_db, User, Course, Rating, FavouriteList


    # create and configure the app
app = Flask(__name__)
CORS(app)
setup_db(app)



@app.route('/signup', methods=['POST'])
def create_user():
    body = request.get_json()

    if 'username' not in body or 'password' not in body:
        return abort(422)
    
    users = User.query.filter_by(username=body.get('username')).count()

    if users != 0:
        return jsonify({
            'success': False,
            'message': 'Username already exists'
        })
    username = body.get('username')
    password = body.get('password')

    new_user = User(username = username, password = password)
    new_user.insert()

    return jsonify({
        'success': True,
        'username': username
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
