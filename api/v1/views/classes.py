from flask import request
from flask import jsonify
import uuid

from models.db import Database
from bson.json_util import dumps, loads

from api.v1.views import bp


from api.security.guards import (
    authorization_guard,
)


@bp.route("/classes", methods=['GET'], strict_slashes=False)
@authorization_guard
def getClasses():
    Database.initialize()
    classes = Database.findAll("classes")
    classes = [{"id": str(classs["id"]), "name": str(classs["name"]), "description": str(classs["description"]), "instructor": str(classs["instructor"]), "students": str(classs["students"]), "homework": str(classs["homework"])}
                 for classs in classes]
    return jsonify({"classes": classes})


@bp.route("/classes/<class_id>", methods=['GET'], strict_slashes=False)
@authorization_guard
def getClass(class_id):
    Database.initialize()
    classs = Database.find("classes", {"id": class_id})
    return dumps(list(classs))


@bp.route("/classes/<class_id>/homework", methods=['GET'], strict_slashes=False)
@authorization_guard
def getClassHomework(class_id):
    Database.initialize()
    classs = Database.findColl("classes", class_id, {'homework': 1})
    return dumps(list(classs))


@bp.route("/classes/<class_id>/homework", methods=['PUT'], strict_slashes=False)
@authorization_guard
def putClassHomework(class_id):
    Database.initialize()
    classs = Database.findColl("classes", class_id, {'homework': 1})
    return dumps(list(classs))


@bp.route("/classes", methods=['POST'], strict_slashes=False)
@authorization_guard
def postClass():
    obj = {
        'id': str(uuid.uuid4()),
        'name' : request.form.get("name"),
        'description': request.form.get("description"),
        'instructor': request.form.get("instructor"),
        'room_number': request.form.get("room_number"),
        'students': request.form.get("students"),
        'homework': request.form.get("homework")
    }
    Database.initialize()
    classs = Database.insert("classes", obj)
    return dumps(obj)


@bp.route("/classes/<class_id>", methods=['PUT'], strict_slashes=False)
@authorization_guard
def putClass(class_id):
    request_json = request.get_json()
    Database.initialize()
    dbResponse = Database.update(
        "classes", class_id, {"$set": request_json})
    return jsonify({"Status": "Class Updated"})

@bp.route("/classes/<class_id>", methods=['DELETE'], strict_slashes=False)
@authorization_guard
def deleteClass(class_id):
    Database.initialize()
    dbResponse = Database.delete("classes", class_id)
    return jsonify({"Status": "Class Deleted"})
