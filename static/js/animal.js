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

    fetch('/guestbook', { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
      alert(data["msg"]);
      window.location.reload();
    });
  }
  function show_comment() {
    fetch('/guestbook').then((res) => res.json()).then((data) => {
      let rows = data['result']
      $("#comment-list").empty()
      rows.forEach((a) => {
        let name = a['name']
        let comment = a['comment']

        let temp_html = `<div class="card">
                          <div class="card-body">
                              <blockquote class="blockquote mb-0">
                                  <p>${comment}</p>
                                  <footer class="blockquote-footer float-end">${name}</footer>
                                  <button onclick="delete_comment()" type="button" class="btn btn-danger float-end">
                                    Delete
                                  </button>
                              </blockquote>
                          </div>
                      </div>`
        $("#comment-list").append(temp_html)
      })
    })
  }
  function delete_comment() {}