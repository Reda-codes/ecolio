from pymongo import MongoClient
from common.utils import safe_get_env_var

class Database():
    URL = safe_get_env_var("MONGODB_CONNECTION")
    DATABASE = None

    @staticmethod
    def initialize():
        client = MongoClient(Database.URL)
        Database.DATABASE = client["ecolio"]

    @staticmethod
    def find(collection, query):
        return Database.DATABASE[collection].find(query)

    @staticmethod
    def findAll(collection):
        return Database.DATABASE[collection].find()

    @staticmethod
    def findColl(collection, id , query):
        return Database.DATABASE[collection].find({"id": id}, query)

    @staticmethod
    def insert(collection, data):
        return Database.DATABASE[collection].insert_one(data)

    @staticmethod
    def delete(collection, id):
        return Database.DATABASE[collection].delete_one({'id': id})

    @staticmethod
    def update(collection, id, data):
        return Database.DATABASE[collection].update_one({"id": id}, data)

