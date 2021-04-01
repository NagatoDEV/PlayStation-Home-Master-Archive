var jsLoaded = true;
/* --------------------------------------------------------------------------------------------- */
/* --- DOM Functions --- */
/* --------------------------------------------------------------------------------------------- */
Function.prototype.bind = function(o) {
	var method = this,
	temp = function() {
		return method.apply(o, arguments);
	};
	return temp;
}

function getChildren(element){
	var children = [];
	for(var i=0; i < element.childNodes.length; i++){
		if(element.childNodes[i].nodeType == 1){
			children.push(element.childNodes[i]);
		}
	}
	return children;
}
function getText(element){
	var sText = "";
	for(var i=0; i < element.childNodes.length; i++){
		var node = element.childNodes[i];
		if(node.nodeType == 3){
			if(!node.nodeValue.match(/(\n|\r)/)){
				sText += node.nodeValue;
			}
		}
		else if (node.nodeType == 1){
			sText += getText(node);  //recursive
		}
	}
	return sText;
}
function getAttribute(element,name){
	var sAttr = "";
	if (element) sAttr = element.attributes[name];
	return sAttr;
}
function getSiblings(element){
	var aSiblings = [];
	var aSiblingsAndThis = getChildren(element.parentNode);
	aSiblings = filter(
		aSiblingsAndThis,
		function(){
			return this !== element;
		}
	);
	return aSiblings;
}
function getCousins(element){
	var aCousins = [];
	var eParent = element.parentNode;
	var aParentSiblings = getSiblings(eParent);
	for(var i=0; i<aParentSiblings.length; i++){
		var eCousin = getChildren(aParentSiblings[i])[0];
		aCousins.push(eCousin);
	}
	return aCousins;
}
function getGrandchildren(element){
	var aGrandchildren = [];
	var aChildren = getChildren(element);
	for(var i=0; i<aChildren.length; i++){
		var eGrandchild = getChildren(aChildren[i])[0];
		aGrandchildren.push(eGrandchild);
	}
	return aGrandchildren;
}
/* --------------------------------------------------------------------------------------------- */
/* --- Utility functions --- */
/* --------------------------------------------------------------------------------------------- */
function filter(aPreFiltered,fFilter){
	// takes an array and a test function.
	// each item is tested against the contents of the function.
	// return value is an array containing items that pass the test
	var aPostFiltered = [];
	for(i=0; i<aPreFiltered.length; i++){
		if(fFilter.apply(aPreFiltered[i]))
		{	aPostFiltered.push(aPreFiltered[i]);
		}
	}
	return aPostFiltered;
}
function cloneArray(a){
	return a.slice();
}
function eachOf(a,f,p){
	// takes an array and a function. function is applied to each of the array.
	for(var i=0; i<a.length; i++){
		f.call(a[i],p);
	}
}
var getByClass = document.getElementsByClassName = function(sClassName,context) {
		context = document.getElementById(context) || document;
		var aElemsWithClass = [];
		var regExClass = new RegExp('\\b'+sClassName+'\\b');
		var aDocumentElems = context.getElementsByTagName('*');
		for (var i = 0; i < aDocumentElems.length; i++) {
			var sTempClassName = aDocumentElems[i].className;
			if (regExClass.test(sTempClassName)) {
				aElemsWithClass.push(aDocumentElems[i]);
			}
		}
		return aElemsWithClass;
	};
	// Only parameter is a function. Each item of the array is tested with the function. If ALL pass, then TRUE is returned.
	// If ANY fail then FALSE is returned.
	Array.prototype.allAre = function(f){
		var bReturnValue = true;
		for(var i=0; i < this.length; i++) {
			if(!f.apply(this[i])) {

				bReturnValue = false;
				break;
			}
		}
		return bReturnValue;
	};
	Array.prototype.anyAre = function(f){
		var bReturnValue = false;
		for(var i=0; i < this.length; i++) {
			if(f.apply(this[i])) {
				bReturnValue = true;
				break;
			}
		}
		return bReturnValue;
	};
	Array.prototype.filter = function(f,arg){
		// param 1 is a test function.
		// param 2 is a param that will be used with the test function
		// each item is tested against the contents of the function.
		// return value is an array containing items that pass the test
		var aFiltered = [];
		for(i=0; i<this.length; i++){
			var index = i;
			if(f.call(this[i],arg,index))
			{	aFiltered.push(this[i]);
			}
		}
		return aFiltered;
	};
	String.prototype.addClass = function(s){
		var aClassNames = this.removeClass(s).split(' ');
		aClassNames.push(s);
		return aClassNames.join(' ');
	};
	String.prototype.removeClass = function(s){
		return this.split(' ').filter(
			function(){
				return this != s;
			}
			,s
		).join(' ');
	};
	String.prototype.hasClass = function(s){
		return this.split(' ').anyAre(
			function(){
				return this == s;
			}
			,s
		);
	};
	function addClassName(e,s){
		if(e){
			removeClassName(e,s);
			var aClassNames = e.className ? e.className.split(' ') : [];
			if(aClassNames){
				aClassNames.push(s);
				e.className = aClassNames.join(' ');
			}
		}
	}
	function removeClassName(e,s){
		if(e && e.className){
			e.className = e.className.split(' ').filter(
				function(){
					return this != s;
				}
				,s
			).join(' ');
		}
	}
	function hasClassName(e,s){   		
		if(e && e.className){
			return e.className.split(' ').anyAre(
				function(){
					return this == s;
				}
				,s
			);
		}
		else{
			return false;
		}
	}
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	function eraseCookie(name) {
		createCookie(name,"",-1);
	}
