window.nowPlaying = 0;
 var playlist = window.playlist || {};
window.playlist = playlist;
players = window.players || {};
//handing the playlist view
playlist.playlistView = function(data, containerDiv) {
    this.id = 0;
    this.playersList = [];

    this.elem = $('<div/>', {
        class: 'playlist'
    });
    this.data = data;
    $(containerDiv).append(this.elem);
    this.render();
    var that = this;
    $('#playlist_wrapper').click(function() {
        that.renderCur();
        for (i in that.playersList) {
            if (that.playersList[i]._id !== window.nowPlaying) {
                that.playersList[i].pause();
            }
        }
    });
}

playlist.playlistView.prototype.render = function() {
    $(this.elem).empty();
    var playersList = [];
    this.id = 0;
    var that = this;
    var spans = "<span class='trackName'></span><span class='trackArtist'></span><span class='timer'></span>";
    for (track in this.data) {
        song = this.data[track];
        switch (song.type) {
            case "spotify":
                var spotifyPlayer = new players.spotifyPlayer(song.uri, this.id++);
                spotifyPlayer.appendTo(this.elem);
                $(spotifyPlayer.overlay).append(spans);
                playersList.push(spotifyPlayer);
                break;
            case "youtube":
                var youtubePlayer = new players.youtubePlayer(song.uri, this.id++);
                youtubePlayer.appendTo(this.elem);
                $(youtubePlayer.overlay).append(spans);
                playersList.push(youtubePlayer);

                break;
            case "soundcloud":
                var soundcloudPlayer = new players.soundcloudPlayer(song.uri, this.id++);
                soundcloudPlayer.appendTo(this.elem);
                $(soundcloudPlayer.overlay).append(spans);
                playersList.push(soundcloudPlayer);

                break;
            default:
                break;
        }
    }
    this.playersList = playersList;
}

playlist.playlistView.prototype.renderCur = function() {
    if (window.nowPlaying > 0) {
        $('#curTrack').text($('.overlay#'+window.nowPlaying).find('.trackName').text());
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
        console.log(uri);
    } else if (song.indexOf("soundcloud") !== -1) {
        this.data[this.id] = {
            "type": "soundcloud",
            "uri": song
        }
    } else if (song.indexOf("grooveshark") !== -1){
        this.data[this.id] = {
            "type": "grooveshark",
            "uri": song
        }
    }
    this.render();
}
