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
	    width: "100%",
	    height: "80px",
	    frameborder:"0",
	    allowtransparency:"true"
	});
	$(this.elem).attr('data', url + "?enablejsapi=1&amp;playerapiid=ytplayer&amp;version=3");
	$(this.elem).html('<param name="allowScriptAccess" value="always">');
	this.overlay = $('<div/>',{
		class: 'overlay'
	} )
	$(this.overlay).css('background-color', '#c31320');	
}

players.youtubePlayer.prototype.appendTo = function(elem) {
	$(elem).append(this.overlay);
	$(this.overlay).css('pointer-events', 'all');
	$(elem).append(this.elem);
	var that = this;
	$(this.overlay).click(
		function() {
			if (that._isPlaying) {that.pause();}
			else {that.play();}
	});
	this.dataLookup();
}


players.youtubePlayer.prototype.dataLookup = function() {
	var split = this.url.split('/');
	var uid = split[split.length-1];
	var that = this;
	$.getJSON('http://gdata.youtube.com/feeds/api/videos/'+uid+'?v=2&alt=jsonc', function(data) {
		console.log(data);
		$(that.overlay).find('.trackName').text(data.data.title);
		var time = Math.floor(data.data.duration/ 60) + ':' + (data.data.duration/60 %1 * 60).toFixed(0);
		$(that.overlay).find('.timer').text(time);
		$(that.overlay).find('.trackArtist').text(data.data.uploader);

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