/* --------------------------------------------------------------------------------------------- */
/* --- Console --- */
/* --------------------------------------------------------------------------------------------- */
function Console(iLeft, iTop, iWidth, iHeight, sColourBg, sColourFont, iSizeFont, iOpacity) {
	var eConsole;

	function Console() {
		draw();
	}

	this.out = function(sMsg, oObj) { // Void
		sObj = ( oObj != undefined ) ? oObj.toString().split('(')[0].substr(9) : "--";
		eConsole.innerHTML = new Date().toUTCString() + " | " + sObj + " | " + sMsg + "<br/>" +  eConsole.innerHTML;
	}

	this.show = function () { // Void
		eConsole.style.display = "block";
	}

	this.hide = function () { // Void
		eConsole.style.display = "none";
	}

	function draw() { // Void
		eConsole = document.createElement("div");
		with (eConsole.style) {
			position = "absolute";
			padding = "10px";
			zIndex = "1000000";
			overflow = "auto";
			left = iLeft + "px";
			top = iTop + "px";
			width = iWidth + "px";
			height = iHeight + "px";
			backgroundColor = sColourBg || "#000";
			color = sColourFont || "#fff";
			fontSize = iSizeFont || 16;
			opacity = iOpacity || 1;
		}
		document.body.appendChild(eConsole);
	}
	Console();
}
/* --------------------------------------------------------------------------------------------- */
/* --- Init --- */
/* --------------------------------------------------------------------------------------------- */
function init() {
	doResize();
	queryOverlay();
}
/* --------------------------------------------------------------------------------------------- */
/* --- Media player --- */
/* --------------------------------------------------------------------------------------------- */
function createMediaPlayer(elId, stAssetPath, swfObjectId) {
	var so = new SWFObject("/static/furn/deploy/PSMPlayer_PS3.swf?config=" + stAssetPath + "&site_locale=en_GB&translations=/ws/mp/localisation/", swfObjectId, "704", "396", "9", "#000000");
	so.addParam("allowFullScreen", "true");
	so.write(elId);
}
/* --------------------------------------------------------------------------------------------- */
/* --- Screenshot viewer close --- */
/* --------------------------------------------------------------------------------------------- */
function closeScreenshot() {
	document.getElementById('screenshotViewer').style.display='none';
	if(document.getElementById('carouselWrapper')) {
		if(document.getElementById('carouselWrapper').style.visibility == 'visible') {
			document.getElementById('carouselItemLinkCenter').focus();
		}
	}
}
/* --------------------------------------------------------------------------------------------- */
/* --- SPP --- */
/* --------------------------------------------------------------------------------------------- */
function doSpp(el, img) {
	document.getElementById(el).src = img;
}
/* --------------------------------------------------------------------------------------------- */
/* --- Navigation overlapping --- */
/* --------------------------------------------------------------------------------------------- */
function resetNav() {
	if (document.all) {
		var d = document.getElementById("navWrapper");
		var e = d.getElementsByTagName("a");
		for (var i=0, ii = e.length; i < ii; i++) {
		   e[i].childNodes[1].style.display  = "none";
		}
	}
}
/* --------------------------------------------------------------------------------------------- */
/* --- Overlay --- */
/* --------------------------------------------------------------------------------------------- */
function doOverlay(el) {
	if (document.getElementById('overlayWrapper')) document.getElementById('overlayWrapper').style.display = 'block';
	if (document.getElementById('overlayAbout')) document.getElementById('overlayAbout').style.display = 'none';
	if (document.getElementById('overlaySitemap')) document.getElementById('overlaySitemap').style.display = 'none';
	if (document.getElementById('overlayHelp')) document.getElementById('overlayHelp').style.display = 'none';
	if (document.getElementById('overlayCountrySelect')) document.getElementById('overlayCountrySelect').style.display = 'none';


	// Contextual
	if (document.getElementById('overlayPrefs')) document.getElementById('overlayPrefs').style.display = 'none';
	if (document.getElementById('overlayRelated')) document.getElementById('overlayRelated').style.display = 'none';
	if (document.getElementById('overlayGamesFilter')) document.getElementById('overlayGamesFilter').style.display = 'none';
    if (document.getElementById('overlayList')) document.getElementById('overlayList').style.display = 'none';
    if (document.getElementById('overlayFeatured')) document.getElementById('overlayFeatured').style.display = 'none';
    if (document.getElementById('overlayGuideList')) document.getElementById('overlayGuideList').style.display = 'none';
    if (document.getElementById('overlaySearch')) document.getElementById('overlaySearch').style.display = 'none';


	// Hide Flash media if visible for layering issues with overlays
    if (document.getElementById('carouselMedia')) document.getElementById('carouselMedia').style.visibility = 'hidden';
    if (document.getElementById('newsDetailMedia')) document.getElementById('newsDetailMedia').style.visibility = 'hidden';
    if (document.getElementById('guideDetailMedia')) document.getElementById('guideDetailMedia').style.visibility = 'hidden';
    if (document.getElementById('systemSoftwareDetailMedia')) document.getElementById('systemSoftwareDetailMedia').style.visibility = 'hidden';

	document.getElementById(el).style.display = 'block';
	if (document.getElementById('closeOverlays')){
		if(!hasClassName(document.body,'searchOverlay')){
			document.getElementById('closeOverlays').focus();
		}
	}
	if (document.getElementById('overlayWrapper')) document.getElementById('overlayWrapper').className = el + 'Visible';
	return false;
}

function queryOverlay() {
	var sOverlay;
	var sQuery = location.search.substring(1);
	if (sQuery != "" && sQuery.indexOf('overlay') != -1) {
		switch(sQuery.split("=")[1]) {
			case "search":
				sOverlay = "overlaySearch";
				break;
			case "about":
				sOverlay = "overlayAbout";
				break;
			case "sitemap":
				sOverlay = "overlaySitemap";
				break;
			case "countrySelector":
				sOverlay = "overlayCountrySelect";
				break;
			case "help":
				sOverlay = "overlayHelp";
				break;
		}
		doOverlay(sOverlay);
	}
}

/* --------------------------------------------------------------------------------------------- */
/* --- Browse Games --- */
/* --------------------------------------------------------------------------------------------- */
document.getElementsByClassName = function(sClassName,context) {
	var context = document.getElementById(context) || document;
	var aElemsWithClass = [];
	var regExClass = new RegExp('\\b'+sClassName+'\\b');
	var aDocumentElems = context.getElementsByTagName('*');
	for (var i = 0; i < aDocumentElems.length; i++) {
		var sTempClassName = aDocumentElems[i].className;
		if (regExClass.test(sTempClassName)) aElemsWithClass.push(aDocumentElems[i]);
	}
	return aElemsWithClass;
}

function highlightMultiple(sClassName,sMode) {
	var aElems = document.getElementsByClassName(sClassName);
	for(var i=0; i < aElems.length; i++)
	{	highlightSingle(aElems[i],sMode);
	}

}

Array.prototype.allMeetTheseRequirements = function(f){
	var bReturnValue = true;
	for(var i=0; i < this.length; i++)
	{     	if(!f.apply(this[i]))
			{	bReturnValue = false;
				break;
			}
	}
	return bReturnValue;
}

