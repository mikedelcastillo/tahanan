const colors = require('../utils/colors');
const api = require('../utils/api');
const GoogleMapsLoader = require('google-maps');
const router = require('../utils/router');
const app = require('../utils/events');
const jQuery = require('jquery');

const center = {
  lat: 26.0512533,
  lng: 50.5313328
};
const range = {
  lat: 0.5,
  lng: 0.5
};

const markers = [];

let mapData = {};

GoogleMapsLoader.KEY = 'AIzaSyDEe21NT8x2Ie-504PHM57kRl3IfovW9-Y';

console.log(GoogleMapsLoader);

app.on("map-data", data => {
  mapData = data;
  GoogleMapsLoader.load((google) => {
    console.log("Google Maps loaded!");

    const geocoder = new google.maps.Geocoder();
    const markerSize = new google.maps.Size(35, 50);
    const allowedBounds = new google.maps.LatLngBounds(new google.maps.LatLng(center.lat - range.lat, center.lng - range.lng), new google.maps.LatLng(center.lat + range.lat, center.lng + range.lng));
    const map = new google.maps.Map(document.querySelector("#google-map"), {
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

    let lastValidCenter = map.getCenter();
    google.maps.event.addListener(map, 'center_changed', function() {
      if (allowedBounds.contains(map.getCenter())) { // still within valid bounds, so save the last valid position
        lastValidCenter = map.getCenter();
        return;
      }
      map.panTo(lastValidCenter);
    });

    data.landmarks.forEach(landmark => {
      let marker = new google.maps.Marker({
        map,
        icon: {
          url: 'img/marker-dark.png',
          scaledSize: markerSize
        },
        position: landmark
      });

      markers.push(marker);

      marker.addListener('click', function() {
        router.navigate('/landmarks/' + landmark.land_id);
        map.setZoom(15);
        map.setCenter(marker.getPosition());

      });

      marker.addListener('mouseover', e => {
        marker.setIcon({url: 'img/marker-light.png', scaledSize: markerSize})
      });

      marker.addListener('mouseout', e => {
        marker.setIcon({url: 'img/marker-dark.png', scaledSize: markerSize})
      });
    });

    // geocoder.geocode({
    //   'address': "Bahrain, Captial"
    // }, function(results, status) {
    //   if (status == 'OK') {
    //     console.log(results[0].geometry)
    //     map.setCenter(results[0].geometry.location);
    //     var marker = new google.maps.Marker({map: map, position: results[0].geometry.location});
    //   } else {
    //     alert('Geocode was not successful for the following reason: ' + status);
    //   }
    // });

    let paths = "";

    paths = paths.split(",").map(string => string.split(" ").map(n => Number(n))).map(nums => {
      let coords = [];
      for (let i = 0; i < nums.length; i += 2) {
        coords.push({
          lat: nums[i],
          lng: nums[i + 1]
        });
      }

      return coords;
    }).forEach(path => {
      var bermudaTriangle = new google.maps.Polygon({
        paths: path,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });
      bermudaTriangle.setMap(map);
    });

    markerZoomHandler();
    google.maps.event.addListener(map, 'zoom_changed', markerZoomHandler);

    function markerZoomHandler() {
      let zoom = map.getZoom();
      for (let i = 0; i < markers.length; i++) {
        let marker = markers[i];
        // marker.setVisible(zoom >= 12);
      }
    }
  });
});
