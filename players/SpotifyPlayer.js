var players = window.players || {};

players.spotifyPlayer = function(url, id) {
	console.log("spotify player", url);
	this.url = url;
	this._id = id;

	this.elem = $('<iframe/>', {
	    id: this._id,
	    src: 'https://embed.spotify.com/?uri=' + url + '&output=embed',
	    width: "100%",
	    height: "80px",
	    frameborder:"0",
	    allowtransparency:"true"
	});
	debugger
	this.overlay = $('<div/>',{
		class: 'overlay'
	} );
	$(this.overlay).css('background-color', '#80bc42');
}

players.spotifyPlayer.prototype.appendTo = function(elem) {
	$(elem).append(this.overlay);
	var that = this;
	$(this.overlay).text(this.url)
					.click(function() {
						window.open(that.url, "_parent");
					});
	$(elem).append(this.elem);
}