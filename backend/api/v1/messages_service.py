
from api.v1.message import Message
from common.utils import safe_get_env_var

auth0_api_token = safe_get_env_var("AUTH0_API_TOKEN")
auth0_domain = safe_get_env_var("AUTH0_DOMAIN")


def get_message():
    return Message(
        "This is a an api message."
    )


def get_users(token):

    return Message(
        repr(token)
    )


