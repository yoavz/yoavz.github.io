function loadMap(longitude, latitude) {

    var width = $(window).width();
    var height = $(window).height();

    var coord = longitude + "," + latitude
    var z = "3";

    var map_url = "http://api.tiles.mapbox.com/v4/yoavz.j9nh7iip/"
                // map
                + coord + "," + z + "/"
                + width + "x" + height + ".png" 
                + "?access_token=pk.eyJ1IjoieW9hdnoiLCJhIjoieDhJd2tZZyJ9.78Hqj8zo71j85LY0e-aC4Q";


    // set the bg image here
    document.body.style.backgroundImage="url(\'" + map_url + "\')";
}

function insertCoords(long, lat) {
    var coords = long + ", " + lat;
    $(" #coords ").text(coords);
}

function getRecentTrack() {
    var url = "http://ws.audioscrobbler.com/2.0/";
    var lastfm = "http://www.last.fm/user/yoavz_/tracks";
    $.get(
        url,
        {"method": "user.getrecenttracks",
         "user": "yoavz_",
         "api_key": "f5b23ddb3c4afbd588ddef314d81117f",
         "format": "json"},
        function(data) {
            var track = data.recenttracks.track[0]; 
            var link = "<a href=\"" + lastfm + "\">";
            var trackName = track.name;
            var artistName = track.artist["#text"];
            var icon = "<i class=\"fa fa-music\"></i>"

            var innerHTML = link + artistName + " - " + trackName + "</a>" ;
            $(" #now-playing ").html(innerHTML);
        }
    );
}

$(function() {
    getRecentTrack();
});