function highlightSingle(domElem, sMode) {
	sMode = sMode || 'toggle';
	var sIdSuffix = domElem.id.split('link')[1];
	var domInput = document.getElementById('input' + sIdSuffix);
	if(sMode=='toggle')
	{
		var aElemsWithSameClass = document.getElementsByClassName(domInput.className);
		if(
				aElemsWithSameClass.allMeetTheseRequirements(
					function(){
						return this.value == 'true';
					}
				)
		)
		{
			highlightMultiple(domElem.className,'off');
		}
		if(domInput.value=='true')
		{   domElem.style.color = '666666';
			domInput.value = 'false';
		}
		else
		{   domElem.style.color = 'ffffff';
			domInput.value = 'true';
		}
	}
	else if (sMode=='on')
	{	domElem.style.color = 'ffffff';
		domInput.value = 'true';
	}
	else if (sMode=='off')
	{	domElem.style.color = '666666';
		domInput.value = 'false';
	}
}

/* --------------------------------------------------------------------------------------------- */
/* --- Window resizing --- */
/* --------------------------------------------------------------------------------------------- */
function doResize() {
	if (!document.addEventListener) {
		window.resizeBy(1, 1);
	}  else {
		if (document.getElementById("bgWrapper") != null) document.getElementById("bgWrapper").style.overflow='auto';
		if (document.getElementById("overlayWrapper") != null) document.getElementById("overlayWrapper").style.overflow='auto';
	}
}

/* --------------------------------------------------------------------------------------------- */
/* --- Filter menu --- */
/* --------------------------------------------------------------------------------------------- */
function showMenu(o) {
	try {
		o.getElementsByTagName('ul')[0].style.display = 'inline';
		o.style.cursor = 'pointer';
		o.style.height = "300px";
	} catch(e) {
	}
}

function hideMenu(o) {
	try {
		o.getElementsByTagName('ul')[0].style.display = 'none';
		o.style.height = "auto";
	} catch(e) {
	}
}

/* --------------------------------------------------------------------------------------------- */
/* --- View component class  --- */
/* --------------------------------------------------------------------------------------------- */
function ViewComponent() {

	var o = this;

	this.ViewComponent = function() {
		this.aComponentObjects = [];
		this.aOrigObjects = [];
		this.iPage = 1;
	}

	this.next = function(iNumItemsPerPage) {
		o.iNumItemsPerPage = iNumItemsPerPage || 1;
		if (o.aComponentObjects.length > 0) {
			if (iNumItemsPerPage > 1 && o.aComponentObjects.length > 1) {
				for (var i = 0, ii = o.iNumItemsPerPage; i < ii; i++) {
				   o.aComponentObjects.push(o.aComponentObjects.shift());
				}
			} else {
				o.aComponentObjects.push(o.aComponentObjects.shift());
			}
			if (o.iPage <= (o.aComponentObjects.length / o.iNumItemsPerPage)) o.iPage += 1;
			if (o.iPage > (o.aComponentObjects.length / o.iNumItemsPerPage)) o.iPage = 1;
			o.draw();
		}
	}

	this.previous = function(iNumItemsPerPage) {
		o.iNumItemsPerPage = iNumItemsPerPage || 1;
		if (o.aComponentObjects.length > 0) {
			if (iNumItemsPerPage > 1 && o.aComponentObjects.length > 1) {
				for (var i = 0, ii = o.iNumItemsPerPage; i < ii; i++) {
					o.aComponentObjects.unshift(o.aComponentObjects.pop());
				}
			} else {
				o.aComponentObjects.unshift(o.aComponentObjects.pop());
			}
			if (o.iPage > 0) o.iPage -= 1;
			if (o.iPage < 1) o.iPage = o.aComponentObjects.length / o.iNumItemsPerPage;
			o.draw();
		}
	}

	this.swap = function() {
		    if (this.aComponentObjects.length > 1) {
				var firstItem = this.aComponentObjects[0];
				var secondItem = this.aComponentObjects[1];
				this.aComponentObjects[0] = secondItem;
				this.aComponentObjects[1] = firstItem;
    		}
	}

	this.search = function(sItemId, iPosition) {
		var position = iPosition || 1;
		if (o.aComponentObjects.length > 0) {
			while (o.aComponentObjects[position].itemid != sItemId) {
				o.aComponentObjects.push(o.aComponentObjects.shift());
			}
		}
		o.draw();
	}
	
	this.drawStatus = function() {
		var eImg;
		document.getElementById("newsPanelPages").innerHTML = "";
		if (this.aComponentObjects.length > (this.iNumItemsPerPage - 1)) {
			var iPages = this.aComponentObjects.length / this.iNumItemsPerPage;
			for (var i = 0, ii = iPages; i < ii; i++) {
				pgCounter = document.createElement("span");
				pgCounter.id = "a" + i;
				if ((i + 1) == this.iPage) {
					pgCounter.style.backgroundImage = "url('/static/furn/slider_box_active.png')";
				} else {
					pgCounter.style.backgroundImage = "url('/static/furn/slider_box_inactive.png')";
				}
				document.getElementById("newsPanelPages").appendChild(pgCounter);
				pgCounter = null;
			}
		}
	}

	this.toggle = function () {
		// Also declared inline due to js not knowing the style from CSS ala IE6
		if (document.getElementById("carouselWrapper").style.visibility == "hidden") {
			document.getElementById("carouselWrapper").style.visibility = "visible";
			document.getElementById("gridWrapper").style.display = "none";
			if (document.getElementById("carouselMedia")) document.getElementById("carouselMedia").style.visibility = "visible";
			document.getElementById("carouselItemCenter").focus();
		} else {
			if (document.getElementById("carouselMedia")) document.getElementById("carouselMedia").style.visibility = "hidden";
			document.getElementById("carouselWrapper").style.visibility = "hidden";
			document.getElementById("gridWrapper").style.display = "block";
			document.getElementById("g0").focus();
		}
	}

	this.ViewComponent();
}

