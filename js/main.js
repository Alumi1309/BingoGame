
var slotNumList = new Array();
var bingoNumList = new Array();
var bingoMaxNum = 75;
var RemainingNum;

(function(){
    'use strict';
    InitTranslate();
    InitGame();
    DrawTable();
    var slider = document.getElementById('slider');
    var label = document.getElementById('label');
    var btn = document.getElementById('btn');
    var curnum = document.getElementById("curnum");

    /*
    slider.addEventListener("change", function(){
        label.innerHTML = this.value;
    });
    */

    btn.addEventListener('click', function(){
        document.getElementById('btn').innerHTML = "Push";
        document.getElementById('btn-style').href = "css/buttonGetNum.css";

        if(RemainingNum < 1)
        {
            InitGame();
            DrawTable();
        }
        else
        {
            GetNum();
        }
    });
})();


// 乱数生成（最小値, 最大値）
function rnd(min, max){
	return Math.floor(Math.random() * (max-min+1) + min);
}


function InitGame()
{
    RemainingNum = bingoMaxNum;
    slotNumList = new Array();
    bingoNumList = new Array();

    curnum.value = "";
    enstr.value = "";
    jastr.value = "";

    for(var i=1; i<=bingoMaxNum; i++)
    {
        slotNumList.push(i);
        bingoNumList.push(false);
    }
}

function GetNum()
{
    if(RemainingNum < 1) return;

    var rndNum = rnd(0,RemainingNum-1);
    RemainingNum--;

    var hitNum = slotNumList[rndNum];

    curnum.value = hitNum;
    var [en, ja] = GetTransNum(hitNum);

    bingoNumList[hitNum] = true;
    slotNumList.splice(rndNum,1);

    enstr.value = en;
    jastr.value = ja;

    SpeakEnNum(hitNum);
    SpeakJaNum(hitNum);

    //引くたびに表を更新
    DrawTable();

    if(RemainingNum < 1)
    {
        document.getElementById('btn').innerHTML = "Retry?";
        document.getElementById('btn-style').href = "css/buttonRetry.css";
    
    }
}

function SpeakEnNum(num)
{
    var ssu = new SpeechSynthesisUtterance();
    ssu.text = num;
    ssu.lang = 'en-US';
    var voice = speechSynthesis.getVoices().find(function(voice){
        return voice.name === 'Google UK English Female' || voice.name === 'Alice';
    });
    speechSynthesis.speak(ssu);
}

function SpeakJaNum(num)
{
    var ssu = new SpeechSynthesisUtterance();
    ssu.text = num;
    ssu.lang = 'ja-JP';
    speechSynthesis.speak(ssu); 
}

function DrawTable()
{
    //いったんDivの中身を削除
    document.getElementById("table").innerHTML = "";

    var table = document.createElement("table");

    table.align = "center";
    var rows = [];
    for(var i = 1; i<= 8; i++)
    {
        rows.push(table.insertRow(-1));
        for(var j = 1; j <=10; j++ )
        {
            var cellpos = (i-1)*10 + j-1;
            var cell = rows[i-1].insertCell(-1);

            if((i == 8) && (j>5))
            {
                cell.appendChild(document.createTextNode(" "));
            }
            else
            {
                cell.appendChild(document.createTextNode(cellpos+1));
            }

            if(bingoNumList[cellpos+1])
            {
                cell.style.backgroundColor = "#888888";
            }
            else
            {
                cell.style.backgroundColor = "#efefef";
            }
        }
    }
    document.getElementById("table").appendChild(table);
    document.getElementById("table").style.marginBottom = "30px";
}
