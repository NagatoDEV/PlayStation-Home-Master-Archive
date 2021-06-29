// WebTrends SmartSource Data Collector Tag
// Version: 1.1.0
// Created: 1/14/2008 4:27:24 PM
function DcsInit(){
	var that=this;
	this.dcsid="dcsisgim500000ggf3zrcuxv7_7x2c";
	this.domain="webtrends.eu.playstation.com";
	this.enabled=true;
	this.exre=(function(){return(window.RegExp?new RegExp("dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)","i"):"");})();
	this.fpc="WT_FPC";
	this.fpcdom="";
	this.i18n=false;
	this.images=[];
	this.index=0;
	this.qp=[];
	this.re=(function(){return(window.RegExp?(that.i18n?{"%25":/\%/g}:{"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g}):"");})();
	this.onsitedoms="alphaAFK.com";
	this.downloadtypes="xls,doc,pdf,txt,csv,zip,wmv";
	this.timezone=0;
	this.trackevents=true;
	(function(){if(that.enabled&&(document.cookie.indexOf(that.fpc+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)){document.write("<scr"+"ipt type='text/javascript' src='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+that.domain+"/"+that.dcsid+"/wtid.js"+"'><\/scr"+"ipt>");}})();
}
var DCS={};
var WT={};
var DCSext={};
var dcsInit=new DcsInit();