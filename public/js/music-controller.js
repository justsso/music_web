var lists =  JSON.parse(window.localStorage.currentSongList)
console.log(lists)
var listLength = lists.length;
var music = $('#music')[0];  //audio
var musicNow =  getMusicNow(getParameterByName('song_id')) ;
var musicMode = 0; //0 循环 1单曲循环 2随机
music.volume = 0.8;
function getParameterByName(name,url){
    if (!url)
        url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function getMusicNow(song_id){
    for (let index = 0; index < lists.length; index++) {
        const element = lists[index];
        if(element.song_id === song_id){
            return index
        }
        
    }
}

// 歌曲列表准备好
function init() {
    // for (var i = 0; i < listLength; i++) {
    //     var tr = '<tr class="row"><td class="list-name">' + lists[i].name + '</td><td class="list-author">' + lists[i].author + '</td></tr>';
    //     $('table').append(tr)
    // }
    for (var i = 0; i < listLength; i++) {
        var tr = '<tr class="row"><td class="list-name">' + lists[i].title + '</td><td class="list-author">' + lists[i].author + '</td></tr>';
        $('table').append(tr)
    }
}

function togglePlay() {
    if (music.paused) {
        $('#music-play').removeClass('glyphicon-play');
        $('#music-play').addClass('glyphicon-pause');
        music.play();
        $('.album-cover').removeClass('animation-paused')
    } else {
        $('#music-play').addClass('glyphicon-play');
        $('#music-play').removeClass('glyphicon-pause');
        music.pause();
        $('.album-cover').addClass('animation-paused')
    }
}

// 上一首
function preMusic() {
    switch (musicMode) {
        case 0:
            musicNow--;
            if (musicNow < 0) {
                musicNow = listLength - 1
            }
            break;
        case 1:
            break;
        case 2:
            musicNow = parseInt(listLength * Math.random());
            break
    }
    $('#music-play').removeClass('glyphicon-play');
    $('#music-play').addClass('glyphicon-pause');
    freshInformation();
    $('.album-cover').removeClass('animation-paused')
}
// 下一首
function nextMusic() {
    switch (musicMode) {
        case 0:
            musicNow++;
            if (musicNow > (listLength - 1)) {
                musicNow = 0
            }
            break;
        case 1:
            break;
        case 2:
            musicNow = parseInt(listLength * Math.random());
            break
    }
    $('#music-play').removeClass('glyphicon-play');
    $('#music-play').addClass('glyphicon-pause');
    freshInformation();
    $('.album-cover').removeClass('animation-paused')
}

function stopMusic() {
    music.load();
    $('#music-play').addClass('glyphicon-play');
    $('#music-play').removeClass('glyphicon-pause');
    music.pause();
    $('.album-cover').addClass('animation-paused')
}

function progressJump(event) {
    console.log( event.offsetX +" "+$('#pregress-on').width()+" "+music.duration);
    var i = event.offsetX / $('#pregress-on').width();
    music.currentTime = i * music.duration
}

function volumeJump(event) {
    music.muted = false;
    var i = event.offsetX /  $('#pregress-v-on').width();
    var percentI = toPercent(i);
    music.volume = i;
    freshVolume();
    $('.volume-progress-bar').css({width: percentI})
}
// 音量大小更换不同的图像
function freshVolume() {
    if (music.volume <= 1 && music.volume > 0.5) {
        $('.volume-icon').removeClass('glyphicon-volume-off');
        $('.volume-icon').removeClass('glyphicon-volume-down');
        $('.volume-icon').addClass('glyphicon-volume-up')
    } else if (music.volume > 0 && music.volume <= 0.5) {
        $('.volume-icon').removeClass('glyphicon-volume-off');
        $('.volume-icon').addClass('glyphicon-volume-down');
        $('.volume-icon').removeClass('glyphicon-volume-up')
    } else if (music.volume === 0) {
        $('.volume-icon').addClass('glyphicon-volume-off');
        $('.volume-icon').removeClass('glyphicon-volume-down');
        $('.volume-icon').removeClass('glyphicon-volume-up')
    }
}
// 刷新歌曲信息
// function freshInformation() {
//     $('.author').text(lists[musicNow].author);
//     $('.name').text(lists[musicNow].name);
//     $('.album-cover').attr("src", lists[musicNow].cover);
//     console.log(lists[musicNow].src)
//     console.log (encodeURI(lists[musicNow].src))
//     console.log(
//       decodeURI(lists[musicNow].src))
//     $('#music').attr('src', lists[musicNow].src);  
// }
function freshInformation() {
    $('.author').text(lists[musicNow].author);
    $('.name').text(lists[musicNow].title);
    $('.album-cover').attr("src", lists[musicNow].cover_img);
    $('#music').attr('src', lists[musicNow].address);
    window.localStorage.currentSong = JSON.stringify( lists[musicNow]);
    window.localStorage.currentSongIndex = musicNow;
    
}

function toPercent(data) {
    var strData = parseFloat(data) * 100;
    var ret = strData.toString() + "%";
    return ret
}

function freshProgress() {
    var i = toPercent(music.currentTime / music.duration);//返回百分比
    $('.progress-bar').css({width: i});
    if (music.ended) {
        nextMusic()
    }
}

function changeMode() {
    musicMode++;
    if (musicMode > 2) {
        musicMode = 0
    } else if (musicMode < 0) {
        musicMode = 2
    }
    switch (musicMode) {
        case 0:
            $('.music-mode').addClass('glyphicon-refresh');
            $('.music-mode').removeClass('glyphicon-repeat');
            $('.music-mode').removeClass('glyphicon-random');
            break;
        case 1:
            $('.music-mode').removeClass('glyphicon-refresh');
            $('.music-mode').addClass('glyphicon-repeat');
            $('.music-mode').removeClass('glyphicon-random');
            break;
        case 2:
            $('.music-mode').removeClass('glyphicon-refresh');
            $('.music-mode').removeClass('glyphicon-repeat');
            $('.music-mode').addClass('glyphicon-random');
            break
    }
}
// 切换静音
function volumeMuted() {
    if (music.muted) {
        music.muted = false;
        freshVolume();  //更换音量图标
        var temp = toPercent(music.volume);
        $('.volume-progress-bar').css({width: temp})
    } else {
        music.muted = true;
        $('.volume-icon').addClass('glyphicon-volume-off');
        $('.volume-icon').removeClass('glyphicon-volume-down');
        $('.volume-icon').removeClass('glyphicon-volume-up');
        $('.volume-progress-bar').css({width: 0})
    }
}

$(document).ready(function () {
    switch (musicMode) {
        case 0:
            $('.music-mode').addClass('glyphicon-refresh');
            break;
        case 1:
            $('.music-mode').addClass('glyphicon-repeat');
            break;
        case 2:
            $('.music-mode').addClass('glyphicon-random');
            break
    }
    $('.volume-progress-bar').css({width: toPercent(music.volume)});
    freshInformation();   // 刷新歌曲信息
    freshVolume();
    setInterval(freshProgress, 100);
    init();   // 歌曲列表信息准备好
    stopMusic(); // 默认是暂停音乐，没有自动播放
    $('#music-play').click(togglePlay);
    $('.glyphicon-fast-backward').click(preMusic);
    $('.glyphicon-fast-forward').click(nextMusic);
    $('.glyphicon-stop').click(stopMusic);
    $('.progress').mousedown(progressJump);
    $('.volume-progress').mousedown(volumeJump);
    $('.music-mode').click(changeMode);
    $('.volume-icon').click(volumeMuted);
    $('.music-list').mouseover(function () {
        console.log("mouseover");
        $('.music-list-dialog').fadeIn()
        // $('.music-list-dialog').show()
    });
    $('.music-list').mouseout(function () {
        $('.music-list-dialog').fadeOut()
        // $('.music-list-dialog').hide()
        
    })
});