const colors = require('../utils/colors');
const api = require('../utils/api');
const GoogleMapsLoader = require('google-maps');

GoogleMapsLoader.KEY = 'AIzaSyDEe21NT8x2Ie-504PHM57kRl3IfovW9-Y';

GoogleMapsLoader.load((google) => {
  console.log("Google Maps loaded!");

  let center = {
    lat: 26.0512533,
    lng: 50.5313328
  };

  let range = {
    lat: 0.5,
    lng: 0.5
  };

  var allowedBounds = new google.maps.LatLngBounds(new google.maps.LatLng(center.lat - range.lat, center.lng - range.lng), new google.maps.LatLng(center.lat + range.lat, center.lng + range.lng));
  let map = new google.maps.Map(document.querySelector("#google-map"), {
    center: allowedBounds.getCenter(),
    zoom: 10,
    // minZoom: 10,
    // disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: false,
    styles: require('../utils/map-styles')
  });
  map.fitBounds(allowedBounds);

  var lastValidCenter = map.getCenter();
  google.maps.event.addListener(map, 'center_changed', function() {
    if (allowedBounds.contains(map.getCenter())) {// still within valid bounds, so save the last valid position
      lastValidCenter = map.getCenter();
      return;
    }
    map.panTo(lastValidCenter);
  });

  let markers = [];

  api("landmarks").then(data => {
    data.forEach(landmark => {
      let marker = new google.maps.Marker({
        map,
        position: {
          lat: landmark.lat,
          lng: landmark.lng
        }
      });

      markers.push(marker);

      marker.addListener('click', function() {
        console.log(landmark);
        map.setZoom(15);
        map.setCenter(marker.getPosition());
      });

      marker.addListener('mouseover', e => {

      });

      marker.addListener('mouseout', e => {

      });
    });

    markerZoomHandler();
  }).catch(e => {
    //shit
  });

  google.maps.event.addListener(map, 'zoom_changed', markerZoomHandler);

  function markerZoomHandler(){
    let zoom = map.getZoom();
    for (let i = 0; i < markers.length; i++) {
      let marker = markers[i];
      // marker.setVisible(zoom >= 12);
    }
  }
});
