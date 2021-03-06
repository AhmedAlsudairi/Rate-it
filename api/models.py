from sqlalchemy import Column, String, create_engine
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import json
import os

database_path = "postgres://postgres:admin@localhost:5432/rateit"
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
    favourite_courses = db.relationship(
        'FavouriteList', backref='user', lazy=True, cascade='all, delete')
    ratings = db.relationship(
        'Rating', backref='user_ratings', lazy=True, cascade='all, delete')
    db.UniqueConstraint(email)
    notifications = db.relationship(
        'Notification', backref='user_notifications', lazy=True, cascade='all, delete')

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
    difficulty_level = db.Column(db.Float(), nullable=True)
    content_density = db.Column(db.Integer, nullable=True)
    content_update = db.Column(db.Integer, nullable=True)
    satisfaction = db.Column(db.Integer, nullable=True)
    total_rate = db.Column(db.Integer, nullable=True)
    favourite_by = db.relationship(
        'FavouriteList', backref='course', lazy=True, cascade='all, delete')
    ratings = db.relationship(
        'Rating', backref='course_ratings', lazy=True, cascade='all, delete')

    def format(self):

        course_format = {
            'course_id': self.course_id,
            'name': self.name.capitalize(),
            'level': self.level,
            'difficulty_level': self.difficulty_level,
            'content_density': self.content_density,
            'content_update': self.content_update,
            'total_rate': self.total_rate,
            'satisfaction': self.satisfaction,
            'ratings': [rating.format() for rating in self.ratings]
        }
        sorted_obj = dict(course_format)
        course_format['ratings'] = sorted(
            sorted_obj['ratings'], key=lambda x: x['num_of_likes'], reverse=True)
        return course_format

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()


class FavouriteList(db.Model):
    __tablename__ = "lists"
    user_id = db.Column(db.String(), db.ForeignKey(
        "users.username", ondelete="CASCADE"), primary_key=True)
    course_id = db.Column(db.String(), db.ForeignKey(
        "courses.course_id", ondelete="CASCADE"), primary_key=True)

    def __init__(self, user_id, course_id):

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
            'course': Course.query.get(self.course_id).format()
        }


class Rating(db.Model):
    __tablename__ = "ratings"
    rating_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(), db.ForeignKey("users.username", ondelete="CASCADE"))
    course_id = db.Column(db.String(), db.ForeignKey("courses.course_id", ondelete="CASCADE"))
    comment = db.Column(db.String(), nullable=False)
    difficulty_level = db.Column(db.Float(), nullable=False)
    content_density = db.Column(db.Integer, nullable=False)
    content_update = db.Column(db.Integer, nullable=False)
    satisfaction = db.Column(db.Integer, nullable=False)
    total_rate = db.Column(db.Integer, nullable=False)
    likes = db.relationship('Like', backref='ratings_likes',
                            lazy=True, cascade='all, delete')
    dislikes = db.relationship(
        'DisLike', backref='ratings_dislikes', lazy=True, cascade='all, delete')

    def __init__(self, user_id, course_id, comment, difficulty_level, content_density, content_update, satisfaction, total_rate):

        self.user_id = user_id
        self.course_id = course_id
        self.comment = comment
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
        likes = [like.liked_by for like in self.likes]
        dislikes = [dislike.disliked_by for dislike in self.dislikes]
        num_of_likes = len(likes) - len(dislikes)
        return {
            'rating_id': self.rating_id,
            'user_id': self.user_id,
            'course_id': self.course_id,
            'comment': self.comment,
            'difficulty_level': self.difficulty_level,
            'content_density': self.content_density,
            'content_update': self.content_update,
            'satisfaction': self.satisfaction,
            'total_rate': self.total_rate,
            'liked_by': likes,
            'disliked_by': dislikes,
            'num_of_likes': num_of_likes
        }


class Like(db.Model):
    __tablename__ = "likes"
    raitng_id = db.Column(db.Integer(), db.ForeignKey(
        "ratings.rating_id", ondelete="CASCADE"), primary_key=True)
    liked_by = db.Column(db.String(), db.ForeignKey(
        "users.username", ondelete="CASCADE"), primary_key=True)

    def __init__(self, rating_id, liked_by):

        self.raitng_id = rating_id
        self.liked_by = liked_by

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
            'rating': self.raitng_id,
            'liked_by': self.liked_by
        }


class DisLike(db.Model):
    __tablename__ = "dislikes"
    raitng_id = db.Column(db.Integer(), db.ForeignKey(
        "ratings.rating_id", ondelete="CASCADE"), primary_key=True)
    disliked_by = db.Column(db.String(), db.ForeignKey(
        "users.username", ondelete="CASCADE"), primary_key=True)

    def __init__(self, rating_id, disliked_by):

        self.raitng_id = rating_id
        self.disliked_by = disliked_by

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
            'rating': self.raitng_id,
            'disliked_by': self.disliked_by
        }


class Notification(db.Model):

    __tablename__ = 'notifications'
    user_id = db.Column(db.String(), db.ForeignKey("users.username", ondelete="CASCADE"), nullable = False)
    course_id = db.Column(db.String(), db.ForeignKey("courses.course_id", ondelete="CASCADE"), nullable = False)
    notify_id = db.Column(db.Integer,  primary_key=True)

    def __init__(self, user_id, course_id):

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
            'notify_id': self.notify_id,
            'course_id': self.course_id
        }

