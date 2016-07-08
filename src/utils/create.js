
module.exports = function create(name, props){
    var el = document.createElement(name);
    for (var p in props){
        if(typeof props[p] === 'object'){
            for(var q in props[p]){
                el[p][q] = props[p][q];
            }
        }else{
            el[p] = props[p];
        }
    }
    return el;
};
