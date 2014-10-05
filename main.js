 $(function() {
 	var list;
     $.getJSON('./test.json', function(data) {
         list = new playlist.playlistView(data, 'body');
     })

     $('#click').click(function(e) {
         var input = $('input').val().trim();
         list.addSong(input);
     });


 });
