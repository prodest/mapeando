controllers.controller('demandsController', [
  '$scope', 'mapFactory', 'demandFactory', 'categoryFactory', '$http', '$q', '$filter', 
  function($scope, mapFactory, demandFactory, categoryFactory, $http, $q, $filter){
 
  
   
  $scope.activeCategoriesPool = [];
  $scope.activeCategory;

  $scope.map, $scope.result, $scope.markers, $scope.layerGroup;


  $scope.initialize = function(){
    $scope.map        = mapFactory.buildMap('map');
    $scope.categories = categoryFactory.index(); 

    $scope.loadDemands({});
  }


  $scope.showDemandsOnMap = function(demands) {
    $scope.markers = [];

    var size = demands.length;

    for (i = 0; i < size; i++) {


      if (demands[i].pins.length > 0) {

        var pin   = demands[i].pins;
        var icon_url  = demands[i].category.icon_url;


        var pin_size = demands[i].pins.length;

        for (index = 0; index < pin_size; index++) {

          
          var icon = L.icon({ iconUrl: icon_url, iconSize: [22, 22]});

          marker = L.marker([pin[index].lat, pin[index].long], { icon: icon, riseOnHover: true }); 
          $scope.markers.push(marker);


          $scope.subscribeMarkerEvents(marker, demands[i]);


        }
      }
      
    }


    $scope.layerGroup = L.layerGroup($scope.markers).addTo($scope.map);
    $scope.markers = [];
  }

  $scope.subscribeMarkerEvents = function(marker, demand) {

    $scope.setPopupContent(marker, demand, 'click');
    //$scope.setPopupContent(marker, demand, 'mouseover');
   }


  $scope.setPopupContent = function(marker, demand, binding){
    var truncate = $filter('truncate');

    marker.on(binding, function(event) {
      var html = '<div class="marker-view">';
      html += '<img src="' + demand.user.avatar + '" width="40" height="40"/>';
      html += '<h6><strong>' + demand.user.first_name + ' quer</strong> em ' + demand.pins[0].fullname + ' </h6>';
      html += '<div class="marker-content"><h5>'+ demand.category.name + '</h5>';
      html += '<blockquote>' + truncate(demand.fullname, 140) + '</blockquote></div>';
      html += '<p class="text-center"><a class="button" href="#/demands/show/'+ demand.id + '">Ver mais</a></p>';
      html += '</div>';
      marker.bindPopup(html).openPopup();   
    });
  }


  $scope.loadDemands = function(params) {
    demandFactory.index(params, function(response){
      $scope.showDemandsOnMap(response.demands);
    });
  }


  $scope.$on('$locationChangeStart', function(){
    $scope.map.remove();
  });

  
  $scope.categoryName = {
    driving: "Transporte Individual Motorizado",
    biking: "Transporte Individual não Motorizado",
    walking: "Deslocamento a pé",
    bus: "Transporte Coletivo",

  }


  $scope.loadMarkers = function(category_id) {

    demandFactory.index({by_category_id: category_id }, function(response) {
      $scope.map.removeLayer($scope.layerGroup);
      $scope.showDemandsOnMap(response.demands);

      $scope.activeCategory = category_id;
      //$scope.activeCategoriesPool.push(category_id);
    });
  }

  $scope.isOnActivePool = function(category_id) {
    return $scope.contains($scope.activeCategoriesPool, category_id);
  }

  $scope.contains = function(arr, x) {
    return arr.filter(function(elem) { return elem == x }).length > 0;
  }

  $scope.initialize();


}]);