/* --------------------------------------------------------------------------------------------- */
/* --- FeaturedViewComponent extended class  --- */
/* --------------------------------------------------------------------------------------------- */
function FeaturedViewComponent() {
	this.FeaturedViewComponent = function() {
		this.iNumItemsPerPage = 5;
		this.element = document.getElementById("featuredCarousel");
		if (this.element) this.element.style.display = "block";
		document.getElementById("featuredContent").style.height = "465px";
		ViewComponent.call( this );
	}

	this.setItem = function(sItemId) {
		this.iItemSelected = sItemId || this.aComponentObjects[0].itemId;
		var iCarouselLength =  this.aComponentObjects.length;

		if (this.aComponentObjects.length > 5) {
			for (var i = 0, ii = iCarouselLength; i < ii; i++) {
				if ((this.iItemSelected == this.aComponentObjects[i].itemId) && (i > 0)) {
					for (var n = 0, nn = i; n < nn; n++) {
						 this.aComponentObjects.push(this.aComponentObjects.shift());
					}
				}
			}
		}
		this.draw();
	}

	this.draw = function() {
		var iCurrentCell = 0;

        if (this.aComponentObjects.length > 1) {
            var iCarouselCount = ( this.aComponentObjects.length > 5 ) ? 5 : this.aComponentObjects.length;
            for (var i = 0, ii = iCarouselCount; i < ii; i++) {
                if (this.iItemSelected == this.aComponentObjects[i].itemId) {
                    document.getElementById('featuredItemLink' + [i]).className = 'on';
                } else {
                    document.getElementById('featuredItemLink' + [i]).className = 'off';
                }
                if (this.aComponentObjects[i].imageUrl == "" || this.aComponentObjects[i].imageUrl == undefined) {
                	document.getElementById("featuredItem" + iCurrentCell).style.display = "block";
                    document.getElementById("featuredItem" + iCurrentCell + "Image").src = "/static/furn/bg_grid_empty.png";
                    document.getElementById("featuredItem" + iCurrentCell + "Title").innerHTML = this.aComponentObjects[i].title;
                    if (this.aComponentObjects[i].title == "") document.getElementById("featuredItem" + iCurrentCell + "Underlay").style.visibility = "hidden";
                } else {
                    document.getElementById("featuredItem" + iCurrentCell).style.display = "block";
                    document.getElementById("featuredItemLink" + iCurrentCell).style.visibility = "visible";
                    document.getElementById("featuredItem" + iCurrentCell + "Image").src = this.aComponentObjects[i].imageUrl;
                    document.getElementById("featuredItem" + iCurrentCell + "Title").innerHTML = this.aComponentObjects[i].title;
                }
                document.getElementById("featuredItemLink" + iCurrentCell).onclick = new Function("cFeatured.display('" + this.aComponentObjects[i].itemId + "');");  // IE6 event handler argument passing

                iCurrentCell += 1;
            }
            document.getElementById("featuredCarousel").style.display = "block";
        } else {
        	document.getElementById("featuredCarousel").style.display = "none";
        }

        this.display = function (sItemId) {
        	var iCarouselCount = ( this.aComponentObjects.length > 5 ) ? 5 : this.aComponentObjects.length;
			this.iItemSelected = sItemId || this.aComponentObjects[0].itemId;

			if (this.aComponentObjects.length == 1) {
				document.getElementById("featuredContent").style.height = "665px";
			} else {
				document.getElementById("featuredContent").style.height = "465px";
            }

			for (var i = 0, ii = iCarouselCount; i < ii; i++) {
				if (this.iItemSelected == this.aComponentObjects[i].itemId) {
					document.getElementById('featuredItemContent').innerHTML = this.aComponentObjects[i].content;
          			if (this.aComponentObjects[i].feedUrl != "") {
						//if (document.getElementById("featuredMedia") == undefined) {

							createMediaPlayer('featuredImageWrapper', this.aComponentObjects[i].feedUrl, 'featuredMedia');  // In window
						//} else {
						//	document.getElementById("featuredMedia").src = "/static/furn/deploy/PSMPlayer_PS3.swf?config=" + this.aComponentObjects[i].feedUrl + "&site_locale=en_GB&translations=/static/furn/fla/xml/localisation.xml";
						//}
					} else if(this.aComponentObjects[i].imageLargeUrl != "") {
					 	document.getElementById("featuredImage").src = this.aComponentObjects[i].imageLargeUrl;
					 	document.getElementById("featuredImageContainer").style.display = "block";
					} else {
						document.getElementById("featuredImageContainer").style.display = "none";
					}
					document.getElementById('featuredItemLink' + [i]).className = 'on';
				} else {
					if (i < 5) document.getElementById('featuredItemLink' + [i]).className = 'off';
				}
			}
        	document.getElementById('featuredItemContent').parentNode.scrollTop = "0px";
        }

		// Featured buttons
		if (this.aComponentObjects.length > 5) {
			document.getElementById("featuredItems").style.marginLeft = "55px";
			document.getElementById("btnFeaturedPrevious").style.visibility = "visible";
			document.getElementById("btnFeaturedNext").style.visibility = "visible";
		} else {
			document.getElementById("featuredItems").style.marginLeft = "25px";
			document.getElementById("btnFeaturedPrevious").style.visibility = "hidden";
			document.getElementById("btnFeaturedNext").style.visibility = "hidden";
		}
		return false;
	}

	this.addItem = function(sTitle, sExcerpt, sImageUrl, sImageLargeUrl, sItemId, sContent, sFeedUrl)  {
		var oTmp = { title : sTitle, excerpt : sExcerpt, imageUrl : sImageUrl, imageLargeUrl : sImageLargeUrl, itemId : sItemId, content : sContent, feedUrl : sFeedUrl };
		this.aComponentObjects.push(oTmp);
	}

	this.init = function () {
		this.iItemSelected = this.aComponentObjects[0].itemId;
		this.draw();
        this.display(this.iItemSelected);
	}

	this.FeaturedViewComponent();
}
FeaturedViewComponent.prototype = new ViewComponent();

