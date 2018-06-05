function getUserTag() {
    var url = "/get_user_tag?";
    $.ajax({
        type: 'get',
        url: url ,
        async: true,
        success: function (res) {
            if (res){
                var tag=document.getElementById("music-tag");
                var inn ="";
                for (var a=0;a<res.length;a++){
                    inn+=' <option v="'+res[a].tag_name+'">'+res[a].tag_name+'</option>'
                }
                tag.innerHTML=inn;
            }
        }
        ,
        error: function () {

        }
    })
}
function getUserList() {
    var url = "/get_user_song_list?";
    $.ajax({
        type: 'get',
        url: url ,
        async: true,
        success: function (res) {

            console.log(res);
            if (res){
                var tag=document.getElementById("music-list");
                var inn ="";
                for (var a=0;a<res.length;a++){
                    inn+=' <option v="'+res[a].song_sheet_name+'">'+res[a].song_sheet_name+'</option>'
                }
                tag.innerHTML=inn;
            }
        }
        ,
        error: function () {

        }
    })
}
function addUserList(song_sheet_name,song_id) {
    var url = "/add_user_song_list_info?";
    var user = getUserInfo();
    $.ajax({
        type: 'get',
        url: url +"song_sheet_name="+song_sheet_name+"&user_id="+user+"&song_id="+song_id,
        async: true,
        success: function (res) {

            console.log(res);
            if (res){
                alert("添加成功");
            }
        }
        ,
        error: function () {

        }
    })
}
function addUserTag(tag_name,song_id) {
    var url = "/add_user_tag_info?";
    var user = getUserInfo();
    $.ajax({
        type: 'get',
        url: url +"tag_name="+tag_name+"&user_id="+user+"&song_id="+song_id,
        async: true,
        success: function (res) {

            console.log(res);
            if (res){
                alert("添加成功");
            }
        }
        ,
        error: function () {

        }
    })
}


getUserTag()
getUserList();
function getUserInfo() {
    if (document.cookie.length > 0) {
        var c_start, c_end;
        c_start = document.cookie.indexOf("user_id" + '=')
        if (c_start != -1) {
            c_start = c_start +"user_id".length + 1
            c_end = document.cookie.indexOf('; ', c_start)
            if (c_end == -1) c_end = document.cookie.length
            return document.cookie.substring(c_start, c_end);
        }
    }
    return ''
}

document.getElementById("add-list-btn").onclick=function(){
    var c =document.getElementById("music-list");
    var ci = c.selectedIndex;
    var song_sheet_name=c.options[ci].getAttribute("v");

    var song_id = JSON.parse(window.localStorage.getItem('currentSong')).song_id;
    addUserList(song_sheet_name,song_id);
    
}

document.getElementById("add-tag-btn").onclick = function(){
    var c =document.getElementById("music-tag");
    var ci = c.selectedIndex;
    var tag_name=c.options[ci].getAttribute("v");
    var song_id = JSON.parse(window.localStorage.getItem('currentSong')).song_id;
    addUserTag(tag_name,song_id);
}