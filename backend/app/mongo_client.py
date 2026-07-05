from pymongo import MongoClient

from app.config import settings

_client: MongoClient | None = None


def get_mongo_client() -> MongoClient:
    global _client
    if _client is None:
        _client = MongoClient(settings.mongodb_url)
    return _client


def get_notes_collection():
    return get_mongo_client()["devlab"]["notes"]