/* --------------------------------------------------------------------------------------------- */
/* --- NewsViewComponent extended class  --- */
/* --------------------------------------------------------------------------------------------- */
function NewsViewComponent() {
	this.NewsViewComponent = function() {
		this.iNumItemsPerPage = 2;
		this.element = document.getElementById("newsWrapper");
		ViewComponent.call( this );
	}

	this.draw = function() {
		if (this.aComponentObjects.length > 1) {
			document.getElementById("btnNewsPrevious").style.display = "block";
			document.getElementById("btnNewsNext").style.display = "block";
		}

		if (this.aComponentObjects.length > 0) {
			document.getElementById("newsItemTitleLeft").innerHTML = this.aComponentObjects[0].title;
			document.getElementById("newsItemPubDateLeft").innerHTML = this.aComponentObjects[0].pubdate;
			document.getElementById("newsItemImgLeft").src = this.aComponentObjects[0].imageUrl;
			document.getElementById("newsItemUrlLeft").href = this.aComponentObjects[0].itemUrl;

			document.getElementById("newsItemTitleRight").innerHTML = this.aComponentObjects[1].title;
			document.getElementById("newsItemPubDateRight").innerHTML = this.aComponentObjects[1].pubdate;
			document.getElementById("newsItemImgRight").src = this.aComponentObjects[1].imageUrl;
			document.getElementById("newsItemUrlRight").href = this.aComponentObjects[1].itemUrl;
			
			if (this.aComponentObjects[0].type == "other") {
				document.getElementById("newsItemTitleContainerLeft").style.height = "auto";
				document.getElementById("newsItemAuthorLeft").style.display = "none";
				document.getElementById("newsItemTeaserLeft").style.display = "block";
				document.getElementById("newsItemTeaserLeft").innerHTML = this.aComponentObjects[0].teaser;
				document.getElementById("newsItemCommentsLeft").style.display = "none";
				document.getElementById("newsItemCommentLeft").innerHTML = this.aComponentObjects[0].comments;
				document.getElementById("newsItemBlogCommentsLeft").style.display = "none";
				document.getElementById("newsItemLogoLeft").style.display = "none";  
			} else {
				document.getElementById("newsItemTitleContainerLeft").style.height = "143px";
				document.getElementById("newsItemAuthorLeft").innerHTML = this.aComponentObjects[0].author;
				document.getElementById("newsItemAuthorLeft").style.display = "inline";
				document.getElementById("newsItemCommentsLeft").style.display = "none";
				document.getElementById("newsItemTeaserLeft").style.display = "none";
				document.getElementById("newsItemLogoLeft").style.display = "block";
                document.getElementById("newsItemBlogCommentsLeft").style.display = "block";
                document.getElementById("newsItemBlogCommentLeft").innerHTML = this.aComponentObjects[0].comments;
                document.getElementById("newsItemBlogRatingLeft").innerHTML = this.aComponentObjects[0].rating;
			}

			if (this.aComponentObjects[1].type == "other") {
				document.getElementById("newsItemTitleContainerRight").style.height = "auto";
				document.getElementById("newsItemAuthorRight").style.display = "none";
				document.getElementById("newsItemCommentsRight").style.display = "none";
				document.getElementById("newsItemCommentRight").innerHTML = this.aComponentObjects[1].comments;
				document.getElementById("newsItemTeaserRight").style.display = "block";
			    document.getElementById("newsItemTeaserRight").innerHTML = this.aComponentObjects[1].teaser;
			    document.getElementById("newsItemBlogCommentsRight").style.display = "none";
				document.getElementById("newsItemLogoRight").style.display = "none";
			} else {
				document.getElementById("newsItemTitleContainerRight").style.height = "143px";
				document.getElementById("newsItemAuthorRight").innerHTML = this.aComponentObjects[1].author;
				document.getElementById("newsItemAuthorRight").style.display = "inline";
			    document.getElementById("newsItemCommentsRight").style.display = "none";
				document.getElementById("newsItemTeaserRight").style.display = "none";
				document.getElementById("newsItemLogoRight").style.display = "block";
                document.getElementById("newsItemBlogCommentsRight").style.display = "block";
                document.getElementById("newsItemBlogCommentRight").innerHTML = this.aComponentObjects[1].comments;
                document.getElementById("newsItemBlogRatingRight").innerHTML = this.aComponentObjects[1].rating;
             }
        } else {
        	document.getElementById("newsItemTitleLeft").innerHTML = this.aComponentObjects[0].title;
			document.getElementById("newsItemPubDateLeft").innerHTML = this.aComponentObjects[0].pubdate;
			document.getElementById("newsItemImgLeft").src = this.aComponentObjects[0].imageUrl;
			document.getElementById("newsItemUrlLeft").href = this.aComponentObjects[0].itemUrl;

        	if (this.aComponentObjects[0].type == "other") {
        		document.getElementById("newsItemTitleContainerLeft").style.height = "auto";
				document.getElementById("newsItemAuthorLeft").style.display = "none";
				document.getElementById("newsItemTeaserLeft").style.display = "inline";
				document.getElementById("newsItemTeaserLeft").innerHTML = this.aComponentObjects[0].teaser;
				document.getElementById("newsItemCommentsLeft").style.display = "none";
				document.getElementById("newsItemCommentLeft").innerHTML = this.aComponentObjects[0].comments;
				document.getElementById("newsItemBlogCommentsLeft").style.display = "none";
				document.getElementById("newsItemLogoLeft").style.display = "none";
			} else {
				document.getElementById("newsItemTitleContainerLeft").style.height = "143px";
				document.getElementById("newsItemAuthorRight").innerHTML = this.aComponentObjects[1].author;
				document.getElementById("newsItemAuthorRight").style.display = "inline";
            	document.getElementById("newsItemCommentsLeft").style.display = "none";
				document.getElementById("newsItemTeaserLeft").style.display = "none";
				document.getElementById("newsItemLogoLeft").style.display = "inline";				
				document.getElementById("newsItemBlogCommentsLeft").style.display = "inline";
				document.getElementById("newsItemBlogCommentLeft").innerHTML = this.aComponentObjects[0].comments;
				document.getElementById("newsItemBlogRatingLeft").innerHTML = this.aComponentObjects[0].rating;			
			}
		}

		if (this.aComponentObjects.length > 1) {
			this.drawStatus();
        }

		return false;
	}

	this.addItem = function(sTitle, sImageUrl, sItemUrl, sTeaser, sPubDate, sType, sComments, sRating, sAuthor)  {
		var oTmp = { title : sTitle, imageUrl : sImageUrl, itemUrl : sItemUrl, teaser : sTeaser, pubdate : sPubDate, type : sType, comments : sComments, rating : sRating, author : sAuthor };
		this.aComponentObjects.push(oTmp);
	}

	this.init = function () {
		//
	}

	this.NewsViewComponent();
}
NewsViewComponent.prototype = new ViewComponent();
 
