var players = window.players || {};
var nowPlaying = window.nowPlaying || 0;

players.soundcloudPlayer = function(url, id) {
    console.log("soundcloud player", url);
    this.url = url;
    this._id = id;
    this._isPlaying = false;

    this.elem = $('<object/>', {
        id: this._id,
        width: "80px",
        height: "80px",
        classid: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    });
    this.overlay = $('<div/>', {
        class: 'overlay',
        id: this._id
    })


    $(this.overlay).css('background-color', '#f64c0e');


}

players.soundcloudPlayer.prototype.appendTo = function(elem) {

    $(this.overlay).css('pointer-events', 'all');
    var li = document.createElement("li");

    $(li).html(this.overlay);
    $(li).append(this.elem);
    $(li).data('url', this.url);
    $(elem).append(li);

    var that = this;
    $(this.elem).html('<param name="allowscriptaccess" value="always"></param>' +
        '<embed allowscriptaccess="always" ' +
        'height="80" ' +
        'src="http://player.soundcloud.com/player.swf?url=' + this.url + '&enable_api=true&object_id=' + this._id + '" ' +

        'type="application/x-shockwave-flash" width="100%" name="' + this._id + '"></embed>'
    );
    $(this.overlay).click(
        function() {
            if (that._isPlaying) {
                that.pause();
            } else {
                that.play();
            }
        });
    soundcloud.addEventListener('onPlayerReady', function(player, data) {
        console.log('player ready');
        that.dataLookup();
    });

}

players.soundcloudPlayer.prototype.dataLookup = function() {
    var that = this;
    var data = soundcloud.getPlayer(this._id).api_getTrackDuration();
    var time = Math.floor(data / 60) + ':' + (data / 60 % 1 * 60).toFixed(0);
    $(that.overlay).find('.timer').text(time);
    data = soundcloud.getPlayer(this._id).api_getCurrentTrack();
    $(that.overlay).find('.trackName').text(data.title);
    $(that.overlay).find('.trackArtist').text(data.user.name);
    $('<img/>', {
        src: data.artwork || ''
    }).css({
        'float': 'left',
        'width': '80px',
        'height': '80px',
        'opacity': 1,
        'margin-left': '-10px',
        'margin-top': '-10px',
        'position': 'absolute'
    }).prependTo(that.overlay);


}

players.soundcloudPlayer.prototype.play = function() {
    soundcloud.getPlayer(this._id).api_play()
    window.nowPlaying = this._id;
    this._isPlaying = true;
}
players.soundcloudPlayer.prototype.pause = function() {
    soundcloud.getPlayer(this._id).api_pause()
    this._isPlaying = false;
}
