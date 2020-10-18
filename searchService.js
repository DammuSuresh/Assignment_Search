angular.module('mySearchApp').service('searchService',['$http','$q',function($http,$q){
    this.searchData = function(url){
      return new Promise((resolve,reject)=>{
        $http.get(url).then((resp)=>{
            resolve(resp);
             },(err)=>{
                reject(err);
             });
      });        
    };
    this.isJsonStringOrNot = function (val) {
        try {
            JSON.parse(val);
        } catch (e) {
            return false;
        }
        return true;
    };
    xml2json = xml => {                                                                                                                                                     
        var el = xml.nodeType === 9 ? xml.documentElement : xml                                                                                                               
        var h  = {name: el.nodeName}                                                                                                                                          
        h.content    = Array.from(el.childNodes || []).filter(e => e.nodeType === 3).map(e => e.textContent).join('').trim()                                                  
        h.attributes = Array.from(el.attributes || []).filter(a => a).reduce((h, a) => { h[a.name] = a.value; return h }, {})                                                 
        h.children   = Array.from(el.childNodes || []).filter(e => e.nodeType === 1).map(c => h[c.nodeName] = xml2json(c))                                                    
        return h                                                                                                                                                              
      }  
    this.parseXml = function(xml){
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(xml,'text/xml');
      return xml2json(xmlDoc);    
    }
    var pageno=1;
    this.storePagenumber= function(data){
        if(data){
            pageno = data;
        }else{
            return pageno;
        }
    }
   
}]);