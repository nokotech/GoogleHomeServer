var weekArr = new Array("日","月","火","水","木","金","土");

function yyyymmdd(y, m, d, w) {
    var year = ('0000' + y).slice(-4);
    var month = ('00' + m).slice(-2);
    var day = ('00' + d).slice(-2);
    return year + "年" + month + "月" + day + "日 " + " (" + weekArr[w] + ")";
}

function hhmmss(h, m, s) {
    var hour = ('00' + h).slice(-2);
    var min = ('00' + m).slice(-2);
    var sec = ('00' + s).slice(-2);
    return hour + ":" + min + ":" + sec;
}

function str2date(str) {
    if(!str) {
        return null;
    }
    var date = str.split(' : ');
    date[0] = date[2]=="PM" ? (+date[0] + 12) : date[0];
    return {hour: +date[0], min: +date[1]};
}

function counter() {
    var date = new Date(); 
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var week = date.getDay();
    var day = date.getDate();
    var hour = date.getHours();
    var min  = date.getMinutes();
    var sec  = date.getSeconds();
    document.getElementById('now_date1').innerHTML = yyyymmdd(year, month, day, week);
    document.getElementById('now_date2').innerHTML = hhmmss(hour, min, sec);
}

function main() {
    counter();
    setInterval('counter()', 1000);
    $('#timepicker').timepicki({increase_direction:'up'});

    // CLICK ACTION
    $('#alert_set').click(function() {
        var setTime = str2date($('#timepicker').val());
        if(setTime) {
            var url = "/set" + "?hour=" + setTime["hour"] + "&" + "min="  + setTime["min"];
            var request = new XMLHttpRequest();
            request.open("GET", url);
            request.addEventListener("load", (event) => {
                console.log(event.target.status); // => 200
                console.log(event.target.responseText); // => "{...}"
                $('#set_time').text("予約中： " + ('00' + setTime["hour"]).slice(-2) + ":" + ('00' + setTime["min"]).slice(-2));
                $('#set_time').show();
            });
            request.send();
        }
    });
} 
main();