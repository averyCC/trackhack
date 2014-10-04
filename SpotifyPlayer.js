var players = window.players || {};

players.spotifyPlayer = function(url, id) {
	console.log("spotify player", url);
	this.url = url;
	this._id = id;

	// this.elem = '<iframe src="https://embed.spotify.com/?uri='+input+'&output=embed" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>'
	this.elem = $('<iframe/>', {
	    id: this._id,
	    src: 'https://embed.spotify.com/?uri=' + url + '&output=embed',
	    width: "300",
	    height: "80",
	    frameborder:"0",
	    allowtransparency:"true"

	});
	this.overlay = $('<div/>',{
		class: 'overlay',
		style: "background-color=#ffffff"
	} )
}

players.spotifyPlayer.prototype.appendTo = function(elem) {
	$(elem).append(this.overlay);
	$(this.overlay).text(this.url);
	$(elem).append(this.elem);
}