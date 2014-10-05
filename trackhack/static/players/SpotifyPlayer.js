var players = window.players || {};


players.spotifyPlayer = function(url, id) {
	console.log("spotify player", url);
	this.url = url;
	this._id = id;

	this.elem = $('<iframe/>', {
	    id: this._id,
	    src: 'https://embed.spotify.com/?uri=' + url + '&output=embed',
	    width: "80px",
	    height: "80px",
	    frameborder:"0",
	    allowtransparency:"true"
	});
	this.overlay = $('<div/>',{
		class: 'overlay',
		id: this._id
	} );
	$(this.overlay).css({'background-color': '#80bc42'});
	this.dataLookup();

}

players.spotifyPlayer.prototype.dataLookup = function() {
	var url = "http://ws.spotify.com/lookup/1/?uri=" + this.url;
	var that = this;
	$.getJSON(url, function(data) {
		$(that.overlay).find('.trackName').text(data.track.name);
		$(that.overlay).find('.trackArtist').text(data.track.artists[0].name);
		var time = Math.floor(data.track.length / 60) + ':' + (data.track.length/60 %1 * 60).toFixed(0);
		$(that.overlay).find('.timer').text(time);
	})

}

players.spotifyPlayer.prototype.appendTo = function(elem) {
	var li = document.createElement("li");
	$(li).html(this.overlay);
	$(li).append(this.elem);
	$(li).data('url', this.url);

    $(elem).append(li);
	var that = this;
	$(this.elem).click(function() {
		window.nowPlaying = this._id
	});
}

players.spotifyPlayer.prototype.pause = function() {
    //cannot be implemented
    return;
}