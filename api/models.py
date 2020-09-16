from sqlalchemy import Column, String, create_engine
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import json
import os

database_path = os.environ['DATABASE_URL']

db = SQLAlchemy()

def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    Migrate(app, db)


class User(db.Model):
    __tablename__ = "users"
    username = db.Column(db.String(), primary_key=True, nullable=False)
    email = db.Column(db.String(), nullable=False)
    password = db.Column(db.String(), nullable=False)
    favourite_courses = db.relationship('FavouriteList', backref='user', lazy=True, cascade='all, delete')
    ratings = db.relationship('Rating', backref='user_ratings', lazy=True, cascade='all, delete')
    db.UniqueConstraint(email)

    def __init__(self, username, password, email):

        self.username = username
        self.password = password
        self.email = email
        

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'username': self.username,
            'email': self.email,
            'favourite_courses': self.favourite_courses,
            'ratings': self.ratings
        }


class Course(db.Model):
    __tablename__ = "courses"
    course_id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    difficulty_level = db.Column(db.Float(), nullable=False)
    content_density = db.Column(db.Integer, nullable=False)
    content_update = db.Column(db.Integer, nullable=False)
    satisfaction = db.Column(db.Integer, nullable=False)
    total_rate = db.Column(db.Integer, nullable=False)
    favourite_by = db.relationship('FavouriteList', backref='course', lazy=True, cascade='all, delete')
    ratings = db.relationship('Rating', backref='course_ratings', lazy=True, cascade='all, delete')

    def format(self):
        return {
            'course_id': self.course_id,
            'name': self.name,
            'level': self.level,
            'difficulty_level': self.difficulty_level,
            'content_density': self.content_density,
            'content_update': self.content_update,
            'total_rate': self.total_rate,
            'satisfaction': self.satisfaction,
            'favourite_by': self.favourite_by,
            'ratings': self.ratings
        }



class FavouriteList(db.Model):
    __tablename__ = "lists"
    user_id = db.Column(db.String(), db.ForeignKey("users.username"), primary_key=True)
    course_id = db.Column(db.String(), db.ForeignKey("courses.course_id"), primary_key=True)

    def __init__(self,user_id ,course_id):

        self.user_id = user_id
        self.course_id = course_id

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'user_id': self.user_id,
            'course_id': self.course_id
        }

class Rating(db.Model):
    __tablename__ = "ratings"
    user_id = db.Column(db.String(), db.ForeignKey("users.username"), primary_key=True)
    course_id = db.Column(db.String(), db.ForeignKey("courses.course_id"), primary_key=True)
    difficulty_level = db.Column(db.Float(), nullable=False)
    content_density = db.Column(db.Integer, nullable=False)
    content_update = db.Column(db.Integer, nullable=False)
    satisfaction = db.Column(db.Integer, nullable=False)
    total_rate = db.Column(db.Integer, nullable=False)

    def __init__(self,user_id ,course_id, difficulty_level, content_density, content_update, satisfaction, total_rate):

        self.user_id = user_id
        self.course_id = course_id
        self.difficulty_level = difficulty_level
        self.content_density = content_density
        self.content_update = content_update
        self.satisfaction = satisfaction
        self.total_rate = total_rate

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'user_id': self.user_id,
            'course_id': self.course_id,
            'difficulty_level': self.difficulty_level,
            'content_density': self.content_density,
            'content_update': self.content_update,
            'satisfaction': self.satisfaction,
            'total_rate': self.total_rate
        }