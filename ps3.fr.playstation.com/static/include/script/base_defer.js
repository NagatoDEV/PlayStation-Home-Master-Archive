/* --------------------------------------------------------------------------------------------- */
/* --- Global: functions used in more than one closure. Therefore require global scope --- */
/* --------------------------------------------------------------------------------------------- */
function setSearchType(sSearchLinkId){
	document.getElementById('searchType').value = sSearchLinkId.split('searchLink')[1].toLowerCase();
	var aSearchLinks = getByClass('searchLink');
	var eSearchLink = document.getElementById(sSearchLinkId);
	eachOf(aSearchLinks,
		function(){
			this===eSearchLink ? addClassName(this,'selected') : removeClassName(this,'selected');
		},
		eSearchLink
	);
}
function getInput(domElem){
	var sIdSuffix = domElem.id.split('link')[1];
	return document.getElementById('input' + sIdSuffix);
}
function getLink(domElem){
	var sIdSuffix = domElem.id.split('input')[1];
	return document.getElementById('link' + sIdSuffix);
}

var oFilters = {};
oFilters.aGenreInputs = getByClass('inputGenre');
oFilters.aGenreLinks = getByClass('linkGenre');
oFilters.aGenreInputs.aOnLoadSelected = [];
oFilters.aGenreInputs.aOnLoadSelected = oFilters.aGenreInputs.filter(function(){
	return this.checked;
});
oFilters.aGenreInputs.aOnLoadNotSelected = [];
oFilters.aGenreInputs.aOnLoadNotSelected = oFilters.aGenreInputs.filter(function(){
	return !this.checked;
});
if(document.getElementById('inputAllGenres') && document.getElementById('selectAllGenres')){
	if(oFilters.aGenreInputs.aOnLoadNotSelected.length == 0){
		document.getElementById('inputAllGenres').value = true;
		addClassName(document.getElementById('selectAllGenres'),'selected');
	}
}
for(oFilters.i=0; oFilters.i<oFilters.aGenreInputs.length; oFilters.i++){
	if(oFilters.aGenreInputs[oFilters.i].checked){
		addClassName(oFilters.aGenreLinks[oFilters.i],'selected');
	}
}
oFilters.aFeaturesInputs = getByClass('inputFeatures');
oFilters.aFeaturesLinks = getByClass('linkFeatures');
oFilters.aFeaturesInputs.aOnLoadSelected = [];
oFilters.aFeaturesInputs.aOnLoadSelected = oFilters.aFeaturesInputs.filter(function(){
	return this.checked;
});
oFilters.aFeaturesInputs.aOnLoadNotSelected = [];
oFilters.aFeaturesInputs.aOnLoadNotSelected = oFilters.aFeaturesInputs.filter(function(){
	return !this.checked;
});
for(oFilters.i=0; oFilters.i<oFilters.aFeaturesInputs.length; oFilters.i++){
	if(oFilters.aFeaturesInputs[oFilters.i].checked){
		 addClassName(oFilters.aFeaturesLinks[oFilters.i],'selected');
	}
}
oFilters.reset = function(){
	eachOf(oFilters.aGenreInputs.aOnLoadSelected,function(){
		addClassName(getLink(this),'selected');
		this.checked = true;
	},null);
	eachOf(oFilters.aGenreInputs.aOnLoadNotSelected,function(){
		removeClassName(getLink(this),'selected');
		this.checked = false;
	},null);
	if(document.getElementById('inputAllGenres') && document.getElementById('selectAllGenres')){
		if(oFilters.aGenreInputs.aOnLoadNotSelected.length > 0){
			document.getElementById('inputAllGenres').value = false;
			removeClassName(document.getElementById('selectAllGenres'),'selected');
		}
		else{
			document.getElementById('inputAllGenres').value = true;
			addClassName(document.getElementById('selectAllGenres'),'selected');
		}
	}
	eachOf(oFilters.aFeaturesInputs.aOnLoadSelected,function(){
		addClassName(getLink(this),'selected');
		this.checked = true;
	},null);
	eachOf(oFilters.aFeaturesInputs.aOnLoadNotSelected,function(){
		removeClassName(getLink(this),'selected');
		this.checked = false;
	},null);
};
/* --------------------------------------------------------------------------------------------- */
/* --- Overlay Search --- */
/* --------------------------------------------------------------------------------------------- */
(function(){
	var searchBox = document.getElementById('searchBox');
  var initSearchValue = searchBox.value;

  var initSTypeParent = getByClass('selected', 'guideSelector')[0];
  var initSType = getAttribute(initSTypeParent, 'id').value;

  var defaultSBox = document.getElementById('defaultSBox').innerHTML;
	var searchSubmit = document.getElementById('searchSubmit');

	searchSubmit.onclick = function(){
    var sTypeParent = getByClass('selected', 'guideSelector')[0];
    var sType = getAttribute(sTypeParent, 'id').value;
			if(searchBox.value != defaultSBox && (searchBox.value != initSearchValue || sType != initSType)){
			  document.forms["searchForm"].submit();
			}
		};

	if(!hasClassName(document.body,'searchOverlay')){

		searchBox.onclick = function(){
			if(this.value == initSearchValue){
				this.value = "";
			}
		};
		searchBox.onblur = function(){
			if(this.value == ""){
				this.value = initSearchValue;
			}
		};
		searchBox.onfocus = function(){
			if(this.value == ""){
				this.value = initSearchValue;
			}
		};
	}
	var aSearchLinks = getByClass('searchLink');
	eachOf(aSearchLinks,function(){
		this.onclick = function(){
			setSearchType(this.id);
			return false;
		}
	},null);
	/* Link to search from other places */
 	

 })();