/* --------------------------------------------------------------------------------------------- */
/* --- CarouselViewComponent extended class  --- */
/* --------------------------------------------------------------------------------------------- */
function CarouselViewComponent() {
	this.CarouselViewComponent = function() {
		this.iNumItemsPerPage = 1;
		this.element = document.getElementById("carouselWrapper");
		ViewComponent.call( this );
	}

	this.draw = function() {
			document.getElementById("carouselCenterText").style.display = "block";
        	document.getElementById("carouselCategory").style.display = "block";
        		
			document.getElementById("carouselImageWrapperCenter").innerHTML = this.origBgImage;

			// For handling several items or only 1 carousel item;
			if (this.aComponentObjects.length > 1) {
				featuredIndex = 1;
			} else {
				featuredIndex = 0;
			}

			// Page background per carousel item
			if (this.aComponentObjects[featuredIndex].pageBg != "" && this.aComponentObjects[featuredIndex].pageBg != undefined) {
				document.getElementById("bgWrapper").style.backgroundImage = "url(" + this.aComponentObjects[featuredIndex].pageBg + ")";
			} else {
				document.getElementById("bgWrapper").style.backgroundImage= "url('" + sBgImage + "')";
			}

			// If item 1 (Featured item) is blog
			if (this.aComponentObjects[featuredIndex].type == "blog") {
				document.getElementById("carouselCategory").style.display = "none";
				document.getElementById("carouselGenreWrapper").style.display = "none";
				document.getElementById("carouselOverlayCenter").src = "/static/furn/carousel_main_blog_off.png";
				document.getElementById("carouselBlogComment").innerHTML =  this.aComponentObjects[featuredIndex].commentsnumber;
				document.getElementById("carouselBlogRatingFill").style.width =  Math.floor(((this.aComponentObjects[featuredIndex].rating  / 10) * 2) * 126) + "px";
				document.getElementById("carouselBlog").style.display = "block";
				document.getElementById("carouselCenterTeaser").style.display = "none";

				document.getElementById("carouselBlogTextCenter").style.display = 'inline';
				document.getElementById("carouselBlogAuthorCenter").innerHTML = this.aComponentObjects[featuredIndex].author;
				document.getElementById("carouselBlogPubdateCenter").innerHTML = this.aComponentObjects[featuredIndex].pubdate;
			} else {
				document.getElementById("carouselBlogTextCenter").style.display = 'none';
				document.getElementById("carouselCenterTeaser").style.display = "block";
				document.getElementById("carouselBlog").style.display = "none";
				if (this.aComponentObjects[featuredIndex].category != "") {
					document.getElementById("carouselCategory").style.display = "block";
				} else {
					document.getElementById("carouselCategory").style.display = "none";
				}
				document.getElementById("carouselGenreWrapper").style.display = "block";
				document.getElementById("carouselOverlayCenter").src = "/static/furn/carousel_main_off.png";
			}
			if (document.getElementById("carouselImageCenter") != undefined) document.getElementById("carouselImageCenter").src = ( this.aComponentObjects[featuredIndex].imageUrl == "" ) ? "/static/furn/bg_featured_empty.jpg" : this.aComponentObjects[featuredIndex].imageUrl;

			// If item 0 is blog, use blog theme, assumes 2 items
			if (this.aComponentObjects.length > 1) {
				if (this.aComponentObjects[0].type == "blog") {
					document.getElementById("carouselOverlayLeft").src = "/static/furn/carousel_back_blog_off.png";
				} else {
					document.getElementById("carouselOverlayLeft").src = "/static/furn/carousel_back_off.png";
				}
				document.getElementById("carouselImageLeft").src = ( this.aComponentObjects[0].imageUrl == "" ) ? "/static/furn/bg_featured_empty.jpg" : this.aComponentObjects[0].imageUrl;
		    }
		    
			// If item 2 is blog, use blog theme, assumes 3 items
			if (this.aComponentObjects.length > 2) {
				if (this.aComponentObjects[2].type == "blog") {
					document.getElementById("carouselOverlayRight").src = "/static/furn/carousel_back_blog_off.png";
				} else {
					document.getElementById("carouselOverlayRight").src = "/static/furn/carousel_back_off.png";
				}
				document.getElementById("carouselImageRight").src = ( this.aComponentObjects[2].imageUrl == "" ) ? "/static/furn/bg_featured_empty.jpg" : this.aComponentObjects[2].imageUrl;
			}

			// Hide text area if no titles
			if (this.aComponentObjects[featuredIndex].title == "" &&  this.aComponentObjects[featuredIndex].author == "") {
				document.getElementById("carouselCenterText").style.display = "none";
			} else {
				document.getElementById("carouselCenterText").style.display = "block";
			}

		document.getElementById("carouselCategory").innerHTML = this.aComponentObjects[featuredIndex].category;
		document.getElementById("carouselCenterTitle").innerHTML = this.aComponentObjects[featuredIndex].title;
		document.getElementById("carouselCenterTeaser").innerHTML = this.aComponentObjects[featuredIndex].teaser;

		// Genre
		if (this.aComponentObjects[featuredIndex].genre != "") {
			document.getElementById("carouselGenreWrapper").style.display = "block";
			document.getElementById("carouselGenre").src = "/static/common/furn/icons/genres/" + this.aComponentObjects[featuredIndex].genre + ".png";
		} else {
			document.getElementById("carouselGenreWrapper").style.display = "none";
			document.getElementById("carouselGenre").src = "/static/furn/pixel.gif";
		}

		var carouselItemLinkCenter =  document.getElementById("carouselItemLinkCenter");

		if (this.aComponentObjects[featuredIndex].itemUrl != "") {
       		carouselItemLinkCenter.href = this.aComponentObjects[featuredIndex].itemUrl;
        } else if (this.aComponentObjects[featuredIndex].callback != "") {
        	carouselItemLinkCenter.href = "javascript: doOverlay('overlayFeatured');" + this.aComponentObjects[featuredIndex].callback;
        }

		// "View more" link
		if ((this.aComponentObjects[featuredIndex].genre == "movie" || this.aComponentObjects[featuredIndex].genre == "music" || this.aComponentObjects[featuredIndex].genre == "video") && this.aComponentObjects[featuredIndex].itemUrl != "") {
			document.getElementById("carouselItemLinkViewMoreCenter").style.display = "block";
			document.getElementById("carouselItemLinkViewMoreCenter").href = this.aComponentObjects[featuredIndex].itemUrl;
		} else {
			document.getElementById("carouselItemLinkViewMoreCenter").style.display = "none";
			document.getElementById("carouselItemLinkViewMoreCenter").href = "javascript:;";
		}

		if (this.aComponentObjects[featuredIndex].screenshot != "") {
			carouselItemLinkCenter.href = "javascript:;";
			carouselItemLinkCenter.onclick =  this.showScreenshot.bind(this);
		} else if (this.aComponentObjects[featuredIndex].feedurl != "") {
            // In window
            if (document.getElementById("carouselMedia") == undefined) {
            	carouselItemLinkCenter.href = "javascript:;";
            	carouselItemLinkCenter.onclick = function() {
            		document.getElementById('carouselMedia').Play();
            		return false;
            	}
				createMediaPlayer('carouselImageWrapperCenter', this.aComponentObjects[featuredIndex].feedurl, 'carouselMedia');  // In window
			} else {
		    	document.getElementById("carouselMedia").src = "/static/furn/deploy/PSMPlayer_PS3.swf?config=" + this.aComponentObjects[featuredIndex].feedurl + "&site_locale=en_GB&translations=/static/furn/fla/xml/localisation.xml";
			}
		}
		return false;
	}

	this.showScreenshot = function() {
		document.getElementById('screenshotViewerImage').src = this.aComponentObjects[featuredIndex].screenshot;
		document.getElementById('screenshotViewer').style.display = 'block';
		return false;
	}

	this.showMetaData = function() {
		    if (document.getElementById("carouselCenterTitle").innerHTML != "") document.getElementById("carouselCenterText").style.display = "block";
        	if (document.getElementById("carouselCategory").innerHTML != "") document.getElementById("carouselCategory").style.display = "block";
        	if (document.getElementById("carouselGenreWrapper").innerHTML != "") document.getElementById("carouselGenreWrapper").style.display = "block";
	}

	this.hideMetaData = function() {
		    document.getElementById("carouselCenterText").style.display = "none";
        	document.getElementById("carouselCategory").style.display = "none";
        	document.getElementById("carouselGenreWrapper").style.display = "none";       	
	}

	this.addItem = function(sTitle, sImageUrl, sItemUrl, sTeaser, sBgImage, sCategory, sGenre, sType, sLogo, sCommentsNumber, sRating, sPubDate, sAuthor, sFeedUrl, sCallback, sItemId, sScreenshot)  {
		var oTmp = { title : sTitle, imageUrl : sImageUrl, itemUrl : sItemUrl, teaser : sTeaser, pageBg: sBgImage, category : sCategory, genre : sGenre, type : sType, logo : sLogo, commentsnumber : sCommentsNumber, rating : sRating, pubdate : sPubDate, author : sAuthor, feedurl : sFeedUrl, callback: sCallback, itemid: sItemId, screenshot : sScreenshot };
		this.aComponentObjects.push(oTmp);
	}
    
	this.init = function () {
		this.origBgImage = document.getElementById("carouselImageWrapperCenter").innerHTML;
		if (this.aComponentObjects.length == 1) {
			document.getElementById("btnCarouselPrevious").style.visibility = "hidden";
			document.getElementById("btnCarouselNext").style.visibility = "hidden";
		}
		var elFilter = document.getElementById("filterChangeView");
		if(elFilter){
		  if (this.aComponentObjects.length <  4 ) {
  			elFilter.style.display = "none";
	  	} else {
		  	elFilter.style.display = "block";
		  }
		}
	
		var imgDefaultBgTmp;
		var imgBgTmp;
		var imgTmp;

		for (var i = 0, ii = this.aComponentObjects.length; i < ii; i++) {
			if (this.aComponentObjects[i].pageBg != "") {
				imgBgTmp = new Image();
				imgBgTmp.src = this.aComponentObjects[i].pageBg;
				//document.getElementById("preloader").appendChild(imgBgTmp);
			}
			if (this.aComponentObjects[i].imageUrl != "") {
				imgTmp = new Image();
				imgTmp.src = this.aComponentObjects[i].imageUrl;
				//document.getElementById("preloader").appendChild(imgTmp);
			}
		}
		imgDefaultBgTmp = new Image();
		imgDefaultBgTmp.src = sBgImage;
		//document.getElementById("preloader").appendChild(imgDefaultBgTmp);
	}
	
	this.CarouselViewComponent();
}
CarouselViewComponent.prototype = new ViewComponent();

