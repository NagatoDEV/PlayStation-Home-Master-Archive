var requestAccepted;
var status;
var isResults;
var isAfd = false;

function google_callback(google_requestAccepted, google_status)
{
    requestAccepted = google_requestAccepted;
    status = google_status;
    isResults = parkingData.pageType == 2;
    isAfd = google_status.feed != "afs";

    if (!requestAccepted)
    {
        failover();
        return;
    }

    recordGoogleCallbackInfo(isAfd);

    if ((!isAfd) && (isResults))
    {
        $("<div class='resultLinks' id='ads2'></div>").insertAfter("#webResults");
    }
}

function failover()
{
    var location = window.location.href;
    if (location.indexOf('?') == -1)
    {
        location += '?ai=' + (parseInt(parkingData.apiIteration) + parseInt(1));
    }
    else
    {
        var split = location.split('?');
        location = split[0];
        var query = split[1];
        var params = query.split('&');
        var itemsWritten = 0;
        for (i = 0; i < params.length; i++)
        {
            if (params[i].indexOf('ai=') == -1)
            {
                if (itemsWritten == 0)
                    location += '?' + params[i];
                else
                    location += '&' + params[i];
                itemsWritten++;
            }
        }
        if (itemsWritten == 0)
            location += '?ai=' + (parseInt(parkingData.apiIteration) + parseInt(1));
        else
            location += '&ai=' + (parseInt(parkingData.apiIteration) + parseInt(1));
        itemsWritten++;
    }

    if (location != window.location.href)
        window.location = location;
}

function exists(x)
{
    if (typeof (x) == 'undefined')
        return false;
    if (x == null)
        return false;
    if (x === '')
        return false;
    return true;
}

function setCookie(name, value)
{
    var argumentCount;
    var argumentValues;
    var domain;
    var expires;
    var path;
    var secure;

    argumentValues = setCookie.arguments;
    argumentCount = setCookie.arguments.length;

    expires = (argumentCount > 2) ? argumentValues[2] : null;
    path = (argumentCount > 3) ? argumentValues[3] : null;
    domain = (argumentCount > 4) ? argumentValues[4] : null;
    secure = (argumentCount > 5) ? argumentValues[5] : false;

    document.cookie = name + '=' + escape(value) +
        ((expires == null) ? '' : ('; expires=' + expires.toGMTString())) +
        ((path == null) ? '' : ('; path=' + path)) +
        ((domain == null) ? '' : ('; domain=' + domain)) +
        ((secure == true) ? '; secure' : '');
}

function getCookie(name)
{
    var argument;
    var argumentLength;
    var cookieLength;
    var endString;
    var i;
    var j;

    argument = name + '=';
    argumentLength = argument.length;
    cookieLength = document.cookie.length;
    i = 0;
    while (i < cookieLength)
    {
        j = i + argumentLength;
        if (document.cookie.substring(i, j) == argument)
        {
            endString = document.cookie.indexOf(';', j);
            if (endString == -1)
                endString = document.cookie.length;
            return unescape(document.cookie.substring(j, endString));
        }
        i = document.cookie.indexOf(' ', i) + 1;
        if (i == 0)
            break;
    }
    return (null);
}

function deleteCookie(name)
{
    var cookieValue;
    var expirationDate;

    expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() - 1);

    cookieValue = getCookie(name);
    if (cookieValue != null)
        setCookie(name, '', expirationDate, '/');
}

function stripHtml(input)
{
    var output = '';
    var inTag = false;
    for (var i = 0; i < input.length; i++)
    {
        if (input.charAt(i) == '<')
            inTag = true;
        if (input.charAt(i) == '>')
        {
            if (input.charAt(i + 1) == '<')
            {
            }
            else
            {
                inTag = false;
                i++;
            }
        }
        if (!inTag)
            output += input.charAt(i);
    }

    return output;
}

