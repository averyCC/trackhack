 

$(function() {
 	var list;
    $.getJSON('./test.json', function(data) {
        list = new playlist.playlistView(data, '#playlist_wrapper');
    });
    console.log("ho");

    $('#add_song_button').click(function(e) {
     	$("#add").hide();
        var input = $('#new_song').val().trim();
        $("#new_song").val("");
        if (input != ""){
         	list.addSong(input);
        }
    });

    $("#new_song").keypress(function(e){
		if (e.which==13){
			$("#add").hide();
	        var input = $('#new_song').val().trim();
	        $("#new_song").val("");
	        if (input != ""){
	         	list.addSong(input);
	        }
		}
	});
 });
