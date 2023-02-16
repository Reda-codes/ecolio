from flask import request
from flask import jsonify
import uuid

from models.db import Database
from bson.json_util import dumps, loads

from api.v1.views import bp


from api.security.guards import (
    authorization_guard,
)


@bp.route("/notes", methods=['GET'], strict_slashes=False)
@authorization_guard
def getNotes():
    Database.initialize()
    notes = Database.findAll("notes")
    notes = [{"id": str(note["id"]), "description": str(note["description"]), "instructor": note["instructor_name"]}
             for note in notes]
    return jsonify({"notes": notes})


@bp.route("/notes/<note_id>", methods=['GET'], strict_slashes=False)
@authorization_guard
def getNote(note_id):
    Database.initialize()
    note = Database.find("notes", {"id": note_id})
    return dumps(list(note))


@bp.route("/notes/student/<student_id>", methods=['GET'], strict_slashes=False)
@authorization_guard
def getStudentNotes(student_id):
    Database.initialize()
    notes = Database.find("notes", {"student_id": student_id})
    return dumps(list(notes))


@bp.route("/notes/instructor/<instructor_id>", methods=['GET'], strict_slashes=False)
@authorization_guard
def getInstructorNotes(instructor_id):
    Database.initialize()
    notes = Database.find("notes", {"instructor_id": instructor_id})
    return dumps(list(notes))


@bp.route("/notes", methods=['POST'], strict_slashes=False)
@authorization_guard
def postNote():
    obj = {
        'id': str(uuid.uuid4()),
        'instructor_name': request.form.get("instructor_name"),
        'student_id': request.form.get("student_id"),
        'description': request.form.get("description")
    }
    Database.initialize()
    note = Database.insert("notes", obj)
    return dumps(obj)


@bp.route("/notes/<note_id>", methods=['PUT'], strict_slashes=False)
@authorization_guard
def putNote(note_id):
    request_json = request.get_json()
    Database.initialize()
    dbResponse = Database.update(
        "notes", note_id, {"$set": request_json})
    return jsonify({"Status": "note Updated"})


@bp.route("/notes/<note_id>", methods=['DELETE'], strict_slashes=False)
@authorization_guard
def deleteNote(note_id):
    Database.initialize()
    dbResponse = Database.delete("notes", note_id)
    return jsonify({"Status": "note Deleted"})
