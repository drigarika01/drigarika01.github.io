function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
function load() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("ajax").innerHTML = "<p>" + this.responseText.replace(/\n/g,"<br />") + "</p>";
            this.responseText.xmlEncoding;
        }
    };
    xhttp.open("GET","ajax.txt", true);
    xhttp.send();
}
var pageLoad = function () {
    'use strict';
    var xml = document.getElementById('xml');
    function crXMLHttpRequest() {
        var res = false;
        if (window.XMLHttpRequest) {
            res = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            if (new ActiveXObject('Microsoft.XMLHTTP')) {
                res = new ActiveXObject('Microsoft.XMLHTTP');
            } else if (new ActiveXObject('Msxml2.XMLHTTP')) {
                res = new ActiveXObject('Msxml2.XMLHTTP');
            } else {
                res = false;
                alert('Неможливо відправити запит!');
            }
        }
        return res;
    }
    var json = document.getElementById('json'),
        request3 = crXMLHttpRequest();
    json.onclick = function () {
        request3.open('GET', './Ajax/json.json', false);
        request3.send();
        if (request3.status != 200) {
            alert(request3.status + ': ' + request3.statusText);
        } else {
            var i = 0,
                JSONDoc = JSON.parse(request3.responseText),
                table = '<tr>';
            for (name in JSONDoc) {
                table += '<th>' + name + '</th>';
            }
            table += '</tr>';
            for (name in JSONDoc['Персонажі']) {
                table += '<tr><td>' + JSONDoc['Персонажі'][name] + '</td><td>' + JSONDoc['Дім'][name] + '</td><tr>';
                i++;
            }
            json.style.visibility = 'hidden';
            document.getElementById('json1').innerHTML = table;
        }
    };
    var request2 = crXMLHttpRequest();
    xml.onclick = function () {
        request2.open('GET', './Ajax/xml.xml', false);
        request2.send();
        if (request2.status != 200) {
            alert(request2.status + ': ' + request2.statusText);
        } else {
            var i,
                xmlDoc = request2.responseXML,
                table = '<tr><th>Назва</th><th>Опис</th><th>Переглянути трейлер</th></tr>',
                x = xmlDoc.getElementsByTagName('trailer');
            for (i = 0; i < x.length; i++) {
                table += '<tr><td>' + x[i].getElementsByTagName('name')[0].childNodes[0].nodeValue + '</td><td>' + x[i].getElementsByTagName('description')[0].childNodes[0].nodeValue + '</td><td><a class="ulightbox" href="' + x[i].getElementsByTagName('watch')[0].childNodes[0].nodeValue+'" title="Нажміть на посилання" style="color:grey">Дивитися трейлер</a></td></tr>';
            }
            document.getElementById('xml').style.visibility = 'hidden';
            document.getElementById('xmlTable').innerHTML = table;//выводим таблицу
        }
    };
};
if (window.addEventListener) {
    window.addEventListener('load', pageLoad);
} else {
    window.attachEvent('onload', pageLoad);
}
function docLoad() {    
    "use strict";
    var auOne = document.getElementById("au1"),
        sound = document.getElementById("sound");
    auOne.addEventListener("play", function() {
        sound.pause();
        auOne.play();
    });
    sound.addEventListener("play", function() {
        auOne.pause();
        sound.play();
    });
    document.getElementById("audioInput").addEventListener("change", checker, false);//ждём пока пользователь выберет файл
}
function checker(e) {
    "use strict";
    var fileType = this.files[0].type;//проверяем аудио файл или нет
    if (fileType.indexOf("audio") != -1) {
        loadFile(this.files[0], ifSound);
    } else {
        alert("Это не аудио файл!");
    }
}
window.onload = function() {
    var images = document.getElementById('pic');
    images.onchange = function() {
        var ul = document.getElementsByTagName('ol')[0];
        {
                var li = document.createElement('li');
                li.display = 'block';
                var img = new Image();
                img.src = URL.createObjectURL(images.files[0]);
                img.style.width = 200 + 'px';
                img.style.height = 200 + 'px';
                ul.appendChild(img);    
        }   
    }
    };
function loadFile(file, loaded)//загружаем
{
    var reader = new FileReader();
    reader.onload = loaded;
    reader.readAsDataURL(file);
}

function ifSound(evt)
{
    document.getElementById("sound").src = evt.target.result;//выводим
    stopAllAudio();
    document.getElementById("sound").play();//сразу проигрываем
}
function stopAllAudio() {
    var allAudios = document.querySelectorAll("audio");
    allAudios.forEach(function(audio){
        audio.pause();
    });
}



if (window.addEventListener) {
   console.log("here");
    window.addEventListener("load", docLoad);
} else {
    window.attachEvent("onload", docLoad);
}
var images;
var img_count = 0;
var cont = true;//при натисканні користувача змінюється, щоб призупинити анімацію
function print_on_canvas(canv, contxt) { //друкуємо текст поверх анімації
    "use strict";
    contxt.font = 'bold 14pt Arial';
    contxt.fillStyle = 'white';
}

function draw_welcome() {
    "use strict";
    var welcome = document.getElementById('canvasGIF');
    var welcomecontext = welcome.getContext('2d');
    welcomecontext.drawImage(images[Math.floor(img_count / 10)], 0, 0);//малюємо рисунок
    img_count = Math.floor((img_count + 1) % 60);
    print_on_canvas(welcome, welcomecontext);//друкуємо текст
    if (cont) {
        requestAnimationFrame(draw_welcome);
    }
}

