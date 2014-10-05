var players = window.players || {};

players.youtubePlayer = function(url, id) {
	this.url = url;
	this._id = id;
	this._isPlaying = false;

	this.elem = $('<object/>', {
	    id: this._id,
	    type: "application/x-shockwave-flash",
	    width: "80px",
	    height: "80px",
	    frameborder:"0",
	    allowtransparency:"true"
	});
	$(this.elem).attr('data', url + "?enablejsapi=1&amp;playerapiid=ytplayer&amp;version=3");
	$(this.elem).html('<param name="allowScriptAccess" value="always">');
	this.overlay = $('<div/>',{
		class: 'overlay',
		id: this._id
	} )
	// $(this.elem).css("display","hidden");
	$(this.overlay).css('background-color', '#c31320');	

}

players.youtubePlayer.prototype.appendTo = function(elem) {
	var li = document.createElement("li");
	$(li).html(this.overlay);
	$(li).append(this.elem);
    $(elem).append(li);
    $(li).data('url', this.url);

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
		$('<img/>', {
			src: data.data.thumbnail.sqDefault
		}).css({'float': 'left',
				'width': '81px', 
				'height': '81px',
				'opacity': 1,
				'margin-left': '-10px',
				'margin-top': '-10px',
				'position': 'absolute',
				'display': 'none'}
				).prependTo(that.overlay);
		$(that.overlay).find('.trackName').text(data.data.title);
		$(that.overlay).find('.trackName').css("margin-left", "85px");
		var time = Math.floor(data.data.duration/ 60) + ':' + (data.data.duration/60 %1 * 60).toFixed(0);
		$(that.overlay).find('.timer').text(time);
		$(that.overlay).find('.trackArtist').text(data.data.uploader);
		$(that.overlay).find('.trackArtist').css("margin-left", "85px");

	});
}
players.youtubePlayer.prototype.play = function() {
	$(this.elem)[0].playVideo();
	window.nowPlaying = this._id;
	this._isPlaying = true;
}
players.youtubePlayer.prototype.pause = function() {
	$(this.elem)[0].pauseVideo();
	this._isPlaying = false;
}