function buildWebResultLoggingUrl(rank, sponsoredCount, resultLinkType, visibleUrl)
{
    var url = '/clickLog?ck=' + encodeURIComponent(parkingData.cacheKey)
        + '&d=' + encodeURIComponent(parkingData.domainName)
        + '&aid=' + encodeURIComponent(parkingData.adNetworkID)
        + '&r=' + encodeURIComponent(rank)
        + '&rc=' + encodeURIComponent(sponsoredCount)
        + '&rlt=' + encodeURIComponent(resultLinkType)
        + '&du=' + encodeURIComponent(stripHtml(visibleUrl))
        + '&afd=' + isAfd
        + '&rid=' + encodeURIComponent(parkingData.requestGuid);
    return url;
}

function createRequest()
{
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch (e) { }
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch (e) { }
    try { return new XMLHttpRequest(); } catch (e) { }
    return null;
}

function fetchWebResults()
{
    var request = "/interface/6/?mode=wr&outputType=json"
         + "&dn=" + encodeURIComponent(parkingData.domainName)
         + "&st=" + encodeURIComponent(parkingData.searchText)
         + "&num=" + encodeURIComponent("10")
         + "&ia=" + encodeURIComponent(parkingData.adultTag)
         + "&hl=" + encodeURIComponent(parkingData.hl)
         + "&cip=" + encodeURIComponent(parkingData.cip)
         + "&ref=" + encodeURIComponent(document.referrer)
         + "&ua=" + encodeURIComponent(navigator.userAgent);

    var http = createRequest();
    if (http != null)
    {
        http.open('GET', request, true);
        http.setRequestHeader('Connection', 'close');

        http.onreadystatechange = function ()
        {
            if (http.readyState == 4)
            {
                var webResults = eval("(" + http.responseText + ")");
                renderWebResults(webResults);
            }
        }

        http.send(null);
    }
}

function renderWebResults(webResults)
{
    //have web results?
    if ((webResults) && (webResults.webResults) && (webResults.webResults.length > 0))
    {
        //find output div
        var div = document.getElementById("webResults");
        if (div)
        {
            //daughter window?
            var dw = " target='_blank'";

            //write header
            var html = "<h2>Web Results</h2>";

            //open list
            html += "<ul>";

            //loop through web results
            for (var i = 0; i < webResults.webResults.length; i++)
            {
                //determine link class
                var linkClass = "";
                if (i == 0)
                    linkClass += "first";
                else if (i == (webResults.webResults.length - 1))
                    linkClass += "last";
                html += "<li class='" + linkClass + "'>";

                //build click url
                var loggingUrl = buildWebResultLoggingUrl(i + 1, 10, webResults.webResults[i].resultLinkType, webResults.webResults[i].displayUrl, false);

                //title
                html += "<a class='title'" + dw + " onclick='return trackClick(\"" + loggingUrl + "\");' href='" + webResults.webResults[i].clickUrl + "' " + ">" + webResults.webResults[i].title + "</a>";

                //two line or three?
                if (parkingData.wClass != "wr")
                {
                    //url
                    html += "<a class='url'" + dw + " onclick='return trackClick(\"" + loggingUrl + "\");' href='" + webResults.webResults[i].clickUrl + "'>" + webResults.webResults[i].displayUrl + "</a>";

                    //abstract
                    html += "<p class='abstract'>" + webResults.webResults[i].abs + "</p>";
                }
                else
                {
                    //abstract
                    html += "<p class='abstract'>" + webResults.webResults[i].abs + "</p>";

                    //url
                    html += "<a class='url'" + dw + " onclick='return trackClick(\"" + loggingUrl + "\");' href='" + webResults.webResults[i].clickUrl + "'>" + webResults.webResults[i].displayUrl + "</a>";
                }

                html += "</li>";
            }
            html += "</ul>";
            div.innerHTML = html;
        }
    }
}

function recordGoogleCallbackInfo(isAfd) 
{
    var request = "/googleCallback"
         + "?rid=" + encodeURIComponent(parkingData.requestGuid)
         + "&isAfd=" + encodeURIComponent(isAfd ? "1" : "0")

    var http = createRequest();
    if (http != null) {
        http.open('GET', request, false);
        http.setRequestHeader('Connection', 'close');

//        http.onreadystatechange = function () {
//            if (http.readyState == 4) {
//                //var webResults = eval("(" + http.responseText + ")");
//                //renderWebResults(webResults);
//            }
//        }

        http.send(null);
    }
}