(function(){
	if (hasClassName(document.body,'searchOverlay')) {
		doOverlay("overlaySearch");
	}
	if (document.getElementById('overlayWrapper').className == "overlayGamesFilterVisible") {
		doOverlay("overlayGamesFilter");
	}
})();

/* --------------------------------------------------------------------------------------------- */
/* --- Overlay Close --- */
/* --------------------------------------------------------------------------------------------- */
 (function(){
	
	var eCloseOverlays = document.getElementById('closeOverlays');
	eCloseOverlays.onclick = function(){		
		var overlayWrapper = document.getElementById('overlayWrapper');
		overlayWrapper.style.display = 'none';

		// Show media player on close of overlay
		if (document.getElementById('carouselMedia')) document.getElementById('carouselMedia').style.visibility = 'visible';
		if (document.getElementById('featuredMedia')) document.getElementById('featuredImageWrapper').innerHTML = "";
		if (document.getElementById('newsDetailMedia')) document.getElementById('newsDetailMedia').style.visibility = 'visible';
		if (document.getElementById('guideDetailMedia')) document.getElementById('guideDetailMedia').style.visibility = 'visible';
		if (document.getElementById('systemSoftwareDetailMedia')) document.getElementById('systemSoftwareDetailMedia').style.visibility = 'visible';

		if (document.getElementById('overlayGamesFilter')) {
			var gamesFilterOverlayIsVisible = document.getElementById('overlayGamesFilter').style.display == 'block';
			if(gamesFilterOverlayIsVisible){
				oFilters.reset();
			}
			var eGamesFilterNoResults = document.getElementById('gamesFilterNoResults');
			if(eGamesFilterNoResults){
				 eGamesFilterNoResults.style.display = "none";
			}
		}
		if (document.getElementById('overlaySearch')) {
			var searchOverlayIsVisible = document.getElementById('overlaySearch').style.display == 'block';
			if(searchOverlayIsVisible){
				removeClassName(document.body,'searchOverlay');
			}
		}

	}

})();
/* --------------------------------------------------------------------------------------------- */
/* --- Games Filter Overlay --- */
/* --------------------------------------------------------------------------------------------- */
(function(){
	function all(a,s){
		return a.allAre(
			function(){
				return this.className.hasClass(s);
			}
		);
	}
	function only(e,a,s){
		if(!e.className.hasClass(s)) {
			return false;
		}
		else {
			for(var i=0; i<a.length; i++){
				if(a[i]!==e){
					if(a[i].className.hasClass(s)){
						return false;
					}
				}
			}
		}
		return true;
	}
	function allBut(e,a,s){
		if(e.className.hasClass(s)) {
			return false;
		}
		else {
			for(var i=0; i<a.length; i++){
				if(a[i]!==e){
					if(!a[i].className.hasClass(s)){
						return false;
					}
				}
			}
		}
		return true;
	}
	function genreFilters(aButtons,eClicked){
		if(all(aButtons,'selected')){
		  	removeClassName(document.getElementById('selectAllGenres'),'selected');
			removeClassName(eClicked,'selected');
			getInput(eClicked).checked = false;
		}
		else if(only(eClicked,aButtons,'selected')){
			addClassName(document.getElementById('selectAllGenres'),'selected');
			eachOf(aButtons,function(){
				addClassName(this,'selected');
				getInput(this).checked = true;
			},null);
		}
		else{
			if(hasClassName(eClicked,'selected')){
				removeClassName(eClicked,'selected');
				getInput(eClicked).checked = false;
			}
			else{
				addClassName(eClicked,'selected');
				getInput(eClicked).checked = true;
			}
		} 		
    	if(all(aButtons,'selected')){
			document.getElementById('inputAllGenres').value = true;
			addClassName(document.getElementById('selectAllGenres'),'selected');
		}
		else{
			document.getElementById('inputAllGenres').value = false;
			removeClassName(document.getElementById('selectAllGenres'),'selected');	
		}
		return false;
	}
	var aGenreLinks = document.getElementsByClassName('linkGenre');
	eachOf(aGenreLinks,function(){
		this.onclick = function(){
			genreFilters(aGenreLinks,this);
			return false;
		}
	},null)


	if(document.getElementById('selectAllGenres')) {
		var eGenresSelectAll = document.getElementById('selectAllGenres');
		eGenresSelectAll.onclick = function(){
		  	if(hasClassName(this,'selected')){
				removeClassName(this,'selected');
				document.getElementById('inputAllGenres').value = false;
				eachOf(aGenreLinks,function(){
				  removeClassName(this,'selected');
				  getInput(this).checked = false;
				},null);
		  	}
		  	else{
		    	addClassName(this,'selected');
				document.getElementById('inputAllGenres').value = true;
				eachOf(aGenreLinks,function(){
				  addClassName(this,'selected');
				  getInput(this).checked = true;
				},null);
		  	}
			return false;
		}
	}
	var aFeaturesLinks = document.getElementsByClassName('linkFeatures');
	eachOf(aFeaturesLinks,function(){
		this.onclick = function(){
			if(hasClassName(this,'selected')){
				removeClassName(this,'selected');
				getInput(this).checked = false;
			}
			else{
				addClassName(this,'selected');
				getInput(this).checked = true;
			}
			return false;
		}
	},null)
	
})();
/* --------------------------------------------------------------------------------------------- */
/* --- Support General --- */
/* --------------------------------------------------------------------------------------------- */
(function(){
	var domList = document.getElementById('guidesTeasers');
	if(domList)	{
		var domListItems = [];
		for(var i=0; i < domList.childNodes.length; i++){
					if(domList.childNodes[i].nodeType == 1){
					domListItems.push(domList.childNodes[i]);
					var currentItem = domListItems.length-1;
					domListItems[currentItem].style.display = currentItem==0 ? 'block' : 'none';
				}
		}
		var current = 0;
		var last = domListItems.length -1;
		var first = 0;
		var domPrevious = document.getElementById('guidesPrevious');
		var domNext = document.getElementById('guidesNext');
		domPrevious.onclick = function(){
			var target;
			domListItems[current].style.display = 'none';
			if(current == first){
				target = last;
			}
			else{
				target = current-1;
			}
			domListItems[target].style.display = 'block';
			current = target;
			return false;
		};
		domNext.onclick = function(){
			var target;
			domListItems[current].style.display = 'none';
			if(current == last){
				target = first;
			}
			else{
				target = current+1;
			}
			domListItems[target].style.display = 'block';
			current = target;
			return false;
		}

		function doSearchOverlay(){
					doOverlay('overlaySearch');
					setSearchType('searchLinkhelp-support');
					return false;
		};
	}
	eachOf(getByClass('searchGuidesButton'),function(){
		this.onclick = doSearchOverlay;
	});

})();
/* --------------------------------------------------------------------------------------------- */
/* --- Guides List --- */
/* --------------------------------------------------------------------------------------------- */
(function(){
	function hideShowCategories(sTargetContentId){
		var eTarget = document.getElementById(sTargetContentId);
		if(eTarget){
			eachOf(getByClass('category'),function(){
				this.style.display = 'none';
			},null);
			eTarget.style.display = 'block';
			eTarget.parentNode.scrollTop = 0;
		}
	}
	function highlightCurrentNavLink(sTargetLinkId){
		eachOf(getByClass('guidesNavLink'),function(){
				removeClassName(this,'selected');
			},null);
		addClassName(document.getElementById(sTargetLinkId),'selected');
	}
	hideShowCategories('guidesCategory_general');
	highlightCurrentNavLink('guidesNavLink_general');
	eachOf(getByClass('guidesNavLink'),function(){
		this.onclick = function(){
			hideShowCategories("guidesCategory_" + this.id.split('_')[1]);
			highlightCurrentNavLink(this.id);
			return false;
		}
	},null);

	/* --------------------------------------------------------------------------------------------- */
	/* --- Guides Detail --- */
	/* --------------------------------------------------------------------------------------------- */
		var eViewAllGuides = document.getElementById('viewAllGuides');
		if(eViewAllGuides) {
			eViewAllGuides.onclick = function(){
				doOverlay('overlayGuideList');
				hideShowCategories('guidesCategory_general');
				highlightCurrentNavLink('guidesNavLink_general');
				return false;
			}
		}
		var eViewRelatedGuides = document.getElementById('viewRelatedGuides');
		if(eViewRelatedGuides) {
			eViewRelatedGuides.onclick = function(){
				doOverlay('overlayRelated');
				return false;
			}
		}

})();
/* --------------------------------------------------------------------------------------------- */
/* --- News Detail --- */
/* --------------------------------------------------------------------------------------------- */
    var eViewRelated= document.getElementById('viewRelated');
	if(eViewRelated) {
		eViewRelated.onclick = function(){
			doOverlay('overlayRelated');
			return false;
  		}
	}
