var players = window.players || {};

players.soundcloudPlayer = function(url, id) {
	console.log("soundcloud player", url);
	this.url = url;
	this._id = id;
	this._isPlaying = false;

	// this.elem = '<iframe src="https://embed.spotify.com/?uri='+input+'&output=embed" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>'
	this.elem = $('<iframe/>', {
	    id: this._id,
	    src: "http://w.soundcloud.com/player/?url="+url+"&show_artwork=false&liking=false&sharing=false&auto_play=false",
	    width: "100%",
	    height: "80px",
	    frameborder:"no",
	});
	this.overlay = $('<div/>',{
		class: 'overlay'
	} )
	$(this.overlay).css('background-color', '#f64c0e');

	
}

players.soundcloudPlayer.prototype.appendTo = function(elem) {
	$(elem).append(this.overlay);
	$(this.overlay).text(this.url);
	$(this.overlay).css('pointer-events', 'all');
	$(elem).append(this.elem);
	var that = this;
	$(this.overlay).click(
		function() {
			if (that._isPlaying) {that.pause();}
			else {that.play();}
	});
}

players.soundcloudPlayer.prototype.play = function() {
	var widget = SC.Widget(document.getElementById(this._id))
	widget.play();
	this._isPlaying = true;
}
players.soundcloudPlayer.prototype.pause = function() {
	var widget = SC.Widget(document.getElementById(this._id))
	widget.pause();	
	this._isPlaying = false;
}
