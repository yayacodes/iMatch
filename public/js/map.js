$(document).ready(function(){
    map = initMap();
});

function initMap(){
    if(document.getElementById("location") != null 
        && document.getElementById("gmap") != null)
    {
        // Get the hidden location data
        const locationData = document.getElementById("location").innerHTML; 
        const gmap = document.getElementById("gmap");
        let location = {};

        if(locationData == null) {
            location = {lat: 40.744052, lng: -74.0270745}; // Default to Hoboken, NJ
        }
        else
        {
            let locs = locationData.split(/\s+/);
            let latVal = parseFloat(locs[0]);
            let lngVal = parseFloat(locs[1]);
            location = {lat: latVal, lng: lngVal};
        }

        // Set up the map
        if(gmap != null) {
            map = new google.maps.Map(document.getElementById("gmap"), {
              zoom: 12,
              center: location 
            });

            // Add a marker to the location on the map
            marker = new google.maps.Marker({
                position: location
            });

            marker.setMap(map);

            return map;
        }
    }
}
