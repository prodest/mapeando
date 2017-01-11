demandsApp.factory('mapFactory', ['$resource', function($resource){
  
  return { 
    buildMap: function(map_name) {
      L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images'; 

      var map_id = (map_name == '') ? 'map' : map_name;

      // set map view to the city boundaries
      var bounds = L.latLngBounds(L.latLng(-20.3176153,-40.2937946), L.latLng(-20.3276153,-40.3037946));

      var map = L.map(map_id, { 
        fullScreen: true, 
        scrollWheelZoom: true,
        maxBounds: bounds
      }).setView([-20.3176153,-40.2937946], 12);

      // 1 - Positron Dark: http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png 
      // 2 - MapBox: http://{s}.tiles.mapbox.com/v4/luizfonseca.7532f8a3/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibHVpemZvbnNlY2EiLCJhIjoiMTFNcXRXdyJ9.5PRw57nx5srpwP838-KjVQ
      // 3 - Positron Light http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png
      var layer = L.tileLayer('http://{s}.tiles.mapbox.com/v4/luizfonseca.7532f8a3/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibHVpemZvbnNlY2EiLCJhIjoiMTFNcXRXdyJ9.5PRw57nx5srpwP838-KjVQ', {
        attribution: '&copy; LAB.Rio'
      });


      map.addLayer(layer);

      return map;
    },

    
  }

}]);
