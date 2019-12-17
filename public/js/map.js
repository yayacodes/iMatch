$(document).ready(function(){
    map = initMap();
});

function initMap(){
    if(document.getElementById("location") != null 
        && document.getElementById("gmap") != null)
    {
        // Get the hidden location data
        const locationData = document.getElementById("location").innerHTML; 
        const groupLocations = document.getElementsByClassName("coordinate");
        const gmap = document.getElementById("gmap");
        let location = {lat: 40.744052, lng: -74.0270745}; // Default to Hoboken, NJ
        let grouplocs = [];

        if(groupLocations.length > 0)
        {
            for(l = 0; l < groupLocations.length; l++) {
                let locData = groupLocations[l].innerHTML;

                if(locData)
                {
                    let locs = locData.split(/\s+/);
                    let latVal = parseFloat(locs[0]);
                    let lngVal = parseFloat(locs[1]);
                    let userLoc = {lat: latVal, lng: lngVal};
                    grouplocs.push(userLoc);
                }
            }
        }

        // Set up the map
        if(gmap != null) {
            bounds  = new google.maps.LatLngBounds();
            map = new google.maps.Map(document.getElementById("gmap"), {});

            if(grouplocs.length == 0) {
                // Add a marker to the location on the map
                marker = new google.maps.Marker({
                    position: location
                });

                let l = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                bounds.extend(l);

                marker.setMap(map);
            }
            else {
                for(i = 0; i < grouplocs.length; i++){
                    let pos = grouplocs[i];
                    marker = new google.maps.Marker({
                        position: pos
                    });

                    let l = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                    bounds.extend(l);

                    marker.setMap(map);
                }
            }

            map.fitBounds(bounds);
            map.panToBounds(bounds);

            return map;
        }
    }
}
