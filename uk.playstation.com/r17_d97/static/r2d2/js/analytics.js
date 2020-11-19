/* Site analytics for all event-based links */
var PDC = PDC || {};

PDC.Analytics = {
	singleTrackIdents : [],
	bindEvents : function(elements) {

		// Ensure s exists before proceeding (site catalyst)
		if (typeof(s) !== "undefined") {

			if (elements == undefined) elements = "";

			$(elements + "[data-analytics-event]").on("click", function(e){
				return PDC.Analytics.reportEvent(this);
			});

			$("form[data-analytics-event]").off().on("submit", function(e){
				return PDC.Analytics.reportEvent(this);
			});

		}
	},
	clearVars:function(){
		s["linkTrackEvents"] = "None";
		s["linkTrackVars"] = "None";

		for (var i=0; i < 75; i++) {
			s['prop'+i]='';
			s['eVar'+i]='';
			if(i<=5)
				s['hier'+i]='';
			if(i<=5)
				s['list'+i]='';
		}
		svarArr = ['pageName','channel','products','events','campaign','purchaseID','state','zip','server','linkName'];
		for (var i=0; i < svarArr.length ; i++) {
			s[svarArr[i]]='';
		}
	},
	reportCarouselEvent : function(element, rotations) {
		var $this = $(element),
			data = $this.data("analytics-event");

		if (data["adSaleItem"] == "true" || (data["adSaleItem"] == "false" && rotations < 4)) {
			PDC.Analytics.reportEvent(element);
		}
	},
	reportEvent : function(element) {
		var $this = $(element),
			result = true;

		// Converts to object automatically if using double-quote instead of single-quote for values
		var data = $this.data("analytics-event");

		if (data["name"]) {

			var singleTrackIdent = data["singleTrackIdent"];

			if (typeof(singleTrackIdent) === 'undefined' || typeof(PDC.Analytics.singleTrackIdents[singleTrackIdent]) === 'undefined')
			{
				s.timestamp=Math.round((new Date()).getTime()/1000);

				for (var prop in data) {
					//console.log("prop: " + prop + ", value: " + data[prop]);

					// Assign property name for analytics
					if (prop !== "name" && prop !== "target" && prop !== "navigate"){
						s[prop] = data[prop];
					}
				}

				if (data["trackPage"] && data["trackPage"] == "true")
				{
					s.t( element, data["target"], data["name"]);
					result = true;
				}
				else
				{
					// Open in different window, cancel click and call 'navigate' callback
					if ((!data["navigate"] || data["navigate"] == "true") && $this.attr("target") != "_self") {
						//console.log( "s.tl(" + element + ", " +  data["target"] + ", " + data["name"] + ", null, 'navigate')" );
						s.tl( element, data["target"], data["name"], null, 'navigate');
						result = false;
					// Open in same window
					} else {
						//console.log( "s.tl(" + $this + ", " +  data["target"] + ", " + data["name"]+ ")");
						s.tl( element, data["target"], data["name"]);
						result = true;
					}
				}

				//console.log(typeof element);

				PDC.Analytics.clearVars();

				if (typeof(singleTrackIdent) !== 'undefined' && typeof(PDC.Analytics.singleTrackIdents[singleTrackIdent]) === 'undefined') {
				    PDC.Analytics.singleTrackIdents[singleTrackIdent] = true;
				}
			}

		}

		return result;

	},
	reportCustomEvent : function(eventName, target, linkTrackEvents, props) {
		if (typeof(s) !== "undefined") {
			var linkTrackVars = "";

			for (prop in PDC.AnalyticsBase.additionalEventProperties)
			{
				s[prop] = PDC.AnalyticsBase.additionalEventProperties[prop];
				linkTrackVars += (linkTrackVars.length > 0 ? "," : "") + prop;
			}

			for (prop in props)
			{
				s[prop] = props[prop];
				linkTrackVars += (linkTrackVars.length > 0 ? "," : "") + prop;
			}

			if (linkTrackVars.length > 0)
			{
				s['linkTrackVars'] = linkTrackVars;
			}

			s['linkTrackEvents'] = linkTrackEvents;
			s.timestamp=Math.round((new Date()).getTime()/1000);
			s.tl( true, target, eventName);

			PDC.Analytics.clearVars();
		}
	}
}

$(document).ready(function() {
	PDC.Analytics.bindEvents();
})

