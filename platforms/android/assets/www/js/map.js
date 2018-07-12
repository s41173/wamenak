// In the following example, markers appear when the user clicks on the map.
      // The markers are stored in an array.
      // The user can then click an option to hide, show or delete the markers.
      var map;
      var markers = [];

      function initMap(lati,long) {

        if (lati == ""){ lati = 0; }
        if (long == ""){ long = 0; }
        var haightAshbury = {lat: lati, lng: long};
        // var haightAshbury = {lat: 3.5516441, lng: 98.6410409};
        

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 18,
          disableDoubleClickZoom: true,
          center: haightAshbury,
          gestureHandling: 'greedy',
          disableDefaultUI: true
        });

        // This event listener will call addMarker() when the map is clicked.
        map.addListener('click', function(event) {
          clearMarkers();    
          addMarker(event.latLng);
          document.getElementById("hlat").value = event.latLng.lat();                    
          document.getElementById("hlong").value = event.latLng.lng();  
          getcoor();
          // console.log(event.latLng.lat()+" :: "+event.latLng.lng());
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

      // function get_location

    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
        // navigator.geolocation.watchPosition(onSuccess, onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    }

    function onSuccess(position) {

      initMap(position.coords.latitude,position.coords.longitude);
      document.getElementById("hlat").value = position.coords.latitude;                    
      document.getElementById("hlong").value = position.coords.longitude;      
        
      getcoor();
      // var element = document.getElementById('geolocation');
      
      // element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
      //                     'Longitude: '          + position.coords.longitude             + '<br />' +
      //                     'Altitude: '           + position.coords.altitude              + '<br />' +
      //                     'Accuracy: '           + position.coords.accuracy              + '<br />' +
      //                     'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
      //                     'Heading: '            + position.coords.heading               + '<br />' +
      //                     'Speed: '              + position.coords.speed                 + '<br />' +
      //                     'Timestamp: '          + position.timestamp          + '<br />';
              
  }

  // onError Callback receives a PositionError object
  //
  function onError(error) {
      toast('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
  }