$(document).ready(function(){

	// Intercept the submit and calculate latitude and longitude from the zip code
	$('#register-form').submit(function(e){
		e.preventDefault();
		let form = this;

		let zipCode = form.zipcode.value;

		if(zipCode.length < 5 || zipCode == '')
		{
			// Blank or invalid zip code
			// Submit the form as-is, catch the error when trying to add the user in the db
			form.submit();	
		}
		
		let address = "https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURIComponent(zipCode)+"&key=AIzaSyDKR2GaPt0sNCKHO5hj9z80JboZ50VOG-M";
		let jax = $.getJSON(address);
		jax.done( function (data) {
			if ( data.status == 'OK' ) {
				form.latitude.value = data.results[0].geometry.location.lat;
				form.longitude.value = data.results[0].geometry.location.lng;
				console.log('Location = ' + form.latitude.value + ' ' + form.longitude.value);
				form.submit();
			}
			else {
				// Latitude and longitude could not be determined
				// Submit the form as-is, catch the error when trying to add the user in the db
				form.submit();
			}
		})
	})
});