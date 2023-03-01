from flask import request
from flask import jsonify
import json
import uuid

from models.db import Database
from bson.json_util import dumps, loads

from api.v1.views import bp


from api.security.guards import (
    authorization_guard,
)

""" ----- Get All classes ----- """
@bp.route("/classes", methods=['GET'], strict_slashes=False)
@authorization_guard
def getClasses():
    Database.initialize()
    classes = Database.findAll("classes")
    classes = [{"id": str(classs["id"]), "name": str(classs["name"]), "description": str(classs["description"]), "instructor": str(classs["instructor"]), "students": str(classs["students"]), "homework": str(classs["homework"]), "room_number":str(classs["room_number"])}
                 for classs in classes]
    return jsonify({"classes": classes})

""" ----- Create a new class All classes ----- """
@bp.route("/classes", methods=['POST'], strict_slashes=False)
@authorization_guard
def postClass():
    obj = {
        'id': str(uuid.uuid4()),
        'name' : request.form.get("name"),
        'description': request.form.get("description"),
        'instructor': request.form.get("instructor"),
        'room_number': request.form.get("room_number"),
        'students': json.loads(request.form.get("students")),
        'homework': json.loads(request.form.get("homework"))
    }
    Database.initialize()
    classs = Database.insert("classes", obj)
    return dumps(obj)

""" ----- Get All classes of a student ----- """
@bp.route("/classes/student/<student_id>", methods=['GET'], strict_slashes=False)
@authorization_guard
def getStudentClasses(student_id):
    Database.initialize()
    classs = Database.find("classes", {"students": student_id})
    return dumps(list(classs))

""" ----- Add a Student to a class ----- """
@bp.route("/classes/student/<class_id>/<student_id>", methods=['POST'], strict_slashes=False)
@authorization_guard
def addStudentToClass(class_id, student_id):
    Database.initialize()
    dbResponse = Database.update(
        "classes", class_id, {"$push": { "students": student_id }})
    return jsonify({"Status": "Student Added"})

""" ----- Remove a student from a class ----- """
@bp.route("/classes/student/<class_id>/<student_id>", methods=['PUT'], strict_slashes=False)
@authorization_guard
def RemoveStudentFromClass(student_id, class_id):
    Database.initialize()
    classs = Database.update(
        "classes", class_id, {"$pull": { "students": student_id }})
    return jsonify({"Status": "Student Removed from Class"})

""" ----- Get All classes of an Instructor ----- """
@bp.route("/classes/instructor/<instructor_id>", methods=['GET'], strict_slashes=False)
@authorization_guard
def getInstructorClasses(instructor_id):
    Database.initialize()
    classs = Database.find("classes", {"instructor": instructor_id})
    return dumps(list(classs))

""" ----- Add new homework to a class ----- """
@bp.route("/classes/homework/<class_id>", methods=['POST'], strict_slashes=False)
@authorization_guard
def PostHomework(class_id):
    homework = request.form.get("homework")
    Database.initialize()
    dbResponse = Database.update(
        "classes", class_id, {"$push": { "homework": homework }})
    return jsonify({"Status": "Homework Added"})

""" ----- Remove a homework from a class ----- """
@bp.route("/classes/homework/<class_id>", methods=['PUT'], strict_slashes=False)
@authorization_guard
def RemoveHomework(class_id):
    homework = request.form.get("homework")
    Database.initialize()
    dbResponse = Database.update(
        "classes", class_id, {"$pull": { "homework": homework }})
    return jsonify({"Status": "Homework Removed"})

@bp.route("/classes/<class_id>", methods=['DELETE'], strict_slashes=False)
@authorization_guard
def deleteClass(class_id):
    Database.initialize()
    dbResponse = Database.delete("classes", class_id)
    return jsonify({"Status": "Class Deleted"})
