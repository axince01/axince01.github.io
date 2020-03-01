//公用變數
var gAPI = "http://localhost:9999/api/";
//var gAPI = "http://data.ifunfarm.com/api/";
var StoIns;
function formatDate(date, sSplit, yyyymmdd) {
    if (typeof date == "undefined" || date == null)
    {
        return "";
    }
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    if (yyyymmdd == "yyyymmdd") {
        return [year, month, day].join(sSplit);
    }
    if (yyyymmdd == "yyyymm") {
        return [year, month].join(sSplit);
    }

}

function formatDateTime(d, sSplit) {
    if (d == "") {
        return "";
    }

    var date1 = new Date(d.substr(0, 4), d.substr(5, 2) - 1, //避免IE與Chrome時間不一致
        d.substr(8, 2), d.substr(11, 2),
        d.substr(14, 2), d.substr(17, 2));

    var date = new Date(date1),
        year = date.getFullYear(),
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),

        monthFormatted = month < 10 ? "0" + month : month,
        dayFormatted = day < 10 ? "0" + day : day,
        hourFormatted = hour < 10 ? "0" + hour : hour,
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        secondFormatted = second < 10 ? "0" + second : second;

    return year + sSplit + monthFormatted + sSplit + dayFormatted + " " + hourFormatted + ":" +
            minuteFormatted + ":" + secondFormatted;
}

function formatDateTimeNoSecond(d, sSplit) {
    if (d == "") {
        return "";
    }

    var date1 = new Date(d.substr(0, 4), d.substr(5, 2) - 1, //避免IE與Chrome時間不一致
    d.substr(8, 2), d.substr(11, 2),
    d.substr(14, 2), d.substr(17, 2));

    var date = new Date(date1),
        year = date.getFullYear(),
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),

        monthFormatted = month < 10 ? "0" + month : month,
        dayFormatted = day < 10 ? "0" + day : day,
        hourFormatted = hour < 10 ? "0" + hour : hour,
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        secondFormatted = second < 10 ? "0" + second : second;

    return year + sSplit + monthFormatted + sSplit + dayFormatted + " " + hourFormatted + ":" +
            minuteFormatted;
}

//處理千分位
function thousandComma(number) {
    if (typeof number == "undefined" || number == null) {
        return "";
    }
    var num = number.toString();
    var pattern = /(-?\d+)(\d{3})/;

    while (pattern.test(num)) {
        num = num.replace(pattern, "$1,$2");

    }
    return num;
}

function payCode(sCode)
{
    var sRtn = "";
    if (sCode == "A") {
        sRtn = "金流儲值";
    }
    else if (sCode == "X") {
        sRtn = "消費";
    }
    else if (sCode == "T") {
        sRtn = "測試";
    }
    return sRtn;
}

function DoAjaxStart() {
    //$.blockUI({
    //    message: $('#Pop_load'),
    //    showOverlay: true,
    //    css: {
    //        border: "1px;solid",
    //        background: 'rgba(0%,0%,0%,0.0)'
    //    },
    //    overlayCSS: { opacity: .2, backgroundColor: '#999' }
    //});
}

function DoAjaxEnd() {
    try {
        clearTimeout(StoIns);
        $.unblockUI();
    } catch (ex) {
    }
}

$(document).ajaxStart(function () {
    StoIns = setTimeout(DoAjaxStart, 1000);
});

$(document).ajaxStop(function () {
    DoAjaxEnd();
});

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
// Initializes a new instance of the StringBuilder class
// and appends the given value if supplied
function StringBuilder(value) {
    this.strings = new Array("");
    this.append(value);
}

// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value) {
    if (value) {
        this.strings.push(value);
    }
}

// Clears the string buffer
StringBuilder.prototype.clear = function () {
    this.strings.length = 1;
}

// Converts this instance to a String.
StringBuilder.prototype.toString = function () {
    return this.strings.join("");
}

function bindMenu(pagename) {
    var data = {
        "menu": [
            {
                "Name": "首頁",
                "Url": "index.html",
                "sub": null
            },
            {
                "Name": "快活食譜",
                "Url": "Recipe.html",
                "sub": null
            },
            {
                "Name": "關於我們",
                "Url": "About.html",
                "sub": [
                    {
                        "Name": "問題建議與合作提案",
                        "Url": "About.html#divSuggest",
                        "sub": null
                    },
                    {
                        "Name": "會員條款",
                        "Url": "Terms.html",
                        "sub": null
                    },
                    {
                        "Name": "隱私權政策",
                        "Url": "privacypolicy.html",
                        "sub": null
                    }
                ]
            },
            {
                "Name": "常見問題",
                "Url": "faq.html",
                "sub": null
            }
        ]
    };

    var sContent = "<ul class=\"menuzord-menu\">";
    var getMenuItem = function (itemData) {
        var sClass = "";
        if (pagename == itemData.Name) {
            sClass = " class=\"current_page\"";
        }
        sContent += "<li" + sClass + ">";
        sContent += "<a href='" + itemData.Url + "'>";
        sContent += itemData.Name + "</a>";
        if (itemData.sub) {
            sContent += "<ul class=\"dropdown\">";
            $.each(itemData.sub, function () {
                getMenuItem(this);
            });
            sContent += "</ul>";
        }
        sContent += "</li>";

    };


    $.each(data.menu, function () {
        getMenuItem(this);
    });


    $('#main_menu').html(sContent);
}

function bindHotNews(ctrlid) {
    var sCtrlID = "#" + ctrlid;
    
    $.ajax({
        url: gAPI + "Code/getNews",
        type: "Get",
        success: function (data) {
            if (data.length > 0) {
                var sContent = "<ul>";
                $.each(data, function (key, item) {
                    sContent += "<li><h6>";
                    sContent += item.NEWS_Desc
                    sContent += "</h6></li>";
                });
                sContent += "</ul>";
                $(sCtrlID).html(sContent);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
        }
    });
}

function bindProduceRecord() {
    $.ajax({
        url: gAPI + "PdSchedule/getProduceRecordList",
        type: "Get",
        success: function (data) {
            if (data.length > 0) {
                var i = 0;
                $.each(data, function (key, item) {
                    if (i == 0) {
                        $("#imgRec01").prop("src","http://www.ifunfarm.com/upload/rec/" + item.FPR_IMG);
                        $("#spnTag1-1").html(item.PC_Name);
                        $("#spnTag1-2").html(item.FPR_Days);
                        $("#spnRecH1").html(item.FPR_Header);
                        $("#pRec1").text(item.FPR_DESC);
                    }
                    else if (i == 1) {
                        $("#imgRec02").prop("src", "http://www.ifunfarm.com/upload/rec/" + item.FPR_IMG);
                        $("#spnTag2-1").html(item.PC_Name);
                        $("#spnTag2-2").html(item.FPR_Days);
                        $("#spnRecH2").html(item.FPR_Header);
                        $("#pRec2").text(item.FPR_DESC);
                    }
                    else if (i == 2) {
                        $("#imgRec03").prop("src", "http://www.ifunfarm.com/upload/rec/" + item.FPR_IMG);
                        $("#spnTag3-1").html(item.PC_Name);
                        $("#spnTag3-2").html(item.FPR_Days);
                        $("#spnRecH3").html(item.FPR_Header);
                        $("#pRec3").html(item.FPR_DESC);
                    }
                    i++;
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
        }
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}




