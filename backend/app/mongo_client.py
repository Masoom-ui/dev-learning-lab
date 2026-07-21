import certifi
from pymongo import MongoClient
from pymongo.server_api import ServerApi

from app.config import settings

_client: MongoClient | None = None


def get_mongo_client() -> MongoClient:
    global _client
    if _client is None:
        kwargs: dict = {}
        if settings.mongodb_url.startswith("mongodb+srv://"):
            kwargs["server_api"] = ServerApi("1")
            kwargs["tlsCAFile"] = certifi.where()
            kwargs["tlsDisableOCSPEndpointCheck"] = True
        _client = MongoClient(settings.mongodb_url, **kwargs)
    return _client


def get_notes_collection():
    return get_mongo_client()["devlab"]["notes"]
