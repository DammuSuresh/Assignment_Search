angular.module('mySearchApp').directive('searchResult',function(){ 
    return {
    restrict: 'E',
    scope:{
       resultList: "=?",
        isHackerNews: "=?",
        fnSearchData:"&",
        isHide:'=?'
    },
    templateUrl: "searchResult.html",
    controller: function ($scope,searchService){
        if($scope.isHackerNews ===1){
            $scope.pagelist  =[];
            // $scope.pagelist  =  Array.from(Array(), (_,i) => i+1);
            for(let i=1;i<$scope.resultList.nbPages;i++){
               if(i<=10){
                $scope.pagelist.push({id:i,enable:true});

               }else{
                $scope.pagelist.push({id:i,enable:false});
               }
            }
        }
       
      $scope.fnserachPage=function(obj,action){
        console.log('directive');
       if(obj){
        $scope.currentPage = obj.id;
        searchService.storePagenumber(obj.id);
        $scope.fnSearchData();  
       } 
       if(action==='next'){
        let length =$scope.pagelist.length;
        var next=0;
        for(let i=1;i<length;i++){            
            if($scope.pagelist[i].enable){
                var next=i+10;
            }
            if(next && i<=next){
                $scope.pagelist[i].enable = true;
            }else{
                $scope.pagelist[i].enable = false;
            }
         }
       }     
      };
    }
}
}
);