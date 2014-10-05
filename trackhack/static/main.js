 var playlist = window.playlist || {};
// = window.playlist = list;
var list = window.playlist || {};


 function addSong() {
     $("#add").hide();
     var input = $('#new_song').val().trim();
     $("#new_song").val("");
     if (input != "") {
         list.addSong(input);
     }
 }

 $(function() {
     $('#add_song_button').click(function(e) {
         addSong()
     });

     $("#new_song").keypress(function(e) {
         if (e.which == 13) {
             addSong()
         }
     });
 });
