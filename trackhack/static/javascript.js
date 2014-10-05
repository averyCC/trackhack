function resize(){
	var name = $("#playlist_name").width();
	var size = name + 280;
	$("#playlist_header").css("min-width", size+"px");
	$("#playlist_wrapper").css("min-width", size+"px");
}

 function loadPlaylist() {
     $.ajax({
         url: '/loadPlaylist',
         data: {
             'name': $('#playlist_list .active').text().trim()
         },
         success: function(data) {
            $('#playlist_wrapper').empty();
             list = new playlist.playlistView(data.playlist, '#playlist_wrapper');
         }
     });
 }

function submit(){

	var text = $("#new_playlist").val();
	if ($.trim(text) != ""){
		var newNode = document.createElement("li");
		$('#playlist_list ul').append(newNode);
		$(newNode).html("<span>"+text+"</span><div class='privacy'></div>");
		$(newNode).find('.privacy').click(function() {
			if ($(this).hasClass("private")){
		  		$(this).removeClass("private");
		  	}
		  	else{
		  		$(this).addClass("private");
		  	}
		});

		$(newNode).click(function(){
		  	console.log($(event.target));
		  	if (!$(this).hasClass("active") && !$(event.target).hasClass("privacy")){
		  		$("#playlist_list .active").removeClass("active");
		  		$(this).addClass("active");
		  		$("#playlist_name").text($(this).children(":first").html());
		  		resize();
		  	}
		});

	}
	$("#addPlaylist").html("+");
}

function submit_song(){
}

$(document).ready(function() {
  	//$("table").colResizable();
  	resize();
  	var size = $("#currently_playing").width()+230;
  	$("#header").css("min-width", size+"px");

  	$("#friend_list li").click(function(){
  		if (!$(this).hasClass("active")){
  			$("#friend_list .active").removeClass("active");
  			$(this).addClass("active");
  		}
  	});

  	$("#playlist_list li").click(function(){
  		if (!$(this).hasClass("active") && !$(event.target).hasClass("privacy")){
  			$("#playlist_list .active").removeClass("active");
  			$(this).addClass("active");
  			$("#playlist_name").text($(this).children(":first").html());
        console.log('hi');
        loadPlaylist();
  			resize();
  		}
  	});

  	$(".privacy").click(function(){
  		if ($(this).hasClass("private")){
  			$(this).removeClass("private");
  		}
  		else{
  			$(this).addClass("private");
  		}
 	});

  	$("#shuffle").click(function(){
  		if ($(this).hasClass("shuffle_on")){
  			$(this).removeClass("shuffle_on");
  			$(this).addClass("shuffle_off");
  		}
  		else {
  			$(this).addClass("shuffle_on");
  			$(this).removeClass("shuffle_off");
  		}
  	});

  	$("#play").click(function(){
  		if ($(this).hasClass("paused")){
  			$(this).removeClass("paused");
  			$(this).addClass("not_paused");
  		}
  		else{
  			$(this).addClass("paused");
  			$(this).removeClass("not_paused");
  		}
  	});

  	$(window).resize(function(){
  		var size = $("#currently_playing").width()+230;
  		$("#header").css("min-width", size+"px");
  	});

  	$("#addPlaylist").click(function(){
  		$(this).html("<input id='new_playlist' type='text' name='new_playlist'>");
		document.getElementById("new_playlist").select();
		$("#new_playlist").keypress(function(e){
			if (e.which==13){
				submit();
			}
		});
  	});

  	$("#addSong").click(function(){
  		$("#add").show();
 	 });

  	$("#add").click(function(){
	  	if ($(event.target).attr("id") == "add"){
	  		$("#add").hide();
	  	}
  	});


});