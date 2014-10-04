var playlist = window.playlist || {};
//handing the playlist view
playlist.playlistView = function(data, containerDiv) {
    this.id = 0;
    this.elem = $('<div/>', {
        class: 'playlist'
    });
    this.data = data;
    $(containerDiv).append(this.elem);
    this.render();
}

playlist.playlistView.prototype.render = function() {
	$(this.elem).empty();
    for (track in this.data) {
        song = this.data[track];
        switch (song.type) {
            case "spotify":
                var spotifyPlayer = new players.spotifyPlayer(song.uri, this.id++);
                spotifyPlayer.appendTo(this.elem);
                break;
            default:
                break;
        }
    }
}

playlist.playlistView.prototype.addSong = function(song) {
	if (song.split(':')[0] == "spotify") {
		this.data[this.id] = {
			"type": "spotify", 
			"uri": song
		}
	}	
	this.render();
}