from flask import request
from flask import jsonify
import uuid

from models.db import Database
from bson.json_util import dumps, loads

from api.v1.views import bp


from api.security.guards import (
    authorization_guard,
)


@bp.route("/announcements", methods=['GET'], strict_slashes=False)
@authorization_guard
def getAnnouncements():
    Database.initialize()
    announcements = Database.findAll("announcements")
    announcements = [{"id": str(announcement["id"]), "description": str(announcement["description"])}
                     for announcement in announcements]
    return jsonify({"announcements": announcements})


@bp.route("/announcements/<announcement_id>", methods=['GET'], strict_slashes=False)
@authorization_guard
def getAnnouncement(announcement_id):
    Database.initialize()
    announcement = Database.find("announcements", {"id": announcement_id})
    return dumps(list(announcement))


@bp.route("/announcements", methods=['POST'], strict_slashes=False)
@authorization_guard
def postAnnouncement():
    obj = {
        'id': str(uuid.uuid4()),
        'description': request.form.get("description"),
    }
    Database.initialize()
    announcement = Database.insert("announcements", obj)
    return dumps(obj)


@bp.route("/announcements/<announcement_id>", methods=['PUT'], strict_slashes=False)
@authorization_guard
def putAnnouncement(announcement_id):
    request_json = request.get_json()
    Database.initialize()
    dbResponse = Database.update(
        "announcements", announcement_id, {"$set": request_json})
    return jsonify({"Status": "announcement Updated"})


@bp.route("/announcements/<announcement_id>", methods=['DELETE'], strict_slashes=False)
@authorization_guard
def deleteAnnouncements(announcement_id):
    Database.initialize()
    dbResponse = Database.delete("announcements", announcement_id)
    return jsonify({"Status": "announcement Deleted"})
