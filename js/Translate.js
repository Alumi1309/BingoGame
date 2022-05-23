var TransEn = new Array(76);
var TransJa = new Array(76);

function InitTranslate()
{
    TransEn[1] = "One";
    TransEn[2] = "Two";
    TransEn[3] = "Three";
    TransEn[4] = "Four";
    TransEn[5] = "Five";
    TransEn[6] = "Six";
    TransEn[7] = "Seven";
    TransEn[8] = "Eight";
    TransEn[9] = "Nine";
    TransEn[10] = "Ten";
    TransEn[11] = "Eleven";
    TransEn[12] = "Twelve";
    TransEn[13] = "Thirteen";
    TransEn[14] = "Fourteen";
    TransEn[15] = "Fifteen";
    TransEn[16] = "Sixteen";
    TransEn[17] = "Seventeen";
    TransEn[18] = "Eighteen";
    TransEn[19] = "Nineteen";
    TransEn[20] = "Twenty";
    TransEn[30] = "Thirty";
    TransEn[40] = "Fourty";
    TransEn[50] = "Fifty";
    TransEn[60] = "Sixty";
    TransEn[70] = "Seventy";
 
    TransJa[1] = "いち";
    TransJa[2] = "に";
    TransJa[3] = "さん";
    TransJa[4] = "よん";
    TransJa[5] = "ご";
    TransJa[6] = "ろく";
    TransJa[7] = "なな";
    TransJa[8] = "はち";
    TransJa[9] = "きゅう";
    TransJa[10] = "じゅう";    
}

function GetTransNum(val)
{
    var enStr = "";
    var jaStr = "";

    if(val >= 0 && val <= 9)
    {
        enStr = TransEn[val];
        jaStr = TransJa[val];
    }
    else if(val >= 10 && val <= 19)
    {
        enStr = TransEn[val];
        jaStr = TransJa[10] + TransJa[val%10];
    }
    else
    {
        var firstPlace = val%10;

        var TenPlace = Math.floor(val/10);
        enStr = TransEn[TenPlace*10];
        jaStr = TransJa[TenPlace] + TransJa[10];

        if(firstPlace > 0)
        {
            enStr = enStr + ' ' + TransEn[firstPlace];
            jaStr = jaStr + TransJa[firstPlace];
        }
    }

    return [enStr, jaStr];
}