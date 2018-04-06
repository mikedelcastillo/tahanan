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

let googleLoaded = false;

let $options = jQuery("#view-map #options-wrapper");

app.on("map-data", data => {
  mapData = data;
  if(!googleLoaded) googleLoaded = true;
  else return false;


  GoogleMapsLoader.load((google) => {
    console.log("Google Maps loaded!");

    const MarkerWithLabel = require('../utils/marker-labels')(google);

    const geocoder = new google.maps.Geocoder();
    const markerSize = new google.maps.Size(35, 50);
    const allowedBounds = new google.maps.LatLngBounds(new google.maps.LatLng(center.lat - range.lat, center.lng - range.lng), new google.maps.LatLng(center.lat + range.lat, center.lng + range.lng));
    const map = new google.maps.Map(document.querySelector("#google-map"), {
      center: allowedBounds.getCenter(),
      zoom: 11,
      minZoom: 10,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false,
      styles: require('../utils/map-styles')
    });

    // map.fitBounds(allowedBounds);

    let lastValidCenter = map.getCenter();
    google.maps.event.addListener(map, 'center_changed', function() {
      if (allowedBounds.contains(map.getCenter())) { // still within valid bounds, so save the last valid position
        lastValidCenter = map.getCenter();
        return;
      }
      map.panTo(lastValidCenter);
    });

    data.landmarks.sort((a, b) => {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      return a < b ? -1 : a > b ? 1 : 0;
    }).forEach(landmark => {

      let marker = new MarkerWithLabel({
        map,
        icon: {
          url: 'img/marker-light.png',
          scaledSize: markerSize
        },
        position: landmark,
        title: landmark.name,
        labelAnchor: new google.maps.Point(-30, 40),
        labelContent: landmark.name,
        labelClass: "map-marker-label",
        labelInBackground: true
      });

      markers.push(marker);

      marker.addListener('click', function() {
        router.navigate('/landmarks/' + landmark.land_id);
        map.setZoom(15);
        map.setCenter(marker.getPosition());
      });

      marker.addListener("mouseover", e => {
        let count = landmark.memory_count;
        let text = `${count} memories`;
        if(count == 0){
          text = "No memories yet";
        } else if(count == 1){
          text = "1 Memory"
        }
        marker.label.labelDiv_.innerHTML = text;
      });
      marker.addListener("mouseout", e => {
        marker.label.labelDiv_.innerHTML = landmark.name;
      });

      console.log(marker.setTitle);

      marker.addListener('mouseover', e => {
        marker.setIcon({url: 'img/marker-dark.png', scaledSize: markerSize})
      });

      marker.addListener('mouseout', e => {
        marker.setIcon({url: 'img/marker-light.png', scaledSize: markerSize})
      });

      let $option = jQuery(`<div class="item">${landmark.name}</div>`);
      $option.on("click", e => {
        map.setZoom(15);
        map.setCenter(marker.getPosition());
      });
      $options.append($option);
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