/* --------------------------------------------------------------------------------------------- */
/* --- GridViewComponent extended class  --- */
/* --------------------------------------------------------------------------------------------- */
function GridViewComponent() {
	this.GridViewComponent = function() {
		this.iNumItemsPerPage = 2;
		this.element = document.getElementById("gridWrapper");
		ViewComponent.call( this );
	}

	this.draw = function() {
		var iCurrentCell = 0;
		var iGridCount = ( this.aComponentObjects.length < 12 ) ? this.aComponentObjects.length : 12;
		for (var i = 0, ii = iGridCount; i < ii; i++) {
			document.getElementById("gId" + iCurrentCell).className = this.aComponentObjects[i].itemid;
			document.getElementById("g" + iCurrentCell).href = "";
			if (this.aComponentObjects[i].imageUrl == "" || this.aComponentObjects[i].imageUrl == undefined) {
				document.getElementById("g" + iCurrentCell).style.visibility = "visible";
				document.getElementById("g" + iCurrentCell + "i").src = "/static/furn/bg_grid_empty.png";
				document.getElementById("g" + iCurrentCell + "h1").innerHTML = "";
				document.getElementById("g" + iCurrentCell).href = "";
			} else {
				document.getElementById("g" + iCurrentCell).style.visibility = "visible";
				document.getElementById("g" + iCurrentCell + "i").src = this.aComponentObjects[i].imageUrl;
				document.getElementById("g" + iCurrentCell + "h1").innerHTML = this.aComponentObjects[i].title;

				// Hide text area if no titles
				if (location.href.indexOf('games/browse') != -1) {
				    document.getElementById("g" + iCurrentCell + "t").style.display = "block";
				} else {
					if (this.aComponentObjects[i].title == "") {
						document.getElementById("g" + iCurrentCell + "t").className = "gridTextOff";
					} else {
						document.getElementById("g" + iCurrentCell + "t").className = "gridTextOn";
					}
                }
                
				// Optimise
				if (this.aComponentObjects[i].itemUrl != "") {
					document.getElementById("g" + iCurrentCell).href = this.aComponentObjects[i].itemUrl;
				} else if (this.aComponentObjects[i].callback != "") {
					document.getElementById("g" + iCurrentCell).href = "javascript: doOverlay('overlayFeatured');" + this.aComponentObjects[i].callback;
				}
                if (this.aComponentObjects[i].screenshot != "") {
                	document.getElementById("g" + iCurrentCell).href = "javascript:document.getElementById('screenshotViewerImage').src = '" + this.aComponentObjects[i].screenshot + "';document.getElementById('screenshotViewer').style.display = 'block';";
				} else if (this.aComponentObjects[i].feedurl != "") {
					document.getElementById("g" + iCurrentCell).href = "javascript: cCarousel.search('" + this.aComponentObjects[i].itemid + "', 1);cCarousel.toggle();document.getElementById('carouselItemLinkCenter').focus();cGrid.search('" + this.aComponentObjects[i].itemid + "', 2);";
				}
			}
			iCurrentCell += 1;
		}
		return false;
	}

	this.addItem = function(sTitle, sImageUrl, sItemUrl, sBgImage, sFeedUrl, sCallback, sItemId, sScreenshot)  {
		var oTmp = { title : sTitle, imageUrl : sImageUrl, itemUrl : sItemUrl, pageBg : sBgImage, feedurl: sFeedUrl, callback : sCallback, itemid : sItemId, screenshot: sScreenshot };
		this.aComponentObjects.push(oTmp);
	}
    
	this.init = function() {
		var eColumn, eItem, eImage, eText, eHeading, iCount = 0;

		if ((this.aComponentObjects.length % 2 != 0) && this.aComponentObjects.length > 10) {
			this.aComponentObjects.push({});
		}

		for (var c = 0, cc = 6; c < cc; c++) {
			eColumn = document.createElement("div");
			eColumn.className = "column";
			for (var i = 0, ii = 2; i < ii; i++) {
				if (this.aComponentObjects.length < 11) {
				    eItem = document.createElement("a");
					eItem.className = "column2";
				} else {
					if (iCount > 9 || iCount < 2) {
						eItem = document.createElement("div");
						eItem.className = "gridInactiveItem";
					} else {
						eItem = document.createElement("a");
						eItem.className = "column" + (c+1);
					}
				}
				eItemId = document.createElement("span");
                eItemId.id = "gId" + iCount;
                
                eItem.id = "g" + iCount;

				eImage = document.createElement("img");
				eImage.className = "gridImage";
				eImage.src = "/static/furn/bg_grid_empty.png";
                eImage.id = "g" + iCount + "i";

				eText = document.createElement("div");
				eText.id = "g" + iCount + "t";
				eText.className = "gridTextOn";

				eHeading = document.createElement("h1");
                eHeading.id = "g" + iCount + "h1";

				eText.appendChild(eHeading);
				eItem.appendChild(eImage);
				eItem.appendChild(eText);
				eItem.appendChild(eItemId);
				
				eColumn.appendChild(eItem);
				iCount +=1;
			}
			this.element.appendChild(eColumn);

			// Grid buttons
			if (this.aComponentObjects.length > 10) {
				document.getElementById("btnGridPrevious").style.visibility = "visible";
				document.getElementById("btnGridNext").style.visibility = "visible";
			} else {
				document.getElementById("btnGridPrevious").style.visibility = "hidden";
				document.getElementById("btnGridNext").style.visibility = "hidden";
			}
			if (this.aComponentObjects.length > 8) {
				document.getElementById("btnGridNext").style.visibility = "visible";
			}
	
			if (this.aComponentObjects.length < 11) {
				document.getElementById("g0").style.visibility="hidden";
				document.getElementById("g1").style.visibility="hidden";
			}

            // Wrapper positioning
			if (this.aComponentObjects.length < 11) {
				document.getElementById("gridWrapper").style.left = "-10px";
				document.getElementById("btnGridNext").style.visibility = "hidden";
			} else {
				document.getElementById("gridWrapper").style.left = "-160px";
			}
			if (this.aComponentObjects.length < 9) {
				document.getElementById("gridWrapper").style.left = "150px";
			}   
		}
	}

	this.GridViewComponent();
}
GridViewComponent.prototype = new ViewComponent();

