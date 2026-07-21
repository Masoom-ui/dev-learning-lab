import certifi
from pymongo import MongoClient

from app.config import settings

_client: MongoClient | None = None


def get_mongo_client() -> MongoClient:
    global _client
    if _client is None:
        kwargs: dict = {}
        # Atlas (mongodb+srv) needs CA bundle; slim Docker images lack system certs
        if settings.mongodb_url.startswith("mongodb+srv://"):
            kwargs["tlsCAFile"] = certifi.where()
        _client = MongoClient(settings.mongodb_url, **kwargs)
    return _client


def get_notes_collection():
    return get_mongo_client()["devlab"]["notes"]
