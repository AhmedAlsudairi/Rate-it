## Getting Started

### Installing Dependencies

#### Python 3.8

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

#### Virtual Enviornment

We recommend working within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organaized. Instructions for setting up a virual enviornment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)



#### PIP Dependencies

Once you have your virtual environment setup and running, install dependencies by naviging to the root directory and running:

```bash
pip install -r requirements.txt
```

This will install all of the required packages we selected within the `requirements.txt` file.


## Running the server

From within the root directory first ensure you are working using your created virtual environment.

To run the server, execute:

```bash
export FLASK_APP=app.py
export FLASK_ENV=development
flask run
```
## seed data base
flask seed courses
## Api Documentation
Endpoints
GET '/'
POST '/signup'
POST '/login'
GET '/usernames/<string:username>'
GET '/emails/<string:emails>'
GET '/favourite'
POST '/favourite'
DELETE '/favourite'
GET '/ratings'
POST '/ratings'
PATCH '/ratings'
DELETE '/ratings'
GET '/myRatings'
GET '/notifications'
DELETE '/notifications'

GET '/'
- main page for the website
- Request Arguments: 'jwt' for authentication
- Request variables: level if none 1 is default OR courseName OR courseId
- Returns: If the 'jwt' is valid:
http://127.0.0.1:5000/courses?courseName=معمل
{
    "courses": [
        {
            "content_density": null,
            "content_update": null,
            "course_id": "444 هاب",
            "difficulty_level": null,
            "favourite_by": [],
            "level": 7,
            "name": "معمل بناء البرمجيات",
            "ratings": [],
            "satisfaction": null,
            "total_rate": null
        }
    ],
    'success': True,
    'loged_in': True,
    "result_count": 1,
    'name': test
}
- If Not it will return error 401:
{
    'code': 'token_expired',
    'description': 'Token expired.'
}
- If there is no jwt in request (user loged out):
{
    "courses": [
        {
            "content_density": null,
            "content_update": null,
            "course_id": "444 هاب",
            "difficulty_level": null,
            "favourite_by": [],
            "level": 7,
            "name": "معمل بناء البرمجيات",
            "ratings": [],
            "satisfaction": null,
            "total_rate": null
        }
    ],
    "result_count": 1,
    'success': True,
    'log_in': False
}
POST '/signup'
- Creates a new user
- Request Arguments: username, password, email
- Returns: the created username
    {
        'success': True,
        'username': test
    }

POST '/login'
- log in the user if it already exist
- Request Arguments: username, password
    {
        'success': True,
        'username': username,
        'jwt': encoded_jwt
    }
- if the password is incorrect:
{
    'success': False,
    'message': 'incorrect password'
}

GET '/usernames/<string:username>'
- checks if username exists or not
- Request Arguments: username
- if username already exist:
    {
        'success': False,
        'message': 'Username already exists'

    }
- if username doesn't exist:
{
    'success': True
}


GET '/emails/<string:email>'
- checks if email exists or not
- Request Arguments: email
- if email already exist:
    {
        'success': False,
        'message': 'email already exists'

    }
- if email doesn't exist:
{
    'success': True
}


GET '/favourite'
- Get all favourite courses for a user
- Request Arguments: course, jwt

Request:
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdDEyMzQiLCJleHAiOjE2MDI0NzE0MDF9.JMTte6WA12YwFJha1NEBuFbMazczOZZwucsjveCAZrg"
}
Response:
{
    "favourite_courses": [
        {
            "course": {
                "content_density": null,
                "content_update": null,
                "course_id": "SWE 333",
                "difficulty_level": null,
                "level": 6,
                "name": "Software quality assurance",
                "ratings": [],
                "satisfaction": null,
                "total_rate": null
            },
            "user_id": "test1234"
        }
    ],
    "result_count": 1,
    "username": "test1234"
}


POST '/favourite'
- create a new favourite course for a user
- Request Arguments: course, jwt
Request:
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdDEyMzQiLCJleHAiOjE2MDI0NzE0MDF9.JMTte6WA12YwFJha1NEBuFbMazczOZZwucsjveCAZrg",
    "course": "SWE 333"
}
Response:
{
    "favourite_courses": [
        {
            "course": {
                "content_density": null,
                "content_update": null,
                "course_id": "SWE 333",
                "difficulty_level": null,
                "level": 6,
                "name": "Software quality assurance",
                "ratings": [],
                "satisfaction": null,
                "total_rate": null
            },
            "user_id": "test1234"
        }
    ],
    "result_count": 1,
    "username": "test1234"
}
DELETE '/favourite'
- Delete favourite course from a user
- Request Arguments: course, jwt
Request:
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdDEyMzQiLCJleHAiOjE2MDI0NzE0MDF9.JMTte6WA12YwFJha1NEBuFbMazczOZZwucsjveCAZrg",
    "course": "SWE 333"
}
Response:
{
    "favourite_courses": [],
    "result_count": 0,
    "username": "test1234"
}

