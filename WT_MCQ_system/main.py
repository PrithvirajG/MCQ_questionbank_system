# This is a sample Python script.
from DB.mongo_connection import ConnectMongoQuestionBank,ConnectMongoQuestionPaper,ConnectMongo_ShowResults
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from uvicorn import run
from bson import json_util
from fastapi.middleware.cors import CORSMiddleware
import random
from bson.objectid import ObjectId
from loguru import logger
import random
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

class SelectedQuestionPaper(BaseModel):
    object_id: str

class Question(BaseModel):
    question: str
    answer: str
    option1: str
    option2: str
    option3: str
    type: str
    field: str
    marks: int
    difficulty: int

class QuestionPaper(BaseModel):
    field: str
    generation_type: str #custom, automatic, premade
    number_of_question: int

class AnswerKey(BaseModel):
    student_name: str
    student_surname: str
    student_year: int
    student_gr_no: int
    question_paper_id: str
    answers_list: list
    quesID_ans_dict: dict

class ResponseDetails(BaseModel):
    student_name: str
    student_surname: str
    # student_year: int
    student_gr_no: int
    question_paper_id: str
    quesID_ans_dict: dict

class Result(BaseModel):
    result_ID: str

@app.post("/mcq/entered_questions/")
def enter_multiple_choice_question(ques:Question):
    mongo_coll = ConnectMongoQuestionBank()
    dict_line = {}
    dict_line["question"] = ques.question
    dict_line["answer"] = ques.answer
    dict_line["type"] = ques.type
    option_list = [ques.option1, ques.option2, ques.option3, ques.answer]
    print(option_list)
    shuffled_list = random.shuffle(option_list)
    print(shuffled_list, option_list)
    dict_line["options"] = option_list
    dict_line["field"] = ques.field
    dict_line["marks"] = ques.marks
    dict_line["difficulty"] = ques.difficulty
    post_id = mongo_coll.insert_one(dict_line).inserted_id


@app.post("/mcq/generate_question_paper/")
def generate_question_paper(ques_paper: QuestionPaper):
    qb_mongo_coll = ConnectMongoQuestionBank()
    qb_mongo_ret = qb_mongo_coll.find({'field':ques_paper.field})
    ques_list = []
    for ques in qb_mongo_ret:
        ques_list.append(ques['_id'])
    # print(random.sample(ques_list, ques_paper.number_of_question))
    final_question_list = random.sample(ques_list, ques_paper.number_of_question)
    question_paper_info = {"question_id_list": final_question_list, "field": ques_paper.field}
    qp_mongo_coll = ConnectMongoQuestionPaper()
    post_id = qp_mongo_coll.insert_one(question_paper_info).inserted_id

@app.post("/mcq/show_available_test/")
def show_question_papers():
    qp_mongo_coll = ConnectMongoQuestionPaper()
    qp_mongo_coll_ret = qp_mongo_coll.find({})
    all_card_info = []
    for (i,question_paper) in enumerate(qp_mongo_coll_ret):
        card_info = {'object_id': question_paper["_id"], 'subject':question_paper["field"], 'number_of_questions': len(question_paper["question_id_list"])}
        all_card_info.append(card_info)
        # all_card_info.append(card_info)
    data_ = json_util.dumps(all_card_info)
    main_data = json.loads(data_)
    return main_data

@app.post("/mcq/get_question_paper/")
def show_quiz_paper(obj_id: SelectedQuestionPaper):
    qb_mongo_coll = ConnectMongoQuestionBank()
    qp_mongo_coll = ConnectMongoQuestionPaper()
    id_ques_paper = ObjectId(obj_id.object_id)
    qp_mongo_coll_ret = qp_mongo_coll.find_one({'_id': id_ques_paper})
    all_question_info = []
    for questionID in qp_mongo_coll_ret['question_id_list']:
        id_ques = ObjectId(questionID)
        question_info = qb_mongo_coll.find_one({'_id': id_ques})
        quest_info = {"ques_id":question_info["_id"], "question":question_info["question"], "options":question_info["options"], "type":question_info["type"]}
        all_question_info.append(quest_info)

    data_ = json_util.dumps(all_question_info)
    main_data = json.loads(data_)
    # print("---->",main_data)

    return main_data

@app.post("/mcq/submit_paper/")
def store_and_check_submitted_paper(resp_details: ResponseDetails):
    qb_mongo_coll = ConnectMongoQuestionBank()
    sr_mongo_coll = ConnectMongo_ShowResults()
    # print("HAHAHHAHAHAH")
    # print(resp_details)
    answer_check_data = []
    marks = 0

    for (i, question_id) in enumerate(resp_details.quesID_ans_dict):
        id_ques = ObjectId(question_id)
        qb_mongo_coll_ret = qb_mongo_coll.find_one({"_id":id_ques})
        question = qb_mongo_coll_ret["question"]
        answer = qb_mongo_coll_ret["answer"]
        submitted_answer = resp_details.quesID_ans_dict[question_id]
        if(answer == submitted_answer):
            status = True
            marks += 2
        else:
            status = False

        answer_check_data.append({"question": question, "your_answer":submitted_answer, "actual_answer": answer, "status": status})
        print(i, question_id, submitted_answer)
    final_result_data = {"Name":resp_details.student_name, "Surname": resp_details.student_surname,
                         "GR_no": resp_details.student_gr_no, "QuestionPaperID": resp_details.question_paper_id, "Checking": answer_check_data, "marks":marks}
    post_id = sr_mongo_coll.insert_one(final_result_data).inserted_id
    # post_id_str = str(post_id)
    # print(post_id, type(post_id), post_id_str, type(post_id_str))
        # qb_mongo_coll.find({})
    # print(resp_details)
    data_ = json_util.dumps(post_id)
    main_data = json.loads(data_)

    return main_data


@app.post("/mcq/get_result/")
def check_question_paper_response(result_id: Result):
    result_id.result_ID
    res_id = ObjectId(result_id.result_ID)
    sr_mongo_coll = ConnectMongo_ShowResults()
    sr_mongo_coll_ret = sr_mongo_coll.find_one({"_id": res_id})

    data_ = json_util.dumps(sr_mongo_coll_ret)
    main_data = json.loads(data_)

    return main_data

if __name__ == '__main__':
    # print(int(PORT))
    run("main:app", host="0.0.0.0", port=5001, reload=True)



