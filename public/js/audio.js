(function () {
    var t=2;
    var b=1;
    var canvas = document.getElementById("cas");
    canvas.width=$('body').width();
    canvas.height=$(window).height()-80;
    var ctx = canvas.getContext("2d");


    var outcanvas = document.createElement("canvas");
    outcanvas.width = canvas.width;
    outcanvas.height = canvas.height ;
    var octx = outcanvas.getContext('2d');


    var arcCanvas = document.createElement("canvas");
    arcCanvas.width = canvas.height;
    arcCanvas.height=canvas.height;
    var actx= arcCanvas.getContext('2d');

    // audioSource 为音频源，bufferSource为buffer源
    var audioSource;

    //实例化音频对象，兼容性
    var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

    if (!AudioContext) {
        alert("您的浏览器不支持audio API，请更换浏览器（chrome、firefox）再尝试")
        return;
    }

    var AC = new AudioContext();

    // analyser为analysernode，具有频率的数据，用于创建数据可视化
    // 创建一个AnalyserNode，它可以用来显示音频时间和频率的数据。
    var analyser = AC.createAnalyser();
    // AnalyserNode 接口的 fftSize 属性的值是一个无符号长整型的值, 用于确定频域的 FFT (快速傅里叶变换) 的大小.
    // fftSize 属性的值必须是从32到32768范围内的2的非零幂; 其默认值为2048.
     analyser.fftSize = 4096;
    // gain为gainNode，音频的声音处理模块
    // 创建一个GainNode,它可以控制音频的总音量。
    var gainnode = AC.createGain();
    gainnode.gain.value = 1;

    //计时器
    // 针对动画效果的API ----- requestAnimationFrame
    var RAF = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    //播放音乐
    var myAudio = document.getElementById("music");

    //音频播放
    function playMusic(arg) {

        // 来关联HTMLMediaElement. 这可以用来播放和处理来自<video>或<audio> 元素的音频.
        var source = AC.createMediaElementSource(arg);
        //连接analyserNode
        source.connect(analyser);

        //再连接到gainNode
        analyser.connect(gainnode);

        //最终输出到音频播放器
        gainnode.connect(AC.destination);
        addRecord();
    }
    function addRecord() {
        var url = "/add_record?";
        //获取user_id song_id type
        var user_id = getUserInfo();
        var song_id  = getParameterByName('song_id');
        var type = getParameterByName('type');

        $.ajax({
            type: 'get',
            url: url +"user_id="+user_id+"&song_id="+song_id+"&type2="+type,
            async: true,
            success: function (res) {
                console.log(res);
            }
            ,
            error: function () {
            }
        })
    }
    function getUserInfo() {
        if (document.cookie.length > 0) {
            var c_start, c_end;
            c_start = document.cookie.indexOf("user_id" + '=')
            if (c_start != -1) {
                c_start = c_start +"user_id".length + 1
                c_end = document.cookie.indexOf('; ', c_start)
                if (c_end == -1) c_end = document.cookie.length
                return  unescape( document.cookie.substring(c_start, c_end));
            }
        }
        return ''
    }
    function getParameterByName(name, url) {
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
    };

    //绘制音谱的参数
    var rt_array = [],	        //用于存储顶部小红框的
        rt_length = 120;		//规定有多少个柱形条

    var arc_array=[];
    var arcNumber=512;
    var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, "#30cfd0");
    grd.addColorStop(0.3, "#30cfd0");
    grd.addColorStop(0.8, "#330867");
    grd.addColorStop(1, "#a18cd1");


    //动画初始化，获取analyserNode里的音频buffer
    function initAnimation() {
        //每个柱形条的宽度，及柱形条宽度+间隔
        var aw = canvas.width / rt_length;
        var w = aw -5;

        for (var i = 0; i < rt_length; i++) {
            rt_array.push(new Retangle(w, 5, i * aw, canvas.height ))
        }

        for (var i=0;i<arcNumber;i++){
            arc_array.push(new Arc(300,300,30));
        }

        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //出来的数组为8bit整型数组，即值为0~256，整个数组长度为1024，即会有1024个频率，只需要取部分进行显示
        var array_length = analyser.frequencyBinCount; //frequencyBinCount 的值固定为 AnalyserNode 接口中fftSize值的一半. 该属性通常用于可视化的数据值的数量.
        var array = new Uint8Array(array_length);
        if (t%2==0){
            analyser.getByteFrequencyData(array);	//将音频节点的数据拷贝到Uin8Array中
        }else{
            analyser.getByteTimeDomainData(array);	//将时域节点的数据拷贝到Uin8Array中
        }
        if (b==1){
            //数组长度与画布宽度比例
            octx.clearRect(0, 0, canvas.width, canvas.height);
            var bili = (array_length-array_length*0.2) / canvas.width;
            for (var i = 0; i < rt_array.length; i++) {
                var rt = rt_array[i];
                //根据比例计算应该获取第几个频率值，并且缓存起来减少计算
                rt.index = ('index' in rt) ? rt.index : ~~(rt.x * bili);  //转换成数字类型
                rt.update(array[rt.index]);
            }
            ctx.drawImage(outcanvas, 0, 0);
        }
        if (b==2){
            actx.clearRect(0,0,canvas.width,canvas.height);
            var update = (canvas.height/4)/128;
            var index= (array_length-array_length*0.2)/arcNumber;
            for (var a=0;a<arcNumber;a++){
                var arc= arc_array[a];
                arc.update2(array[index*a],update);
            }
            ctx.drawImage(arcCanvas,0,0);
        }
        RAF(animate);
    }
    function Arc(x,y,r){
        this.x=x;
        this.y=y;
        this.r=r;
    }

    Arc.prototype.update2= function(num,update){
        var now=num-128;
        this.r = canvas.height/4+now*update;
        this.draw()
    }
    Arc.prototype.draw=function(){
        actx.lineWidth=2;
        actx.beginPath();
        actx.arc(this.x,this.y,this.r,0,4*Math.PI,true);
        actx.closePath();
        actx.strokeStyle="rgb(148,128,"+this.r+")";
        actx.stroke();
    }


    // 音谱条对象
    function Retangle(w, h, x, y) {
        this.w = w;
        this.h = h; // 小红块高度
        this.x = x;
        this.y = y;
        this.jg = 3;
        this.power = 0;
        this.dy = y; // 小红块位置
        this.num = 0;
    }

    var Rp = Retangle.prototype;

    Rp.update = function (power) {
        this.power = power*2;
        this.num = this.power / this.h + 0.5;

        //更新小红块的位置，如果音频条长度高于红块位置，则红块位置则为音频条高度，否则让小红块下降
        var nh = this.dy + this.h;//小红块当前位置
        if (this.power >= this.y - nh) {
            this.dy = this.y - this.power - this.h - (this.power == 0 ? 0 : 1);
        } else if (nh > this.y) {
            this.dy = this.y - this.h;
        } else {
            this.dy += 1;
        }

        this.draw();
    };

    Rp.draw = function () {
        octx.fillStyle = grd;
        var h = ((this.power / (this.h + this.jg))) * (this.h + this.jg);
        octx.fillRect(this.x, this.y - h, this.w, h);
        // for (var i = 0; i < this.num; i++) {
        //     var y = this.y - i * (this.h + this.jg);
        //     //octx.clearRect(this.x - 1, y, this.w + 2, this.jg);
        // }
        octx.fillStyle = "#950000";
        // #30cfd0
        octx.fillRect(this.x, this.dy, this.w, this.h);
    };
    initAnimation();
    playMusic(myAudio);
    $('#button').click(function(e){
        // t++;
        if(b===1){
            b = 2
        }else if(b === 2){
            b = 1
        }
    })
}());