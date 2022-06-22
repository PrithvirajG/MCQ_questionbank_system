from pymongo import MongoClient
from loguru import logger
from os import getenv
from urllib.parse import quote_plus

# host = str(getenv("MONGO_HOST"))
database = getenv("QUESTION_BANK_DATABASE")
coll_question_bank = getenv("QUESTION_BANK_COLLECTION")

# db_question_paper = getenv("QUESTION_PAPER_DATABASE")
coll_question_paper = getenv("QUESTION_PAPER_COLLECTION")
coll_responses = getenv("STUDENT_ANSWERS")
MONGO_URL = "mongodb://127.0.0.1:27017/"

def ConnectMongoQuestionBank():
    while True:
        mongo_coll_ret = get_mongo_client(coll_question_bank)
        if mongo_coll_ret:
            logger.info("Connected to MongoDB successfully.")
            break
    return mongo_coll_ret

def ConnectMongoQuestionPaper():
    while True:
        mongo_coll_ret = get_mongo_client(coll_question_paper)
        if mongo_coll_ret:
            logger.info("Connected to MongoDB successfully.")
            break
    return mongo_coll_ret

def ConnectMongo_ShowResults():
    while True:
        mongo_coll_ret = get_mongo_client(coll_responses)
        if mongo_coll_ret:
            logger.info("Connected to MongoDB successfully.")
            break
    return mongo_coll_ret

def Filter_Meta_Data():

    pass



def get_mongo_client(collx):
    try:
        mongo_client = MongoClient(MONGO_URL)
        # print(db,coll, type(db))
        db = mongo_client[database]
        collection = db[collx]
        return collection
    except Exception as e:
        logger.debug(f'Error while Connecting to Mongo Client: | Error:{e}')
        raise e
