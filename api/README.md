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