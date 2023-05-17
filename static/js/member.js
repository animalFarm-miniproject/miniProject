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
                let name = a['name'];
                let mbti = a['mbti'];
                let temp_html = `<section class="col-sm-12 col-lg-6 my-3">
                                    <h3 class="fs-2">${name}</h3>
                                    <h3 class="fs-2">${mbti}</h3>
                                </section>`
                $('#mem').append(temp_html)
            }
        })
        comments.forEach((a)=>{
            let id = a["id"];
            let myId = a["_id"];
            if(id == ns){
                let comment = a['comment']
                let temp_html = `<tr>
                                    <td id="${myId}">${comment}</td>
                                    <td id="btn${myId}">
                                        <button type="button" id="update${myId}" onclick="modify('${myId}')">수정</button>
                                        <button type="button" id="delete${myId}" onclick="remove('${myId}')">삭제</button>
                                    </td>
                                </tr>`
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
}