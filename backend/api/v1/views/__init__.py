from flask import (
    Blueprint
)

bp_name = 'api-v1'
bp_url_prefix = '/api/v1'
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)

from api.v1.views.users import *
