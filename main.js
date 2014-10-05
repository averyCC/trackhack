 $(function() {
 	var list;
     $.getJSON('./test.json', function(data) {
         list = new playlist.playlistView(data, '#playlist_wrapper');
     })

     $('#add_song_button').click(function(e) {
         var input = $('#new_song').val().trim();
         list.addSong(input);
     });
 });