/* --------------------------------------------------------------------------------------------- */
/* --- Controller Navigation (Footer) --- */
/* --------------------------------------------------------------------------------------------- */
(function(){
  var L1 = document.getElementById('controller-back');
    L1.onclick = function(){
      history.back(-1);
      return false;
  }
})();
/* --------------------------------------------------------------------------------------------- */
/* --- Button width fix (for odd values) --- */
/* --------------------------------------------------------------------------------------------- */
(function(){
	var e = document.body.getElementsByTagName("a");
	for (var i=0, ii = e.length; i < ii; i++) {
		if (hasClassName(e[i],'button') && (e[i].offsetWidth % 2 != 0)) {
			e[i].style.width = (e[i].offsetWidth + 1) + "px";
		}
	}
})();
/* --------------------------------------------------------------------------------------------- */
/* --- Navigation reset --- */
/* --------------------------------------------------------------------------------------------- */
(function(){
	var d = document.getElementById("navWrapper");
	var e = d.getElementsByTagName("a");
	for (var i=0, ii = e.length; i < ii; i++) {
		if (e[i].childNodes[0].style) {
			e[i].childNodes[0].style.display  = "none";
			e[i].onmouseover = function() {
				this.childNodes[0].style.display  = "block";
			}
			e[i].onmouseout = function() {
				this.childNodes[0].style.display  = "none";
			}
		}
	}
})();






