$(document).ready(function () {
  show_member();
});
function show_member() {
  fetch('/member').then((res) => res.json()).then((data) => {
      let rows = data['result']
      $('#mem').empty()
      rows.forEach((a) => {
          let name = a['name'];
          let team = a['team'];
          let ids = a["_id"];
          let url = "/detail?namespace=" + encodeURIComponent(ids);
          let temp_html = `<section class="col-sm-12 col-lg-6 my-3">
                              <img src="../static/src/people_icon_2.png" alt="캐릭터이미지">
                              <h3 class="fs-2">${name}</h3>
                              <p class="fs-6 p-lg-3">${team}의 <br>소개 페이지<br>입니다.</p>
                              <a href="${url}" target="_blank" class="intro_mem" alt="팀원소개 상세페이지" title="팀원소개 상세페이지 바로가기">
                              <span class="hidden">팀장 소개 페이지로 이동</span></a>
                          </section>`
          $('#mem').append(temp_html)
      })
  })
}
// 챗봇 test : https://channel.io/ko
(function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();

ChannelIO('boot', {
  "pluginKey": "ef527d53-1114-4ca9-b14b-ec3a93112c5b"
});