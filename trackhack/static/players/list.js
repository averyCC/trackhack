window.nowPlaying = 0;
 var playlist = window.playlist || {};
window.playlist = playlist;
players = window.players || {};
//handing the playlist view
playlist.playlistView = function(data, containerDiv) {
    this.id = 0;
    this.playersList = [];

    this.elem = $('<div/>', {
        id: 'playlist'
    });
    this.data = data;
    $(containerDiv).append(this.elem);
    for (track in this.data) {
        this.addSong(this.data[track].uri);
    }
    //this.render();
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

playlist.playlistView.prototype.render = function(song) {
    // $(this.elem).empty();
    var playersList = [];
    console.log("id:");
    console.log(this.id);
    //this.id = 0;
 
    var that = this;
    var spans = "<span class='trackName'></span><span class='trackArtist'></span><span class='timer'></span>";
    // for (track in this.data) {
        console.log(track);
        // song = this.data[track];
        // song = this.data[this.data.length -1];
        console.log("hi");
        console.log(this.elem);
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
    // }
    this.playersList = playersList;
}

playlist.playlistView.prototype.renderCur = function() {
    if (window.nowPlaying > 0) {
        $('#curTrack').text($('.overlay#'+window.nowPlaying).find('.trackName').text());
    }   

}
playlist.playlistView.prototype.addSong = function(song) {
    var insert;
        debugger

    if (song.split(':')[0] == "spotify") {
        insert = {
            "type": "spotify",
            "uri": song
        }
    } else if (song.indexOf("youtube") !== -1) {
        var uri = "http://www.youtube.com/v/" + song.split("=")[1];
        insert = {
            "type": "youtube",
            "uri": uri
        }
        console.log(uri);
    } else if (song.indexOf("soundcloud") !== -1) {
        insert = {
            "type": "soundcloud",
            "uri": song
        }
    }
    this.data[this.id] = insert;
    this.render(insert);
    $.ajax({
        url: '/addTrack',
        data: {'name': $('#playlist_list .active').text().trim(), 
            'tracks': JSON.stringify(this.data)    
        }  
    })
}
