from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from datetime import datetime
from pymongo import MongoClient
from bson import ObjectId
import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://sparta:testtest@cluster0.fyczism.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

@app.route('/')
def home():
   return render_template('index.html')

@app.route("/member", methods=["GET"])
def member_get():
    all_member = list(db.member.find({}))
    for i in all_member:
        i['_id'] = str(i['_id'])
    return jsonify({'result': all_member})

@app.route('/detail')
def detail():
    ns = request.args.get('namespace', default = 'ns-abc-aaa', type = str)
    print(ns)
    all_member = list(db.member.find({}))
    for i in all_member:
        i['_id'] = str(i['_id'])
        if i['_id'] == ns:
            member = i
            break
    all_comments = list(db.comment.find({}))
    comment = list()
    for i in all_comments:
        i['_id'] = str(i['_id'])
        if i['id'] == ns:
            comment.append(i)
    return render_template('member.html', ns=member, comment=comment)

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

@app.route('/animal')
def animal():
    return render_template('animal.html')

@app.route('/posting', methods=['POST'])
def posting():
    user_receive = request.form["user_give"]
    animal_receive = request.form["animal_give"]
    comment_receive = request.form["comment_give"]
    file = request.files["file_give"]
    # static 폴더에 저장될 파일 이름 생성하기
    today = datetime.now()
    mytime = today.strftime('%Y-%m-%d-%H-%M-%S')
    filename = f'file-{mytime}'
    # 확장자 나누기
    extension = file.filename.split('.')[-1]
    # static 폴더에 저장
    save_to = f'static/{filename}.{extension}'
    file.save(save_to)

    # DB에 저장
    doc = {
        'user': user_receive,
        'animal': animal_receive,
        'comment': comment_receive,
        'file': f'{filename}.{extension}'
    }
    db.image.insert_one(doc)
    return jsonify({'msg': '업로드 완료!'})

# 서버에서 이미지 정보 가져오기
@app.route('/listing', methods=['GET'])
def listing():
    images = list(db.image.find({}, {'_id': False}))
    return jsonify({'result': 'success', 'images': images})
   
if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)
