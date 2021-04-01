/* --------------------------------------------------------------------------------------------- */
/* --- Utils --- */
/* --------------------------------------------------------------------------------------------- */
function getPortalDomain() {
    var domainName = location.hostname.split(".");
    return "." + domainName[domainName.length - 2] + "." + domainName[domainName.length - 1];
}

function loadCookies() {
    var cr = [];
    if (document.cookie != '') {
      var ck = document.cookie.split(';');
        for (var i=0, ii = ck.length; i<ii; i++) {
          var cv = ck[i].split('=');
          if (cv[0].substring(0,1) == ' ')
          	cv[0] = cv[0].substring(1);
          cr[cv[0]]=cv[1];
        }
      }
    return cr;
}

function overrideDefinition(displayDefinition)
{
    var cookieDomain = getPortalDomain();
    document.cookie = "ps3DeviceDefinitionOverride=" + displayDefinition + ";path=/;domain="+ cookieDomain;
    if (document.cookie.indexOf("ps3DeviceDefinitionOverride") != -1) location.reload();
}


var cookies = loadCookies();

if (cookies['ps3DeviceDefinitionOverride'] == undefined ) {
    var displayDefinition = (document.body.offsetWidth > 1414) ? "HD" :  "SD"; // +2 720 HD, -2 1080 SD
    var siteDefinitionDefault = (location.hostname.indexOf("-sd") > -1) ? "SD" : "HD";
    var d = new Date();
    d.setTime( d.getTime() + 365 * 24 * 60 * 60 * 1000 );
    var cookieDomain = getPortalDomain();
    if (cookies['ps3DeviceDefinition'] == undefined ) {
        document.cookie = "ps3DeviceDefinition=" + displayDefinition + ";expires=" + d.toGMTString() + ";path=/;domain=" + cookieDomain;
        if ((document.cookie.indexOf("ps3DeviceDefinition") != -1) && (siteDefinitionDefault != displayDefinition)) { location.href=location.href; }
    } else {
        if (cookies['ps3DeviceDefinition'] != displayDefinition) {
            document.cookie = "ps3DeviceDefinition=" + displayDefinition + ";expires=" + d.toGMTString() + ";path=/;domain="+ cookieDomain;
            if (document.cookie.indexOf("ps3DeviceDefinition") != -1) { location.href=location.href; };
        }
    }
}