if (window.addEventListener) { //для ІЕ
    window.addEventListener('load', winload);
}
else {
    window.attachEvent('onload', winload);
}

function winload() {
    "use strict";
    if (document.all) { //ІЕ10- не має підтримки drawImage
        document.getElementById('canvasGIF').innerHTML = '<p id="error">Ваш браузер не може відобразити анімацію.</p>';
        return;
    }
    images = new Array(6); // масив картинок для анімації
    for (var i = 0; i < images.length; ++i) {
        images[i] = new Image();
        images[i].src = "img/gif/(" + i + ").gif";
    }
    draw_welcome();

    //задання розмірів при запуску
    document.getElementById('canvasGIF').width = 200;
    document.getElementById('canvasGIF').height = 200;
    document.getElementById('canvasGIF').onclick = function () {
        if (cont) {
            cont = false;
        }
        else {
            cont = true;
            draw_welcome();
        }
    }
}
var pageLoad = function () {
    "use strict";
    //параметры холста
    document.getElementById("hippi").width = 300;
    document.getElementById("hippi").height = 300;
    var drawingHippi = document.getElementById("hippi");
    if (drawingHippi && drawingHippi.getContext) {
        var hippi = drawingHippi.getContext("2d");
        hippi.beginPath();
        hippi.lineWidth = 5;//ширина линии
        hippi.ellipse(150,150,50,50,0,50,0,true);
        hippi.moveTo(150,150);
        hippi.lineTo(150,200);
        hippi.moveTo(150,150);
        hippi.lineTo(115,115);
        hippi.moveTo(150,150);
        hippi.lineTo(185,115);
        hippi.stroke();
    }



    //задаём параметры холста и действия для рисования
    canvas = document.getElementById("risovalka");
    if (window.innerWidth > 300){
        canvas.width = 300;
        canvas.height = 300;
    } else {
        canvas.width = 300;
        canvas.height = 300;
    }
    context = canvas.getContext("2d");
    canvas.onmousedown = start;
    canvas.onmouseup = stop;
    canvas.onmouseleave = leave;
    canvas.onmousemove = draw;
    //изменение параметров кисти
    document.getElementById("clearCanvas").onclick = clearCanvas;
    document.getElementById("colorRed").onclick = red;
    document.getElementById("colorBlue").onclick = blue;
    document.getElementById("colorYellow").onclick = yellow;
    document.getElementById("colorGrey").onclick = grey;
    document.getElementById("smallS").onclick = small;
    document.getElementById("normalS").onclick = normal;
    document.getElementById("largeS").onclick = large;
    document.getElementById("hugeS").onclick = huge;
    document.getElementById("eraser").onclick = white;
};
var canvas;
var context;
var X = new Array();
var Y = new Array();
var Drag = new Array();
var paint;
var colorRed = "red";
var  colorBlue = "blue";
var colorYellow = "yellow";
var colorGrey = "grey";
var eraser = "white";
var  Color = new Array();
var cursorColor = colorGrey;
var  Size = new Array();
var cursorSize = "normal";

function Click(x, y, dragging) {
    X.push(x);
    Y.push(y);
    Drag.push(dragging);
    Color.push(cursorColor);
    Size.push(cursorSize);
}
function start(e) {//определеям положение курсора на холсте
    e = e || window.event;
    if (!e.pageX) {
        e.pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        e.pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    new Click(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    newdraw();
}
function newdraw() {
    "use strict";
    var radius;
    context.lineJoin = "round";
    for (var i=0; i < X.length; i++) {//определяем размер кисти выбраной пользователем
        if(Size[i] == "small") {
            radius = 2;
        } else if(Size[i] == "normal") {
            radius = 5;
        } else if(Size[i] == "large") {
            radius = 10;
        } else if(Size[i] == "huge") {
            radius = 20;
        }
        //соединяем точки
        context.beginPath();
        if(Drag[i] && i){
            context.moveTo(X[i-1], Y[i-1]);
        } else {
            context.moveTo(X[i]-1, Y[i]);
        }
        context.lineTo(X[i], Y[i]);
        context.closePath();
        context.strokeStyle = Color[i];
        context.lineWidth = radius;
        context.stroke();
    }
}
function draw(e) {//рисуем, при передвижении курсора по холсту
    e = e || window.event;
    if (!e.pageX) {
        e.pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        e.pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    if(paint) {
        Click(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        newdraw();
    }
};
function leave(e) {//при выходе курсора за размеры холста, прекратить рисовать
    paint = false;
}
function stop(e) {//закончить рисовать
    paint = false;
    newdraw();
};
function clearCanvas()//очистка холста
{
    X = new Array();
    Y = new Array();
    Drag = new Array();
    Color = new Array();
    Size = new Array();
    context.clearRect(0, 0, canvas.width, canvas.height);
}
//цвета кисти
function red() {
    cursorColor = colorRed;
}
function blue() {
    cursorColor = colorBlue;
}
function grey() {
    cursorColor = colorGrey;
}
function yellow() {
    cursorColor = colorYellow;
}
//размеры кисти
function small() {
    cursorSize = "small";
}
function normal() {
    cursorSize = "normal";
}
function large() {
    cursorSize = "large";
}
function huge() {
    cursorSize = "huge";
}
//тёрка
function white() {
    cursorColor = eraser;
}
//запускаем скрипт при загрузке страницы
if (window.addEventListener) {
    window.addEventListener("load", pageLoad);
} else {//для ІЕ
    window.attachEvent("onload", pageLoad);
}