var playlist = window.playlist || {};
var nowPlaying = window.nowPlaying || {};

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
    this.id = 0;
    var spans = "<span class='trackName'></span><span class='trackArtist'></span><span class='timer'></span>";
    for (track in this.data) {
        song = this.data[track];
        switch (song.type) {
            case "spotify":
                var spotifyPlayer = new players.spotifyPlayer(song.uri, this.id++);
                spotifyPlayer.appendTo(this.elem);
                $(spotifyPlayer.overlay).append(spans);
                break;
            case "youtube":
                var youtubePlayer = new players.youtubePlayer(song.uri, this.id++);
                youtubePlayer.appendTo(this.elem);
                $(youtubePlayer.overlay).append(spans);

                break;
            case "soundcloud":
                var soundcloudPlayer = new players.soundcloudPlayer(song.uri, this.id++);
                soundcloudPlayer.appendTo(this.elem);
                $(soundcloudPlayer.overlay).append(spans);

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
    } else if (song.indexOf("youtube") !== -1) {
        var uri = "http://www.youtube.com/v/" + song.split("=")[1];
        this.data[this.id] = {
            "type": "youtube",
            "uri": uri
        }
    } else if (song.indexOf("soundcloud") !== -1) {
        this.data[this.id] = {
            "type": "soundcloud",
            "uri": song
        }
    }
    this.render();
}
