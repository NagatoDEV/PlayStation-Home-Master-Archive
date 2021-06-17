(function(_w, _p, _t){
	var runSecure=function(f, a) {
			var r; try{r= f(a)} catch(e){}; return r;
		},
		getWHref =function(_w_) {
			return runSecure(x => x.location.href,_w_);
		},
		getWDocRef =function(_w_) {
			return runSecure(x => x.document.referrer, _w_)
		},
		getURL = function() {
			var  th = getWHref(_t);
			return th ? th : getWDocRef(_p) || getWDocRef(_w)
		},
		getDomain = function() {
			return (getURL().match(/(?:https?:\/\/)?([^\/?#]+)/) || [])[1];
		},
		isIfInIf = function(){
			return (_p != _t); 
		},
		isDoubleNonFriendly = function(){
			return isIfInIf() && !getWHref(_t) && !getWHref(_p);
		},
		r = /((lanacion\.com\.ar)|(ciudad\.com\.ar)|(cronica\.com\.ar)|(diariouno\.com\.ar)|(americatv\.com\.ar)|(cronicatv\.com\.ar)|(debate\.com\.mx)|(elheraldodechihuahua\.com\.mx)|(elheraldodetabasco\.com\.mx)|(elheraldodechiapas\.com\.mx)|(cooperativa\.cl)|(trome\.pe)|(elheraldo\.hn)|(cadena3\.com(\.ar)?)|(primiciasya\.com)|(minutouno\.com)|(ambito\.com(\.ar)?)|(perfil\.com)|(peru\.com)|(diarioregistrado\.com)|(minutouno\.com)|(cronista\.com)|(exitoina\.perfil\.com)|(caras\.perfil\.com)|(442\.perfil\.com)|(m\.perfil\.com)|(parabrisas\.perfil\.com)|(gestion\.pe)|(elcomercio\.pe)|(perfil\.com)|(noticias\.perfil\.com)|(peru\.com)|(marieclaire\.perfil\.com)|(weekend\.perfil\.com)|(rouge\.perfil\.com)|(apertura\.com)|(exitoina\.perfil\.com)|(depor\.com)|(turismo\.perfil\.com)|(cienradios\.com)|(radio\.perfil\.com))\.?$/,
		w =   getWHref(_t) ? _t
			: getWHref(_p) ? _p
			:  _w,
		d = w.document, s;
	try {
		if(!isDoubleNonFriendly() && !r.test(getDomain())) {
			s = d.head.appendChild(d.createElement("script"));
			w._rl_cn = w._rl_cn || 0;
			w._rl_ptc = ("https:" == w.location.protocol ? "https" : "http");
			w._rl_ids = w._rl_ids || [];
			w._rely = w._rely || [];
			w._rely.options = {url: getURL()};
			w._rl_ids.push({pid:1473,src:0}); 
			w._rely.send = w._rely.send
				? w._rely.send
				: (function(){});
			s.id = "rely-api-" + (w._rl_cn++);
			s.src =	w._rl_ptc + "://api.retargetly.com/loader?id=" + w._rl_ids[w._rl_ids.length - 1].pid;
		}
	} catch(e) {}
})(window, parent, top)