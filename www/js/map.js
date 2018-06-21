// In the following example, markers appear when the user clicks on the map.
      // The markers are stored in an array.
      // The user can then click an option to hide, show or delete the markers.
      var map;
      var markers = [];

      function initMap() {

        var lati = document.getElementById("hlat").value;
        var longi = document.getElementById("hlong").value;
        var haightAshbury = {lat: lati, lng: longi};

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 18,
          disableDoubleClickZoom: true,
          center: haightAshbury,
          disableDefaultUI: true
        });

        // This event listener will call addMarker() when the map is clicked.
        map.addListener('click', function(event) {
          clearMarkers();    
          addMarker(event.latLng);
          // document.getElementById('latclicked').innerHTML = event.latLng.lat();
          // document.getElementById('longclicked').innerHTML =  event.latLng.lng();
          console.log(event.latLng.lat()+" :: "+event.latLng.lng());
        });

        // Adds a marker at the center of the map.
        addMarker(haightAshbury);
      }

      // Adds a marker to the map and push to the array.
      function addMarker(location) {
        var marker = new google.maps.Marker({
          position: location,
          map: map
        });
        markers.push(marker);
      }

      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }


      function getcoor(){
        
         
         alert($("#hlat").val()+" : "+$("#hlong").val());
         initMap();

      }

      // function get_location

    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    function onSuccess(position) {
      var element = document.getElementById('geolocation');
      element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                          'Longitude: '          + position.coords.longitude             + '<br />' +
                          'Altitude: '           + position.coords.altitude              + '<br />' +
                          'Accuracy: '           + position.coords.accuracy              + '<br />' +
                          'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                          'Heading: '            + position.coords.heading               + '<br />' +
                          'Speed: '              + position.coords.speed                 + '<br />' +
                          'Timestamp: '          + position.timestamp          + '<br />';

      document.getElementById("hlat").value = position.coords.latitude;                    
      document.getElementById("hlong").value = position.coords.longitude;                    
  }

  // onError Callback receives a PositionError object
  //
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
  }




      // https://maps.googleapis.com/maps/api/geocode/json?address=3.5516441,98.6410409&key=AIzaSyAaCjY30PVJEpkf9mcZg8R6Rs5KepJQjOg&callback