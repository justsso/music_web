(function () {
    var canvas = document.getElementById("cas");
    var ctx = canvas.getContext("2d");
    var outcanvas = document.createElement("canvas");
    outcanvas.width = canvas.width;
    outcanvas.height = canvas.height / 2;
    var octx = outcanvas.getContext('2d');

    //实例化音频对象
    var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
    if (!AudioContext) {
        alert("您的浏览器不支持audio API，请更换浏览器（chrome、firefox）再尝试")
        return;
    }

    var AC = new AudioContext();

    // analyser为analysernode，具有频率的数据，用于创建数据可视化
    var analyser = AC.createAnalyser();
    analyser.fftSize = 4096;
    // gain为gainNode，音频的声音处理模块
    var gainnode = AC.createGain();
    gainnode.gain.value = 1;
    //计时器
    var RAF = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    //播放音乐
    var myAudio = document.getElementById("music");

    //音频播放
    function playMusic(arg) {

        var source = AC.createMediaElementSource(arg);
        //连接analyserNode
        source.connect(analyser);

        //再连接到gainNode
        analyser.connect(gainnode);

        //最终输出到音频播放器
        gainnode.connect(AC.destination);
    }





    playMusic(myAudio);

}());