from flask import request
from flask import jsonify

import requests


from models.db import Database
from bson.json_util import dumps
from common.utils import safe_get_env_var

from api.v1.views import bp

from api.security.guards import (
    authorization_guard,
    permissions_guard,
    admin_messages_permissions
)

auth0_api_token = safe_get_env_var("AUTH0_API_TOKEN")
auth0_domain = safe_get_env_var("AUTH0_DOMAIN")


@bp.route("/users", methods=['GET'], strict_slashes=False)
@authorization_guard
def getUsers():
    user_type = request.headers['user_type']
    Database.initialize()
    users = Database.findAll(user_type)
    users = [{"id": str(user["id"]), "first_name": str(user["first_name"]), "last_name": str(user["last_name"]), "email": str(user["email"])}
             for user in users]
    return jsonify({"users": users})


@bp.route("/users/<user_id>", methods=['GET'], strict_slashes=False)
@authorization_guard
def getUser(user_id):
    user_type = request.headers['user_type']
    Database.initialize()
    user = Database.find(user_type, {"id": user_id})
    return dumps(list(user))


@bp.route("/users", methods=['POST'], strict_slashes=False)
@authorization_guard
@permissions_guard([admin_messages_permissions.read])
def postUser():
    password = request.form.get("password")
    email = request.form.get("email")
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")
    user_type = request.form.get("user_type")
    url = "https://" + auth0_domain + "/api/v2/users"

    data = {
        "authorization": auth0_api_token,
    }

    myobj = {
        "email": email,
        "password": password,
        "given_name": first_name,
        "family_name": last_name,
        "connection": "Username-Password-Authentication",
        "user_metadata": {
            "user_type": user_type
        },
    }

    response = requests.post(url, headers=data, json=myobj)

    return response.json()


@bp.route("/users/<user_id>", methods=['DELETE'], strict_slashes=False)
@authorization_guard
@permissions_guard([admin_messages_permissions.read])
def deleteUser(user_id):
    data = {
        "authorization": auth0_api_token,
    }
    user_type = request.headers['user_type']
    url = "https://" + auth0_domain + "/api/v2/users/" + user_id
    apiResponse = requests.delete(url, headers=data)
    Database.initialize()
    dbResponse = Database.delete(user_type, user_id)
    return jsonify({"Api Status Code": apiResponse.status_code})
