/**
 * Created by alex on 29/01/16.
 */

module.exports = function(id){

    var i;
    for(i = 0; i < data.length; i++)
        if(data[i].id === id)
            return data[i];
    return null;

};

var data = [
    {"id": 1,"name":"Simple","height":1080,"width":1920,"validZones":[{"x1":0,"y1":0,"x2":1920,"y2":300},{"x1":0,"y1":700,"x2":1920,"y2":1080}]}

];
