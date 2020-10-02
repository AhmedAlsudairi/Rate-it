from sqlalchemy import Column, String, create_engine
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import Blueprint
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

usersbp = Blueprint('seed', __name__)


@usersbp.cli.command('courses')
def seed():
    """Seed the database."""
    course1 = Course(course_id = '211 هاب', name = 'مدخل الى هندسة البرمجيات', level = 4)
    course2 = Course(course_id = '312 هاب', name = 'هندسة متطلبات البرمجيات', level = 5)
    course3 = Course(course_id = '314 هاب', name = 'هندسة أمن البرمجيات', level = 5)
    course4 = Course(course_id = '321 هاب', name = 'تصميم وعمارة البرمجيات', level = 6)
    course5 = Course(course_id = '333 هاب', name = 'ضمان جودة البرمجيات', level = 6)
    course6 = Course(course_id = '381 هاب', name = 'تطوير تطبيقات الشبكة العنكبوتية', level = 6)
    course7 = Course(course_id = '434 هاب', name = 'الاختبار والتحقق من البرمجيات', level = 7)
    course8 = Course(course_id = '444 هاب', name = 'معمل بناء البرمجيات', level = 7)
    course9 = Course(course_id = '477 هاب', name = 'الاخلاقيات والممارسة المهنية في هندسة البرمجيات', level = 7)
    course10 = Course(course_id = '479 هاب', name = 'التدريب الميداني', level = 7)
    course11 = Course(course_id = '482 هاب', name = 'تفاعلية بين الانسان والحاسب', level = 7)
    course12 = Course(course_id = '496 هاب', name = 'مشروع تخرج -1', level = 7)
    course13 = Course(course_id = '455 هاب', name = 'صيانة وتطور البرمجيات', level = 8)
    course14 = Course(course_id = '466 هاب', name = 'ادارة مشاريع البرمجيات', level = 8)
    course15 = Course(course_id = '497 هاب', name = 'مشروع تخرج -2', level = 8)
    
    course1.insert()
    course2.insert()
    course3.insert()
    course4.insert()
    course5.insert()
    course6.insert()
    course7.insert()
    course8.insert()
    course9.insert()
    course10.insert()
    course11.insert()
    course12.insert()
    course13.insert()
    course14.insert()
    course15.insert()





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
    difficulty_level = db.Column(db.Float(), nullable=True)
    content_density = db.Column(db.Integer, nullable=True)
    content_update = db.Column(db.Integer, nullable=True)
    satisfaction = db.Column(db.Integer, nullable=True)
    total_rate = db.Column(db.Integer, nullable=True)
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
    def insert(self):
        db.session.add(self)
        db.session.commit()



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