$(document).ready(function () {
  show_me();
});
function show_me() {
  fetch('/member').then((res) => res.json()).then((data) => {
    let rows = data['result']
    let comments = data['comments']
    let ns = {{ns|tojson}};
    $('#mem').empty()
    rows.forEach((a) => {
        let ids = a["_id"];
        if (ids == ns) {
            let blog = a['blog'];
            let image = a['image'];
            let mbti = a['mbti'];
            let name = a['name'];
            let strength = a['strength'];
            let style = a['style'];
            let team = a['team'];
            let temp_html = `<div class="card mb-3 border-0" style="min-width: 300px; width: 45%;">
                              <div class="row g-0">
                                <div class="col-md-4">
                                  <img src="../static/src/people_icon_2.png" alt="이름아이콘" class="img-fluid">
                                  <a href="http://127.0.0.1:5000/" type="button" class="btn btn-back" onclick="back()">뒤로</a>
                                </div>
                                <div class="col-md-8 text-center align-content-center">
                                  <div class="card-body text-start">
                                  <h4 class="card-text float-end mbti">${mbti}</h4>
                                  <h3 class="card-title fs-5 py-2">${name}</h3>
                                  <h3 class="card-title fs-5 py-2">${strength}</h3>
                                  <h5 class="card-text fs-6  py-1">${style}</h5>
                                  <h5 class="card-text fs-6  py-1">${team}</h5>
                                  <h5 class="card-text fs-6  py-1">${blog}</h5>
                                  </div>
                                </div>
                              </div>
                            </div>`
            $('#mem').append(temp_html)
        }
    })
    comments.forEach((a)=>{
        let id = a["id"];
        let myId = a["_id"];
        if(id == ns){
            let comment = a['comment']
            let temp_html = `<div class="col-12 py-3">
                              <div class="card border-light cardComment py-2 px-3">
                                <div class="card-body" id="${myId}">
                                  <blockquote class="blockquote mb-0">
                                    <p class="text-start">${comment}</p>
                                    <footer class="blockquote-footer float-end">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                                  </blockquote>
                                </div>
                                <div class="mybtns pb-3" id="btn${myId}">
                                  <a type="button" class="btn btn-dark btn-sm" id="update${myId}" onclick="modify('${myId}'>수정</a>
                                  <a type="button" class="btn btn-outline-secondary btn-sm" id="update${myId}" onclick="remove('${myId}')">삭제</a>
                                </div>
                              </div>
                            </div>`
            $('#c').append(temp_html);
        }
    })
  })
}
function register(){
  let ns = {{ns|tojson}};
  let comment = $("#floatingTextarea").val();

  let formData = new FormData();
  formData.append("id_give", ns);
  formData.append("comment_give", comment);

  fetch('/comment', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
      alert(data["msg"]);
      window.location.reload();
  });
}
function modify(id){
  let comment =  $('#'+id).text();
  let tmp = `<textarea class="form-control" placeholder="Leave a comment here" id="modify${id}">${comment}</textarea>`
  let tmp2 = `<button type="button" id="confirm${id}" onclick="confirm('${id}')">확인</button>`
  $('#'+id).empty().append(tmp);
  $('#btn'+id).empty().append(tmp2);
}
function confirm(id){
  let comment = $("#modify"+id).val();
  let formData = new FormData();
  formData.append("id_give", id);
  formData.append("comment_give", comment);

  fetch('/modify', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
      alert(data["msg"]);
      window.location.reload();
  });
}
function remove(id){
  let formData = new FormData();
  formData.append("id_give", id);

  fetch('/remove', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
      alert(data["msg"]);
      window.location.reload();
  });
};