from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
from bson import ObjectId
import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://sparta:testtest@cluster0.fyczism.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/animal')
def animal():
   return render_template('animal.html')

@app.route("/member", methods=["GET"])
def member_get():
    all_member = list(db.member.find({}))
    for i in all_member:
        i['_id'] = str(i['_id'])
    all_comments = list(db.comment.find({}))
    for i in all_comments:
        i['_id'] = str(i['_id'])
    return jsonify({'result': all_member, 'comments' : all_comments})

@app.route('/detail')
def detail():
    ns = request.args.get('namespace', default = 'ns-abc-aaa', type = str)
    print(ns)
    return render_template('member.html', ns=ns)

@app.route("/comment", methods=["POST"])
def comment_post():
    id_receive = request.form["id_give"]
    comment_receive = request.form["comment_give"]

    doc = {
        'id': id_receive,
        'comment': comment_receive
    }
    db.comment.insert_one(doc)
    return jsonify({'msg':'등록 완료!'})

@app.route("/modify", methods=["POST"])
def modify_post():
    id_receive = request.form["id_give"]
    comment_receive = request.form["comment_give"]

    db.comment.update_one({'_id':ObjectId(id_receive)},{'$set':{'comment':comment_receive}})
    return jsonify({'msg':'수정 완료!'})

@app.route("/remove", methods=["POST"])
def remove_post():
    id_receive = request.form["id_give"]

    db.comment.delete_one({'_id':ObjectId(id_receive)})
    return jsonify({'msg':'삭제 완료!'})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)