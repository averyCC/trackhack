var players = window.players || {};

players.youtubePlayer = function(url, id) {
	console.log("youtube player", url);
	this.url = url;
	this._id = id;
	this._isPlaying = false;

	// this.elem = '<iframe src="https://embed.spotify.com/?uri='+input+'&output=embed" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>'
	this.elem = $('<object/>', {
	    id: this._id,
	    type: "application/x-shockwave-flash",
	    // data: url + "?enablejsapi=1&amp;playerapiid=ytplayer&amp;version=3",
	    width: "300",
	    height: "80",
	    frameborder:"0",
	    allowtransparency:"true"
	});
	$(this.elem).attr('data', url + "?enablejsapi=1&amp;playerapiid=ytplayer&amp;version=3");
	$(this.elem).html('<param name="allowScriptAccess" value="always">');
	this.overlay = $('<div/>',{
		class: 'overlay'
	} )

	
}

players.youtubePlayer.prototype.appendTo = function(elem) {
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

players.youtubePlayer.prototype.play = function() {
	$(this.elem)[0].playVideo();
	this._isPlaying = true;
}
players.youtubePlayer.prototype.pause = function() {
	$(this.elem)[0].pauseVideo();
	this._isPlaying = false;
}
// <object type="application/x-shockwave-flash" id="js-player-inner" 
// data="http://www.youtube.com/v/AbPED9bisSc"style="visibility: visible;">
// <param name="allowScriptAccess" value="always"></object>