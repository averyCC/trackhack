var players = window.players || {};

players.groovesharkPlayer = function(url, id) {
	console.log("grooveshark player", url);
	this.url = url;
	this._id = id;
	this._isPlaying = false;

	this.elem = $('<iframe/>', {
	    id: this._id,
	    src: url,
	    width: "100%",
	    height: "80px",
	    classid = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	});
	this.overlay = $('<div/>',{
		class: 'overlay'
	} );
	$(this.overlay).css('background-color', '#ff7f00');
}

players.groovesharkPlayer.prototype.appendTo = function(elem) {
	$(elem).append(this.overlay);
	var that = this;
	$(this.overlay).text(this.url)
					.click(function() {
						window.open(that.url, "_parent");
					});
	$(elem).append(this.elem);

	$(this.elem).html("<object width='100%' height='80' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' id= "+this.song_id+" name= "+this.song_id+">
	<param name='movie' value='http://grooveshark.com/songWidget.swf' /><param name='wmode' value='window' />
	<param name='allowScriptAccess' value='always' /><param name='flashvars' value='hostname=grooveshark.com&songID="+this.song_id_clip+"&style=metal&p=0' />
	<object type='application/x-shockwave-flash' data='http://grooveshark.com/songWidget.swf' width='100%' height='80'>
	<param name='wmode' value='window' /><param name='allowScriptAccess' value='always' />
	<param name='flashvars' value='hostname=grooveshark.com&songID="+this.song_id_clip+"&style=metal&p=0' />
	<span><a href='http://grooveshark.com/search/song?q="+this.search+"' title='"+this.song_name +" by "+ this.artist+" on Grooveshark'>
	this.song_name " + "by "+ this.artist+" on Grooveshark </a></span></object></object>");
}