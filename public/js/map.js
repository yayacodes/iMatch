$(document).ready(function(){
    map = initMap();
});

function initMap(){
    map = new google.maps.Map(document.getElementById("gmap"), {
      zoom: 6,
      center: {lat: 40.744052, lng: -74.0270745} // Default to the NE US
    });

    return map;
}