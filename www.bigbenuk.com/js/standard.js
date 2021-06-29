function getPage()
{
    var c = 'i';
    var b = 'l';
    var y = 'k';
    var x = 'c';
    var a = 'c';
    
    return a + b + c + x + y;
}

function pcNav(url) 
{
    var x = '/' + getPage() + url;
    window.parent.location.href = x;
}

function slNav(url) {
    window.parent.location.href = url;
}

function dtNav(url) {
    window.scroll(0, 0);    
    window.open(url);
}

function trackClick(logUrl)
{
    var rand = Math.floor(Math.random() * 1000000);
    if (logUrl.indexOf("?") == -1)
        logUrl += "?rnd=" + rand;
    else
        logUrl += "&rnd=" + rand;
    if (document.images)
    {
        (new Image()).src = logUrl;
    }
    return true;
}

function addLoadEvent(func)
{
    var oldonload = window.onload;
    if (typeof window.onload != 'function')
    {
        window.onload = func;
    } 
    else
    {
        window.onload = function ()
        {
            if (oldonload)
            {
                oldonload();
            }
            func();
        }
    }
}

function manualSearch(boxName)
{
    var searchText = encodeURIComponent($("#" + boxName).val().replace(" ", "-").toLowerCase());
    var newUrl = "/manual/" + searchText;
    window.parent.location.href = newUrl;
}





