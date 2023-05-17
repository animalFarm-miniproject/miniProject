function register(){
  let urlParams = new URL(location.href).searchParams;
  let name = urlParams.get('namespace');
  let comment = $("#floatingTextarea").val();

  let formData = new FormData();
  formData.append("id_give", name);
  formData.append("comment_give", comment);

  fetch('/comment', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
      alert(data["msg"]);
      window.location.reload();
  });
}
function modify(id){
  let comment =  $('#'+id).text();
  let tmp = `<textarea class="form-control" placeholder="Leave a comment here" id="modify${id}">${comment}</textarea>`
  let tmp2 = `<a type="button" class="btn btn-dark btn-sm" id="confirm${id}" onclick="confirm('${id}')">확인</a>`
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