/* --------------------------------------------------------------------------------------------- */
/* --- RelatedViewComponent extended class  --- */
/* --------------------------------------------------------------------------------------------- */
function RelatedViewComponent() {
	this.RelatedViewComponent = function() {
		this.iNumItemsPerPage = 1;
		this.sItemType = "";
		this.element = document.getElementById("relatedItemWrapper");
		ViewComponent.call( this );
	}

	this.draw = function(sType) {
		var iCurrentCell = 0;		
        var aItemArray = [];

		if (sType != "" && sType != undefined) {
			this.sOldItemType = this.sItemType;
			this.sItemType = sType;
        }

		if (this.sOldItemType != this.sItemType) {
			this.aComponentObjects.length = 0;
			for (var i = 0, ii = this.aOrigObjects.length; i < ii; i++) {
				if (this.aOrigObjects[i].type == this.sItemType) {
					this.aComponentObjects.push(this.aOrigObjects[i]);
				}
			}

			var eList = document.getElementById("selector").getElementsByTagName("a");
			for (var i = 0, ii = eList.length; i < ii; i++) {
				eList[i].className = "off";
			}
			document.getElementById(this.sItemType).className = "on";

			document.getElementById("relatedHeading").innerHTML = this.aComponentObjects[0].heading;

			if (this.aComponentObjects.length > 8) {
				document.getElementById("btnRelatedPrevious").style.visibility = "visible";
				document.getElementById("btnRelatedNext").style.visibility = "visible";
			} else {
				document.getElementById("btnRelatedPrevious").style.visibility = "hidden";
				document.getElementById("btnRelatedNext").style.visibility = "hidden";
			}
        }

		for (var i = 0, ii = 8; i < ii; i++) {
			document.getElementById("relatedItem" + i).style.visibility = "hidden";
		}

		var iGridCount = ( this.aComponentObjects < 8 ) ? this.aComponentObjects.length : 8;
		for (var i = 0, ii = iGridCount; i < ii; i++) {
			if (this.aComponentObjects[i] != undefined) {
				if (this.aComponentObjects[i].imageUrl == "") {
					document.getElementById("relatedItem" + iCurrentCell).style.visibility = "hidden";
				} else {
					document.getElementById("relatedItem" + iCurrentCell).style.visibility = "visible";
					document.getElementById("relatedItemImage" + iCurrentCell).src = this.aComponentObjects[i].imageUrl;
					document.getElementById("relatedItemIcon" + iCurrentCell).src = this.aComponentObjects[i].iconsite;
					document.getElementById("relatedItemTitle" + iCurrentCell).innerHTML = this.aComponentObjects[i].title;
					document.getElementById("relatedItemLink" + iCurrentCell).href = this.aComponentObjects[i].itemUrl;
				}
			}
			iCurrentCell += 1;
		}
		this.sOldItemType = this.sItemType;
		
		return false;
	}

	this.addItem = function(sTitle, sImageUrl, sItemUrl, sExternalTarget, sIconSite, sItemType, sHeading)  {
		var oTmp = { title : sTitle, imageUrl : sImageUrl, itemUrl : sItemUrl, externaltarget : sExternalTarget, iconsite : sIconSite, type : sItemType, heading : sHeading };
		this.aOrigObjects.push(oTmp);
		this.aComponentObjects.push(oTmp);
	}

	this.init = function () {
	}

	this.RelatedViewComponent();
}
RelatedViewComponent.prototype = new ViewComponent();