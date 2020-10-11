import json
from flask import request, _request_ctx_stack, abort
from functools import wraps
from jose import jwt


algo = 'HS256'  # HMAC-SHA 256
secret = 'learning'
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

def get_auth_token():
    if request.get_json() is None:
        return None
    body = request.get_json()
    if 'jwt' not in body:
        return None
    auth = body.get('jwt')
    if auth is None:
        raise AuthError({
            'code': 'authorization_header_missing',
            'description': 'Authorization header is expected.'
        }, 401)
    return auth

def verify_decode_jwt(token):
    decoded_jwt = jwt.decode(token, secret,options={'require': ['exp']}, algorithms = algo)
    name = decoded_jwt.get('name')

    return name

def requires_auth_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = get_auth_token()
            if token is None:
                raise AuthError({
                'code': 'authorization_header_missing',
                'description': 'Authorization header is expected.'
                }, 401)
            name = verify_decode_jwt(token)

            return f(name, *args, **kwargs)

        return wrapper

def check_log_in(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = get_auth_token()
            name = ''
            if token is not None:
                name = verify_decode_jwt(token)
            

            return f(name, *args, **kwargs)

        return wrapper