$(document).ready(function () {
    set_temp();
    show_comment();
  });
  function set_temp() {
    fetch("http://spartacodingclub.shop/sparta_api/weather/seoul").then((res) => res.json()).then((data) => {
      let temp = data['temp']
      $("#temp").text(temp)
    })
  }
  function save_comment() {
    let url = $("#url").val();
    let name = $("#name").val();
    let comment = $("#comment").val();

    let formData = new FormData();
    formData.append("url_give", url);
    formData.append("name_give", name);
    formData.append("comment_give", comment);

    fetch('/animal', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
      alert(data["msg"]);
      window.location.reload();
    });
  }
  function show_comment() {
    fetch('/animal').then((res) => res.json()).then((data) => {
      let rows = data['result']
      $("#comment-list").empty()
      rows.forEach((a) => {
        let name = a['name']
        let comment = a['comment']

        let temp_html = `<div class="card card-comment">
                          <div class="card-body">
                            <img src="${url}" class="img-thumbnail img-fluid w-25 float-start mx-3" alt="...">
                            <blockquote class="blockquote mb-0">
                              <p class="card-text text-start comment">${comment}</p>
                              <footer class="blockquote-footer float-end px-3">${name}</footer>
                            </blockquote>
                          </div>
                        </div>`
        $("#comment-list").append(temp_html)
      })
    })
  }
  function delete_comment() {}