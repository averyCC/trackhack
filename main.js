 $(function() {
 	var list;
     $.getJSON('./test.json', function(data) {
         list = new playlist.playlistView(data, 'body');
     })

     $('#click').click(function(e) {

         var input = $('input').val().trim();
         // var spotifyPlayer = new players.spotifyPlayer(input, 1);
         // spotifyPlayer.appendTo('body');
         list.addSong(input);
     });

    
 });
