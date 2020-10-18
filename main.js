angular.module('mySearchApp',[]).controller('myCtrl',["$scope","searchService",function($scope,searchService){  
    $scope.type =1;
    $scope.resultList = [];
    $scope.isDataLoaded = false;
    $scope.isHideAuthor = true;
    
    $scope.fnreset =  function(){
        $scope.isDataLoaded = false;
        $scope.searchString = '';
        $scope.resultList = [];
    };
    $scope.fnsearchString = function(pageno){
        // $scope.isDataLoaded = false;
        var url;
        if($scope.type===1){
             url = 'http://hn.algolia.com/api/v1/search?query='+$scope.searchString;
             if(pageno){
                url = url+'&page='+pageno;
             }
        }else{
            if(!$scope.searchString){
                return;
            }
            url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=xml&search='+$scope.searchString+'&origin=*';
        }
        searchService.searchData(url).then((resp)=>{
           if(resp.status===200){
               if(JSON.stringify(resp.data).indexOf("<?xml") !== -1){
                $scope.resultList = searchService.parseXml(resp.data);
                console.log($scope.resultList);    
                $scope.isDataLoaded = true;          
               }else{
                $scope.resultList = resp.data;
                $scope.isDataLoaded = true;
                // $scope.$broadcast('searchResult',resp.data);
               }          
           }
        },(err)=>{
            console.log(err);
        });
     };
     $scope.fngetpagewise = function(pageno){
         //&page=2
         var pageno = searchService.storePagenumber();
         console.log(pageno);
         $scope.fnsearchString(pageno);
     };

}]);