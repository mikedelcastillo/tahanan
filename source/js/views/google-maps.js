const colors = require('../utils/colors');
const api = require('../utils/api');
const GoogleMapsLoader = require('google-maps');
const router = require('../utils/router');
let mapData = {};

GoogleMapsLoader.KEY = 'AIzaSyDEe21NT8x2Ie-504PHM57kRl3IfovW9-Y';

console.log(GoogleMapsLoader);
GoogleMapsLoader.load((google) => {
  console.log("Google Maps loaded!");

  const center = {
    lat: 26.0512533,
    lng: 50.5313328
  };

  const range = {
    lat: 0.5,
    lng: 0.5
  };

  const markerSize = new google.maps.Size(35, 50);
  const allowedBounds = new google.maps.LatLngBounds(new google.maps.LatLng(center.lat - range.lat, center.lng - range.lng), new google.maps.LatLng(center.lat + range.lat, center.lng + range.lng));
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

  api("GET", "map").then(data => {
    mapData = data;

console.log(data);
    data.landmarks.forEach(landmark => {
      console.log(landmark)
      let marker = new google.maps.Marker({
        map,
        icon: {
          url: 'img/marker-dark.png',
          scaledSize: markerSize,
        },
        position: {
          lat: landmark.lat,
          lng: landmark.lon
        }
      });

      markers.push(marker);

      marker.addListener('click', function() {
        router.navigate('/landmarks/' + landmark.land_id);
        map.setZoom(15);
        map.setCenter(marker.getPosition());

      });

      marker.addListener('mouseover', e => {
        marker.setIcon({
          url: 'img/marker-light.png',
          scaledSize: markerSize,
        })
      });

      marker.addListener('mouseout', e => {
        marker.setIcon({
          url: 'img/marker-dark.png',
          scaledSize: markerSize,
        })
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
