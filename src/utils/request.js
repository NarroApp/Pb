
module.exports = function request(url, cb, method, post, contenttype) {
    var requestTimeout,
        xhr;

    try {
        xhr = new XMLHttpRequest();
    } catch(e) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (error) {
            cb(new Error('Request not supported'));
       }
   }
    requestTimeout = setTimeout(function() {xhr.abort(); cb(new Error("request: aborted by a timeout"), "",xhr); }, 10000);
      xhr.onreadystatechange = function(){
              if (xhr.readyState != 4) return;
                  clearTimeout(requestTimeout);
                      cb(xhr.status != 200?new Error("request: server respnse status is "+xhr.status):false, xhr.responseText,xhr);
                         
      };
         xhr.open(method?method.toUpperCase():"GET", url, true);    
         if(!post){
                 xhr.send();
                    
         }else{
                 xhr.setRequestHeader('Content-type', contenttype?contenttype:'application/x-www-form-urlencoded');
                     xhr.send(post);
                        
         }
               
};