GET '/ratings'
- Get all ratings for a course
- Request Arguments: course_id

Request:
http://127.0.0.1:5000/ratings?course_id=SWE 434
Response:
{
    "ratings": {
        "content_density": 45,
        "content_update": 47,
        "course_id": "SWE 434",
        "difficulty_level": 24.5,
        "level": 7,
        "name": "Software testing and validation",
        "ratings": [
            {
                "comment": "test",
                "content_density": 75,
                "content_update": 80,
                "course_id": "SWE 434",
                "difficulty_level": 35.0,
                "satisfaction": 60,
                "total_rate": 63,
                "user_id": "test1234"
            },
            {
                "comment": "test",
                "content_density": 14,
                "content_update": 14,
                "course_id": "SWE 434",
                "difficulty_level": 14.0,
                "satisfaction": 14,
                "total_rate": 14,
                "user_id": "234"
            }
        ],
        "satisfaction": 37,
        "total_rate": 39
    }
}


POST '/ratings'
- create a new rating for a course
Request:
{
    "username": "234",
    "course_id": "SWE 434",
    "comment": "test",
    "content_density": 14,
    "content_update": 14,
    "difficulty_level": 14,
    "satisfaction": 14
}
Response:
{
    "ratings": {
        "comment": "test",
        "content_density": 14,
        "content_update": 14,
        "course_id": "SWE 434",
        "difficulty_level": 14.0,
        "satisfaction": 14,
        "total_rate": 14,
        "user_id": "12345"
    }
}

PATCH '/ratings'
- create a like or a dislike for a rating
Request:
for a like put the username in liked_by and leave disliked_by empty
Request: 
{
    "username": "test3", //the user that liked or disliked the rating
    "course_id": "SWE 333",
    "liked_by": "test2",
    "disliked_by": ""
}

Response:
{
    "ratings": [
        {
            "comment": "test",
            "content_density": 25,
            "content_update": 25,
            "course_id": "SWE 333",
            "difficulty_level": 50.0,
            "disliked_by": [],
            "liked_by": [
                "test2"
            ],
            "num_of_likes": 1,
            "rating_id": 14,
            "satisfaction": 100,
            "total_rate": 50,
            "user_id": "test3"
        }
    ]
}

DELETE '/ratings'
- Delete a raitng from a course
- Request Arguments: course_id, username
- returns : success, all ratings for course_id after the process
Request:
{
    http://127.0.0.1:5000/ratings?username=12345&course_id=SWE 434
}
Response:
{
    "ratings": [
        {
            "comment": "test",
            "content_density": 25,
            "content_update": 25,
            "course_id": "SWE 434",
            "difficulty_level": 50.0,
            "satisfaction": 100,
            "total_rate": 50,
            "user_id": "test1234"
        }
    ],
    "success": true           
}


GET '/myRatings'
- Get all ratings for a given user
- Request Arguments: username

Request:
{
    http://127.0.0.1:5000/myRatings?username=234
}
Response:
{
    "ratings": [
        {
            "content_density": 14,
            "content_update": 14,
            "course_id": "SWE 434",
            "difficulty_level": 14.0,
            "satisfaction": 14,
            "total_rate": 14,
            "user_id": "234"
        }
    ]
}

GET '/notifications'
- Gets all notifications for a given user
- Request Arguments: username
Request:
{
http://127.0.0.1:5000/notifications?username=test4
}

Response:
{
    "notifications": [
        {
            "course_id": "SWE 314",
            "notify_id": 2
        },
        {
            "course_id": "SWE 333",
            "notify_id": 3
        }
    ],
    "num_of_notifications": 2
}

DELETE '/notifications'
- Delete a notification from a user notifications
- Request Arguments: username and notify_id
Request:
{
http://127.0.0.1:5000/notifications?username=test4&notify_id=3
}

Response:
{
    "notifications": [
        {
            "course_id": "SWE 314",
            "notify_id": 2
        }
    ],
    "num_of_notifications": 1
}